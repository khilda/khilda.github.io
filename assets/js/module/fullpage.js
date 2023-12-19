export class PageScroll {
  constructor() {
    this._sections = null; // fullpage 이벤트 대상 타겟들
    this._curDom = null; // 현재 활성화된 section
    this.wheelValue = 0; // 스크롤 범위
    this.wheelDir = 0; // 스크롤 방향 (-1: 위, 1: 아래)
    this.touchStart = 0; // 터치시작좌표
    this.touchEnd = 0; // 터치종료좌표

    this._scrollBefore = null; // 스크롤시 공통 이벤트
    this.callback = []; // 스크롤시 callback 이벤트

    this.timerId = null; // 스크롤 디바운스

    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener("resize", this.resizeHandler);
    this.scrollHandler = this.handleScroll.bind(this);

    this.handleResize();

    this.initFullPage();
  }

  initFullPage() {
    this.updateCurrentSection();
    this.handleResize();
    // 해당 지정이 아닐경우, 삭제
    if (!this._sections.length) {
      this.removeScrollListener();
    }
  }

  debouncing(func, timeout = 100) {
    clearTimeout(this.timerId);
    const _this = this;
    this.timerId = setTimeout(() => func.apply(_this), timeout);
  }

  handleScroll(e) {
    if (e.type === "touchend") {
      this.touchEnd = e.changedTouches[0]?.clientY ?? 0;
      this.wheelValue = this.touchEnd - this.touchStart;
      if (Math.abs(this.wheelValue) < 80) this.wheelValue = 0;
    } else {
      this.wheelValue = e.wheelDelta ?? e.deltaY;
    }
    this.wheelDir = Math.max(-1, Math.min(1, this.wheelValue));
    if (!(window.scrollY === 0 && e.deltaY < 0)) {
      // 페이지 전환
      this.debouncing(this.updateCurrentSection);
    }
  }
  handleResize() {
    this.addScrollListener();
    this.removeTouchListener();
  }

  addScrollListener() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", this.scrollHandler);
    // tablet
    window.addEventListener("touchstart", (e) => {
      this.touchStart = e.changedTouches[0]?.clientY ?? 0;
    });
    window.addEventListener("touchend", this.scrollHandler);
  }
  removeScrollListener() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    window.removeEventListener("wheel", this.scrollHandler);
    // tablet
    window.removeEventListener("touchend", this.scrollHandler);
  }

  addTouchListener() {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");
    window.addEventListener("scroll", this.scrollHandler);
  }
  removeTouchListener() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  updateCurrentSection() {
    if (!this._sections) {
      this._sections = document.querySelectorAll("[data-page]");
      this._curDom = this._sections[0];
    }
    // PC일 경우에만 fullpage 이벤트
    this._sections.forEach((el) => el.classList.remove("isPageActive"));
    let prevIdx = Array.from(this._sections).indexOf(this._curDom);
    let idx = prevIdx < 0 ? this._sections.length : prevIdx;
    idx -= this.wheelDir;
    if (idx < 0) {
      this._curDom = this._sections[0];
      this._curDom.classList.add("isPageActive");
      return;
    } else if (idx < this._sections.length) {
      this._curDom = this._sections[idx];
    } else {
      this._curDom = null;
    }
    if (this._curDom && this._scrollBefore) {
      this._scrollBefore(this._curDom);
    }
    
    this.scrollToSection();

    if (this.callback.length) {
      this.callback.forEach((cb) => {
        if (cb.target === this._curDom) {
          cb.fn();
        }
      });
    }
  }
  scrollToSection(target) {
    let scrollTo = 0;
    if (target) this._curDom = target;
    const isIncludeDom = Array.from(this._sections).find((node) =>
      node.isEqualNode(this._curDom)
    );
    if (isIncludeDom) {
      this._curDom.classList.add("isPageActive");
      scrollTo = window.scrollY + this._curDom.getBoundingClientRect().top;
    } else {
      this._curDom = null;
      scrollTo = document.documentElement.getBoundingClientRect().height;
    }
    window.scrollTo({
      top: scrollTo,
      left: 0,
      behavior: "smooth",
    });
  }
  scrollBefore(fn) {
    this._scrollBefore = fn;
  }
  scrollCallback(target, fn) {
    this.callback.push({ target, fn });
    return this.callback;
  }
}
