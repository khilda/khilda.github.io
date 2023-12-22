import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let tabContent;
window.onload = async function () {
  const response = await fetch("./data/history.json");
  tabContent = await response.json();
};

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
    breakpoints: {
      // when window width is >= 320px
      1024: {
        spaceBetween: 100,
      },
    },
  });
  _swiper.history = new Swiper(".swiper-history", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    pagination: {
      el: ".history-pagination",
      type: "bullets",
    },
    breakpoints: {
      // when window width is >= 320px
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: false,
      },
    },
  });
}
/**
 * 버튼 클릭시 slide update
 */
function eventNav() {
  const navs = document.querySelectorAll(".h-nav");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      // add class
      navs.forEach((n) => n.classList.remove("is-active"));
      nav.classList.add("is-active");

      appendHistoryList(nav.dataset.year);
      _swiper.history.updateSlides();
      _swiper.history.slideTo(0, 300);
    });
  });
}

function appendHistoryList(key = "tabHistory2023") {
  const slideArr = chunk(tabContent[key], 5);
  let slideTemplate = "";
  for (let slide of slideArr) {
    slideTemplate += `<ul class="swiper-slide history-list"> 
    ${setTemplateItem(slide, key)}
    </ul>`;
  }
  _history.querySelector(`.swiper-history .swiper-wrapper`).innerHTML =
    slideTemplate;
}

function setTemplateItem(arr, year) {
  const template = (desc) => {
    return `<li class="history-item" data-year="${year}">${desc}</li>`;
  };
  let returnTemplate = "";
  arr.forEach((item) => {
    returnTemplate += template(item, year);
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
