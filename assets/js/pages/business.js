import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import tabContent from "../data/business.js";

const _business = document.querySelector("#business");
const _swiper = {
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
  _swiper.business = new Swiper(".swiper-business", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
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

  _swiper.business.slideTo(2, 300);
  _swiper.business.on("slideChangeTransitionEnd", (swiper) => {
    const target = document.querySelector(
      `.business-slide[data-swiper-slide-index="${swiper.realIndex}"]`
    );
    activeNav(target.dataset.slide);
  });
}
/**
 * nav find active
 */
function activeNav(key) {
  const navs = document.querySelectorAll(".b-nav");
  let target = null;
  navs.forEach((nav) => {
    nav.classList.remove("is-active");
    if (nav.dataset.nav === key) target = nav;
  });
  target?.classList.add("is-active");
}
/**
 * 버튼 클릭시 slide update
 */
function eventNav() {
  const navs = document.querySelectorAll(".b-nav");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      // find slide
      activeNav(nav.dataset.nav);
      const targets = _swiper.business.slides
        .filter((s) => s.dataset.slide === nav.dataset.nav)
        .map((slides) =>
          Number(slides.getAttribute("data-swiper-slide-index"))
        );
      const toIdx = Math.min(...targets);
      _swiper.business.slideToLoop(toIdx);
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
    return `<div class="swiper-slide business-slide" data-slide="${key}">
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
