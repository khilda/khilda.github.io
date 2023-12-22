import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import tabContent from "../data/work.js";

const _work = document.querySelector("#works");
export function fnWoks() {
  eventSelect();
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
/**
 * select
 */
function eventSelect() {
  const selectContainers = document.querySelectorAll(".select-container");
  function deactivateAllSelect(_nonTarget) {
    selectContainers.forEach((container) => {
      const selectBox = container.querySelector(".select-box");
      const option = container.querySelector(".select-options");
      if (_nonTarget !== selectBox) {
        selectBox.classList.remove("active");
        option.removeAttribute("style");
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select-container")) {
      deactivateAllSelect();
    }
  });
  function initSelectBox(selectContainer) {
    const _box = selectContainer.querySelector(".select-box");
    const _chks = selectContainer.querySelectorAll(".select-chk");
    // init
    _chks.forEach((chk) => {
      chk.setAttribute("name", _box.dataset.name);
    });
    // default value
    _box.textContent = _box.dataset.name;
  }
  function setSelectValue(name) {
    let value = [];
    let str = "";
    document.getElementsByName(name).forEach((chk) => {
      if (chk.checked) value.push(chk.value);
    });
    if (value.length === 0) {
      str = name;
    } else if (value.length > 1) {
      str = `${value[0]} 외 ${value.length - 1}개`;
    } else {
      str = value.join("");
    }
    document.querySelector(`[data-name="${name}"]`).textContent = str;
  }
  selectContainers.forEach((container) => {
    initSelectBox(container);
    if (container.classList.contains("is-disabled")) return;
    const selectBox = container.querySelector(".select-box");
    const selectChecks = container.querySelectorAll(".select-chk");
    container.addEventListener("click", (e) => {
      if (e.target === selectBox) {
        deactivateAllSelect(selectBox);
        selectBox.classList.toggle("active");
      }
      selectChecks.forEach((chk) => {
        if (e.target === chk) {
          setSelectValue(selectBox.dataset.name);
        }
      });
    });
  });
}
