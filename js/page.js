var showPage = (function () {
  var pageIndex = 0; //当前页面索引
  var pages = $$(".page_container .page"); 
  var nextIndex = null; //下一个页面的索引
  
  //设置静止状态下的样式 
  function setStatic() {
    nextIndex = null; // 当前静止状态下没有下一个页面
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      if (i === pageIndex) {
        page.style.zIndex = 1;
      } else {
        page.style.zIndex = 10;
      }
      // 位置为
      page.style.top = (i - pageIndex) * height() + "px";
    }
  }

  setStatic();

  
  function moving(dis) {
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i]; 
      if (i !== pageIndex) {
        page.style.top = (i - pageIndex) * height() + dis + "px";
      }
    }
    //设置下一个页面
    if (dis > 0 && pageIndex > 0) {
      // 往下移动，目前不是第一页
      nextIndex = pageIndex - 1;
    } else if (dis < 0 && pageIndex < pages.length - 1) {
      // 往上移动 目前不是最后一页
      nextIndex = pageIndex + 1;
    } else {
      nextIndex = null;
    }
  }

  function finishMove() {
    if (nextIndex === null) {
      // 没有下一个
      setStatic(); //复位
      return;
    }
    var nextPage = pages[nextIndex]; //下一个页面
    nextPage.style.transition = ".5s"; 
    nextPage.style.top = 0;

    setTimeout(function () {
      // 页面变了
      pageIndex = nextIndex;
      // 动画结束
      nextPage.style.transition = "";
      setStatic();
    }, 500);
  }

  var pageContainer = $(".page_container");
  pageContainer.ontouchstart = function (e) {
    // 类似mousedown  模拟手指按下
    var y = e.touches[0].clientY;

    function handler(e) {
      var dis = e.touches[0].clientY - y;
      if (Math.abs(dis) < 20) {
        // 防止误触
        dis = 0; // 设置为手指没动
      }
      moving(dis);
      //阻止事件的默认行为
      if (e.cancelable) {
        //如果事件可以取消
        e.preventDefault(); // 取消事件 阻止默认行为
      }
    }
    //如果手指按下，=开始监听移动
    pageContainer.addEventListener("touchmove", handler, {
      passive: false,
    });

    // 手指松开，完成移动
    pageContainer.ontouchend = function () {
      finishMove();
      pageContainer.removeEventListener("touchmove", handler);
    };
  };

  // 自动切换到某个板块
  function showPage(index) {
    var nextPage = pages[index]; //下一个页面元素
    if (index < pageIndex) {
      //如果下一个页面在当前页面上面
      nextPage.style.top = -height() + "px";
    } else if (index > pageIndex) {
      nextPage.style.top = height() + "px";
    } else {
      if (pageIndex === 0) {
        // 目前是第一个页面
        pageIndex++;
      } else {
        pageIndex--;
      }
      setStatic(); // 重新设置位置
    }
    // 强行让浏览器渲染
    nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
    nextIndex = index; // 设置下一个页面索引
    finishMove();
  }

  return showPage;
})();
