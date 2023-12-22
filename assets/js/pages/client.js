import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let tabContent;
window.onload = async function () {
  const response = await fetch("./data/client.json");
  tabContent = await response.json();
};

const _client = document.querySelector("#client");
const _swiper = {
  client: null,
};
let isPC = window.innerWidth >= 1440;

export function fnClient() {
  window.addEventListener("resize", (e) => {
    isPC = window.innerWidth >= 1440;
    appendClientList();
  });
  appendClientList();
  initSwiper();
  eventNav();
}

function initSwiper() {
  _swiper.client = new Swiper(".swiper-client", {
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: ".client-pagination",
      type: "bullets",
    },
  });
}
/**
 * 버튼 클릭시 slide update
 */
function eventNav() {
  const navs = document.querySelectorAll(".c-nav");
  navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      // add class
      navs.forEach((n) => n.classList.remove("is-active"));
      nav.classList.add("is-active");
      appendClientList(nav.dataset.nav);
      _swiper.client.updateSlides();
      _swiper.client.slideTo(0, 300);
    });
  });
}
function appendClientList(key = "tabClient") {
  const column = Math.floor(
    document.querySelector(".swiper-client").clientWidth / 160
  );
  document.documentElement.style.setProperty('--client-item', column);
  const slideArr = chunk(tabContent[key], column * 3);
  let slideTemplate = "";
  for (let slide of slideArr) {
    slideTemplate += `<ul class="swiper-slide client-list"> 
    ${setTemplateItem(slide, key)}
    </ul>`;
  }
  _client.querySelector(`.swiper-client .swiper-wrapper`).innerHTML =
    slideTemplate;
}

function setTemplateItem(arr, key) {
  const template = ({ img, desc, key }) => {
    return `<div class="client-item" data-category="${key}">
    <figure class="client-logo">
      <img
        src="./../assets/images/${img}"
        alt=""
      />
    </figure>
    <p class="client-desc">${desc}</p>
  </div>`;
  };
  let returnTemplate = "";
  arr.forEach((item) => {
    returnTemplate += template({ ...item, key });
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
