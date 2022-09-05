function getRem(design_w, unit) {
  var html = document.getElementsByTagName("html")[0];
  var real_w = document.documentElement.clientWidth;
  html.style.fontSize = real_w / design_w * unit + "px";
}
getRem(1920, 16)
//window.addEventListener("resize",getRem);
window.onresize = function () {
  getRem(1920, 16)
}