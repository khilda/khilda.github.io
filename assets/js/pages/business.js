import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let tabContent;
window.onload = async function () {
  const response = await fetch("./data/business.json");
  tabContent = await response.json();
};

const _business = document.querySelector("#business");
const _swiper = {
  nav: null,
  business: null,
};

export function fnBusiness() {
  appendBusinessList();
  initSwiper();
  eventNav();
  window._business = _swiper.business;
}

function initSwiper() {
  _swiper.nav = new Swiper(".business-nav", {
    slidesPerView: "auto",
    spaceBetween: 10,
    slideToClickedSlide: true,
    breakpoints: {
      1440: {
        spaceBetween: 20,
      },
    },
  });
  _swiper.business = new Swiper(".swiper-business", {
    slidesPerView: "auto",
    // slidesPerView: 1.25,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".business-next",
      prevEl: ".business-prev",
    },
    pagination: {
      el: ".business-pagination",
      type: "bullets",
    },
    breakpoints: {
      // when window width is >= 320px
      1440: {
        spaceBetween: 40,
      },
    },
  });
}
/**
 * 버튼 클릭시 slide update
 */
function eventNav() {
  const navs = document.querySelectorAll(".b-nav");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      // add class
      navs.forEach((n) => n.classList.remove("is-active"));
      nav.classList.add("is-active");
      appendBusinessList(nav.dataset.nav);
      _swiper.business.updateSlides();
      _swiper.business.slideTo(0, 300);
    });
  });
}
/**
 * swiper slide 동적생성
 */
function appendBusinessList(key = "app") {
  _business.querySelector(`.swiper-business .swiper-wrapper`).innerHTML =
    setTemplateItem(tabContent[key], key);
}

function setTemplateItem(arr, key) {
  const template = ({ title, desc, icon, img }) => {
    return `<div class="swiper-slide business-slide" data-category="${key}">
    <header class="b-content">
      <h5 class="b-title">${title}</h5>
      <p class="b-desc">${desc}</p>
      <figure class="b-icon">
        <img src="./../assets/images/${icon}" alt="" />
      </figure>
    </header>
    <figure class="b-img">
      <img src="./../assets/images/${img}" alt="" />
    </figure>
  </div>`;
  };
  let returnTemplate = "";
  arr.forEach((item) => {
    returnTemplate += template(item);
  });
  return returnTemplate;
}
