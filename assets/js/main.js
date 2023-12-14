import { PageAnimation } from "./module/fullpage.js";
import { btnTopAnimate } from "./module/topAnimation.js";
import { eventTab } from "./module/tab.js";

//page
import { fnVisual } from "./pages/visual.js";
import { fnBusiness } from "./pages/business.js";
import { fnWoks } from "./pages/work.js";
import { fnClient } from "./pages/client.js";
import { fnHistory } from "./pages/history.js";
window.addEventListener("DOMContentLoaded", () => {
  // layout
  window.pageAnimation = new PageAnimation();
  btnTopAnimate();
  eventHeader();
  // component
  eventTab();
  // page
  fnVisual();
  fnBusiness();
  fnWoks();
  fnClient();
  fnHistory();
});
/**
 * Header
 */
function eventHeader() {
  const _headerToggleBtn = document.querySelector(".h-btn-toggle");
  const onClickToggle = (e) => {
    if (_headerToggleBtn.classList.contains("is-active")) {
      _headerToggleBtn.classList.remove("is-active");
      document.querySelector(".nav").classList.remove("is-show");
    } else {
      _headerToggleBtn.classList.add("is-active");
      document.querySelector(".nav").classList.add("is-show");
    }
  };
  _headerToggleBtn.addEventListener("click", onClickToggle);
  // click event
  const _navs = document.querySelectorAll(".nav-btn");
  _navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      _navs.forEach((nav) => nav.classList.remove("is-active"));
      nav.classList.add("is-active");
      const id = nav.dataset.section;
      const _target = document.getElementById(id);
      window.pageAnimation.scrollToSection(_target);
      onClickToggle();
    });
  });

  // header hide
  window.addEventListener("scroll", (e) => {
    if (window.scrollY === 0) {
      document.querySelector(".header").classList.add("is-hide");
    } else {
      document.querySelector(".header").classList.remove("is-hide");
    }

    const id = document.querySelector(".isPageActive").getAttribute("id");
    const _target = document.querySelector(`[data-section="${id}"]`);
    _navs.forEach((nav) => nav.classList.remove("is-active"));
    _target?.classList.add("is-active");
  });
}
