// custom tab
export function eventTab() {
  const tabs = document.querySelectorAll("[data-tab]");
  tabs.forEach((tab) => {
    initTab(tab);
  });
}
function initTab(tab) {
  const btns = tab.querySelectorAll(".tab-btn");
  const contents = tab.querySelectorAll(".tab-content");
  btns.forEach((btn, idx) => {
    const id = Math.random().toString(36).substr(2, 16);
    btn.dataset.tab = `tab_${id}`;
    tab
      .querySelector(".tab-container")
      .children[idx]?.setAttribute("id", `tab_${id}`);
  });
  // init
  btns[0].classList.add("is-active");
  contents[0].classList.add("is-active");
  // click event
  clickTab(tab);
}
function clickTab(tab) {
  const btns = tab.querySelectorAll(".tab-btn");
  const contents = tab.querySelectorAll(".tab-content");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      contents.forEach((c) => c.classList.remove("is-active"));
      const id = btn.dataset.tab;
      document.getElementById(id)?.classList.add("is-active");
    });
  });
}
