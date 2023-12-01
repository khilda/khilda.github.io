import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import tabContent from "../data/work.json" assert { type: "json" };

const _work = document.querySelector("#works");
export function fnWoks() {
  appendWorkList();
  const swiperCard = new Swiper(".swiper-works", {
    slidesPerView: "auto",
    spaceBetween: 27,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    breakpoints: {
      // when window width is >= 320px
      1440: {
        slidesPerView: 4,
        spaceBetween: 27,
        centeredSlides: false,
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

/**
 * swiper slide 동적생성
 */
function appendWorkList(key) {
  const workList = tabContent.work.filter((item) => !key || item.dep1 === key);
  _work.querySelector(`.swiper-works .swiper-wrapper`).innerHTML =
    setTemplateItem(workList);
}

function setTemplateItem(arr) {
  const template = ({ dep1, dep2, dep3, title, desc, category, img }) => {
    return `<div class="swiper-slide work-slide" data-dep1="${dep1}" data-dep2="${dep2}" data-dap3="${dep3}">
    <figure class="w-img">
      <span class="badge">${dep3}</span>
      <img
        class="logo"
        src="./../assets/images/${img}"
        alt=""
      />
    </figure>
    <div class="w-content">
      <h5 class="w-title">${title}</h5>
      <p class="w-desc">${desc}</p>
      <p class="w-category">${category}</p>
    </div>
  </div>`;
  };
  let returnTemplate = "";
  arr.forEach((item) => {
    returnTemplate += template(item);
  });
  return returnTemplate;
}
