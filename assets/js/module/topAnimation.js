/**
 * 탑 버튼 animation 실행
 */

export const btnTopAnimate = () => {
  const _wrap = document.querySelector(".wrap");
  const _progressWrap = document.querySelector(".btn-top");
  if (!_progressWrap) return;

  const progressPath = _progressWrap.querySelector("path");
  const pathLength = progressPath.getTotalLength();
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();

  const updateProgress = function () {
    var scroll = window.scrollY;
    var height = _wrap.offsetHeight - window.innerHeight;
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  _progressWrap.addEventListener("click", () => {
    const _target = document.getElementById("visual");
    window.pageAnimation.scrollToSection(_target);
    return false;
  });

  const offset = 50;
  window.addEventListener("scroll", () => {
    updateProgress();
    if (document.documentElement.scrollTop > offset) {
      _progressWrap.classList.add("is-progress");
    } else {
      _progressWrap.classList.remove("is-progress");
    }
  });
};
