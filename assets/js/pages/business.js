import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import tabContent from "../data/business.js";

const _business = document.querySelector("#business");
const _swiper = {
  nav: null,
  business: null,
  group: {},
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
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    loopAdditionalSlides: 1,
    pagination: {
      el: ".business-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      1440: {
        spaceBetween: 40,
      },
    },
  });
  // swiper loop 시 index -1에서 시작하는 오류 임의 수정\

  _swiper.business.slideTo(3, 300);
  _swiper.business.on("slideChangeTransitionEnd", (swiper) => {
    console.table(_swiper.group);
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
    });
  });
}
/**
 * swiper slide 동적생성
 */
function appendBusinessList() {
  let swiperContent = "";
  Object.keys(tabContent).forEach((key) => {
    swiperContent += setTemplateItem(tabContent[key], key);
    // nav key
    _swiper.group[key] = tabContent[key].length;
  });
  Object.keys(_swiper.group).red;
  _business.querySelector(`.swiper-business .swiper-wrapper`).innerHTML =
    swiperContent;
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
