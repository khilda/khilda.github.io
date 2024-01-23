import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import tabContent from "../data/history.js";

const _history = document.querySelector("#history");
const _swiper = {
  nav: null,
  history: null,
};

export function fnHistory() {
  appendHistoryList();
  initSwiper();
  eventNav();
}

function initSwiper() {
  _swiper.nav = new Swiper(".history-nav", {
    slidesPerView: "auto",
    spaceBetween: 40,
    slideToClickedSlide: true,
    loop: true,
    navigation: {
      nextEl: ".history-next",
      prevEl: ".history-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      1024: {
        spaceBetween: 60,
      },
    },
  });
  document.querySelector;
  _swiper.history = new Swiper(".swiper-history", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".history-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: false,
      },
    },
    addEventListener,
  });

  // swiper시 nav active
  _swiper.history.on("slideChangeTransitionEnd", (swiper) => {
    const target = document.querySelector(
      `.history-list[data-swiper-slide-index="${swiper.realIndex}"]`
    );
    activeNav(target.dataset.slide);
  });
}
/**
 * nav find active
 */
function activeNav(key) {
  const navs = document.querySelectorAll(".h-nav");
  let target = null;
  navs.forEach((nav) => {
    nav.classList.remove("is-active");
    if (nav.dataset.nav === key) target = nav;
  });
  // swiper active
  target?.classList.add("is-active");
  const idx = Number(target.getAttribute("data-swiper-slide-index"));
  _swiper.nav.slideTo(idx);
}
/**
 * 버튼 클릭시 slide update
 */
function eventNav() {
  const navs = document.querySelectorAll(".h-nav");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      // add class
      activeNav(nav.dataset.nav);
      const targets = _swiper.history.slides
        .filter((s) => s.dataset.slide === nav.dataset.nav)
        .map((slides) =>
          Number(slides.getAttribute("data-swiper-slide-index"))
        );
      const toIdx = Math.min(...targets);
      _swiper.history.slideToLoop(toIdx);
    });
  });
}

function appendHistoryList(key = "tabHistory2023") {
  let swiperContent = "";
  Object.keys(tabContent).forEach((key) => {
    const slideArr = chunk(tabContent[key], 5);
    slideArr.forEach((slide, idx) => {
      swiperContent += `
      <ul class="swiper-slide history-list" data-slide="${key}" data-group="group${idx}">
        ${setTemplateItem(slide)}
      </ul>`;
    });
  });
  _history.querySelector(`.swiper-history .swiper-wrapper`).innerHTML =
    swiperContent;
}

function setTemplateItem(arr) {
  const template = (desc) => {
    return `<li class="history-item">${desc}</li>`;
  };
  let returnTemplate = "";
  arr.forEach((item) => {
    returnTemplate += template(item);
  });
  return returnTemplate;
}

function chunk(array, size) {
  const chunked = [];

  for (let element of array) {
    const last = chunked[chunked.length - 1];

    if (!last || last.length === size) {
      chunked.push([element]);
    } else {
      last.push(element);
    }
  }

  return chunked;
}
