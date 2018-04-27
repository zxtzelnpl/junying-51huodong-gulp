'use strict'
var readyRE = /complete|loaded|interactive/;
var ready = function (callback) {
  // need to check if document.body exists for IE as that browser reports
  // document ready when it hasn't yet created the body element
  if (readyRE.test(document.readyState) && document.body) callback()
  else document.addEventListener('DOMContentLoaded', function () {
    callback()
  }, false)
}
var addCss = function(ele,cssArray){
  var originCssArray = ele.className.split(' ');
  var cssStringArray = originCssArray.concat(cssArray);
  ele.className = cssStringArray.join(' ');
}
var removeCss = function(ele,cssString){
  var originCssArray = ele.className.split(' ');
  var cssStringArray = originCssArray.filter(function(css){
    return css!==cssString
  });
  ele.className = cssStringArray.join(' ');
}

ready(function(){
  var bounce = null;
  var ANIMATION_ONE = 0;
  var ANIMATION_TWO = 0;
  var ANIMATION_THREE = 0;
  var innerHeight = window.innerHeight;
  var bannerDom = document.getElementById('banner');
  var teacherTwoDom = document.getElementById('maxin');
  var teacherThreeDom = document.getElementById('zhouyue');
  var animationEnd = (function(el){
    var animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd',
    };

    for (var t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  })(document.createElement('div'));

  function teacherAnimation(wuweiwei){
    var teacher = document.getElementById(wuweiwei);
    var bigShow = teacher.querySelector('.bigShow img');
    var title = teacher.querySelector('.title p');
    var texts = teacher.querySelector('.texts p');
    removeCss(bigShow,'slideInLeftBegin');
    addCss(bigShow,['slideInLeft','animated']);
    removeCss(title,'slideInLeftBegin');
    addCss(title,['slideInLeft','animated']);
    removeCss(texts,'slideInLeftBegin');
    addCss(texts,['slideInLeft','animated']);
  }

  function teacherOneAnimation(){
    teacherAnimation('wuweiwei');
    ANIMATION_ONE=1;
  }
  function teacherTwoAnimation(){
    teacherAnimation('maxin');
    ANIMATION_TWO=1;
  }
  function teacherThreeAnimation(){
    teacherAnimation('zhouyue');
    ANIMATION_THREE=1;
  }
  function touchMoveHandle(){
    clearTimeout(bounce);
    bounce = setTimeout(function(){
      var topTwo = teacherTwoDom.getBoundingClientRect().top
      if(ANIMATION_TWO===0&&topTwo<innerHeight){
        teacherTwoAnimation()
      }

      var topThree = teacherThreeDom.getBoundingClientRect().top
      if(ANIMATION_THREE===0&&topThree<innerHeight){
        teacherThreeAnimation()
      }
    },200);
  }


  addCss(bannerDom,['animated','zoomIn']);
  touchMoveHandle();

  if(animationEnd){
    bannerDom.addEventListener(animationEnd,teacherOneAnimation,false);
  }
  else{
    teacherOneAnimation();
  }


  document.addEventListener('touchmove',touchMoveHandle);
})