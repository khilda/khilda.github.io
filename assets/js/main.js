import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

import { PageAnimation } from "./module/fullpage.js";
import { btnTopAnimate } from "./module/topAnimation.js";
import { eventTab } from "./module/tab.js";
window.addEventListener("DOMContentLoaded", () => {
  // layout
  window.pageAnimation = new PageAnimation();
  btnTopAnimate();
  eventHeader();
  // component
  eventTab();
  // page
  fnBusiness();
  fnWoks();
});
function eventHeader() {
  const _headerToggleBtn = document.querySelector(".h-btn-toggle");
  _headerToggleBtn.addEventListener("click", (e) => {
    if (_headerToggleBtn.classList.contains("is-active")) {
      _headerToggleBtn.classList.remove("is-active");
      document.querySelector(".nav").classList.remove("is-show");
    } else {
      _headerToggleBtn.classList.add("is-active");
      document.querySelector(".nav").classList.add("is-show");
    }
  });
  // click event
  const _navs = document.querySelectorAll(".nav-btn");
  _navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      _navs.forEach((nav) => nav.classList.remove("is-active"));
      nav.classList.add("is-active");
      const id = nav.dataset.section;
      const _target = document.getElementById(id);
      window.pageAnimation.scrollToSection(_target);
    });
  });
  // header hide
  window.addEventListener("scroll", (e) => {
    if (window.scrollY === 0) {
      document.querySelector(".header").classList.add("is-hide");
    } else {
      document.querySelector(".header").classList.remove("is-hide");
    }
  });
}
function fnBusiness() {
  document.querySelectorAll(".b-nav").forEach((nav) => {
    nav.addEventListener("click", (e) => {
      nav.classList.toggle("is-active");
    });
  });

  const swiperNav = new Swiper(".business-nav", {
    slidesPerView: "auto",
    freeMode: {
      enabled: true,
      sticky: true,
    },
  });
  const swiperCard = new Swiper(".swiper-business", {
    slidesPerView: "auto",
    centeredSlides: true,
    navigation: {
      nextEl: ".business-next",
      prevEl: ".business-prev",
    },
    pagination: {
      el: ".business-pagination",
      type: "bullets",
    },
  });
}
function fnWoks() {
  const swiperCard = new Swiper(".swiper-works", {
    slidesPerView: 3,
    spaceBetween: 27,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    breakpoints: {
      // when window width is >= 320px
      1441: {
        slidesPerView: 4,
        spaceBetween: 27,
      },
    },
  });
  window.addEventListener("resize", (e) => {
    if (window.innerWidth < 1440 && !swiperCard.params.centeredSlides) {
      swiperCard.params.centeredSlides = true;
      swiperCard.params.slidesPerView = "auto";
      swiperCard.update();
      console.log("mobile", swiperCard);
    } else if (window.innerWidth >= 1440 && swiperCard.params.centeredSlides) {
      swiperCard.params.centeredSlides = false;
      swiperCard.params.slidesPerView = 4;
      swiperCard.update();
      console.log("pc", swiperCard);
    }
  });
}
