'use strict';

(function(){
  function resetFontSize () {
    setTimeout(function(){
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});


    },0);
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});


    });
  }
  if (typeof WeixinJSBridge === 'undefined') {
    document.addEventListener('WeixinJSBridgeReady', function (e) {
      resetFontSize();
    });
  } else {
    resetFontSize();
  }
})();