// custom select
export function eventSelect() {
  const selectContainers = document.querySelectorAll(".select-container");
  // (todo) nontarget 추가
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
    const _options = selectContainer.querySelector(".select-options");
    const _slct = selectContainer.querySelector(".select");
    // default value
    _box.dataset.selected = _slct.selectedOptions[0].value;
    _box.textContent = _slct.selectedOptions[0].label;

    _options.innerHtml = "";

    // set options
    _slct.querySelectorAll("option").forEach((option) => {
      const _list = document.createElement("li");
      _list.dataset.value = option.value;
      _list.textContent = option.label;
      _list.classList.add("select-option");
      _options.appendChild(_list);
    });
  }
  selectContainers.forEach((container) => {
    initSelectBox(container);
    if (container.classList.contains("is-disabled")) return;
    const selectOptions = container.querySelectorAll(".select-option");
    const selectBox = container.querySelector(".select-box");
    const selectHidden = container.querySelector(".select");
    container.addEventListener("click", (e) => {
      // (todo) popup table 내의 select 일경우 추가
      const _option = e.target.nextElementSibling;
      if (e.target === selectBox) {
        deactivateAllSelect(selectBox);
        selectBox.classList.toggle("active");
        if (e.target.closest(".dialog td")) {
          console.log(e.target.getBoundingClientRect());
          let popupY = document
            .querySelector(".dialog.is-show")
            .getBoundingClientRect().top;
          let optionY = e.target.getBoundingClientRect().top + 60 - popupY;
          _option.setAttribute(
            "style",
            `position:fixed; top: ${optionY}px; left:auto; width: ${e.target.offsetWidth}px`
          );
        }
      }
      selectOptions.forEach((option) => {
        if (e.target === option) {
          selectBox.textContent = option.textContent;
          selectBox.classList.remove("active");
          selectHidden.value = option.dataset.value;
          selectHidden.dispatchEvent(new Event("change"));
        }
        // (todo) popup table 내의 select 일경우 추가
        option.removeAttribute("style");
      });
    });
    selectHidden.addEventListener("change", (e) => {
      console.log(e);
    });
  });
}
