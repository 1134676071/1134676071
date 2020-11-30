(function () {
  var divSwitch = $(".menu_switch");
  var ulNav = $(".menu_nav");



  // 切换显示状态
  function toggleNav() {
    // divSwitch 如果有menu_switch--expand，则去掉，否则加上
    //divSwitch.classList 类样式列表
    divSwitch.classList.toggle("menu_switch--expand");
    ulNav.classList.toggle("menu_nav--expand");
  }

  divSwitch.onclick = toggleNav;

  ulNav.addEventListener("click", function () {
    toggleNav();
  });
})();
