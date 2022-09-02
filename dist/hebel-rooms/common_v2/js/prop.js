Apps.Prop = {
  init : function(){

    var _this = this;
    if($('#contents').hasClass('_bid-searchtype-ensen')){
      _this.checkSelectedOptions_ensen();
    }else{
      _this.checkSelectedOptions();
    }
    _this.imageGalleryInit();
  },

  imageGalleryAnimateFlag : false,
  imageGalleryUlLength : 0,
  imageGalleryInit : function(){
    var _this = this,
        targetClass = 'hbr-image-gallery'
        thumbClassName = targetClass + '-thumb',
        $gallerys = $('.'+targetClass),
        $thumbs = $('.'+thumbClassName);

    $.each($thumbs, function(index, $thumbObj) {
      var targetUlWrap = $($thumbObj).find('.thumb-wrap');
      _this.imageGalleryClickThumb($thumbObj, targetUlWrap);

      // show first ul
      targetUlWrap.find('ul:first-child').addClass('on fadein');
      _this.imageGalleryUlLength = targetUlWrap.find('ul:first-child').find('li').length;

      // activate pager
      _this.imageGalleryInitPager($thumbObj, targetUlWrap);

    });

    $.each($gallerys, function(index, gallery) {
      // gallery Navigation

      _this.imageGalleryClickMainImgNavigation(gallery);

      // flip for smart device
      if(Apps.mbLayoutFlag == 'mb'){

        var flipsnap = Flipsnap(gallery, {
          maxPoint: 1,
           distance: 2
        });
        flipsnap.element.addEventListener('fstouchmove', function(ev) {
        ev.delta;     //=> delta x value, given px
        ev.direction; //=> direction value, 1 or -1

          var $gallery = $(this),
              $mainimg = $gallery.find('.image-area'),
              nextFlag = (ev.direction === 1)? true : false;

          _this.imageGalleryAnimation($gallery, $mainimg, nextFlag);
          flipsnap.moveToPoint(1);
        }, false);

      }


    });

  },


  imageGalleryClickThumb : function($thumbObj, targetUlWrap){

    var _this = this,
        $tergetUl = $(targetUlWrap).find('ul'),
        $lists = $tergetUl.find('li');

    if($lists.length > 0){
      $lists.on('click touchend', 'a', function(event) {

        event.preventDefault();
        if(!_this.imageGalleryAnimateFlag){
          _this.imageGalleryAnimateFlag = true;
          var $mainimg = $($thumbObj).prev(),
              $_this = $(this),
              newSrc = $_this.attr('href'),
              newText = $_this.attr('data-name'),	//2017/01/26 add
              currentNum = $(targetUlWrap).find('a').index($_this);

          $lists.find('a').removeClass('c');
          $_this.addClass('c');

//          _this.imageGalleryMainImgFadeIn($mainimg, newSrc, currentNum);				//2017/01/26 mod
          _this.imageGalleryMainImgFadeIn($mainimg, newSrc, newText, currentNum);		//2017/01/26 mod

          _this.imageGalleryAnimateFlag = false;

          //-- add 151027
          if(Apps.mbLayoutFlag == 'mb'){
            var parent = $_this.parent('li'),
                pi = parent.index();
            if(typeof pi != undefined && pi > 7){
              var h = parent.parents('.gallery').offset(),
                  ht = h.top;

              $('body').animate({
                scrollTop: ht},
                150, function() {
              });
            }
          }


        }
      });
    }
    return;
  },


  imageGalleryMainImgFadeIn : function($mainimg, newSrc, newText, currentNum){

    var _this = this,
        $imgwrap = $mainimg.find('.mainimg');

    $imgwrap.removeClass('fadein');
    var hideImg = setTimeout(function(){
      $imgwrap.find('img').attr('src', newSrc);
      $imgwrap.parent().parent().find('.image-area-caption').text(newText);		//2017/01/26 add
      $imgwrap.addClass('fadein');
      $imgwrap.data('current', currentNum);
      clearTimeout(hideImg);
    }, 200);

    // $mainimg.find('.mainimg').fadeOut('fast', function() {
    //   $(this).find('img').attr('src', newSrc);
    //   $(this).fadeIn('fast', function() {
    //     $(this).data('current', currentNum);
    //   });
    // });

    return;
  },



  imageGalleryInitPager : function($thumbObj){
    var _this = this,
        pager = $($thumbObj).find('.thumb-pager');

    pager.on('click', 'a', function(event) {
      event.preventDefault();
      if(!$(this).hasClass('c')){
        if(!_this.imageGalleryAnimateFlag){
          _this.imageGalleryAnimateFlag = true;
          _this.imageGalleryMoveThumb($(this).data('slide-num'), $thumbObj);
          pager.find('a').removeClass('c');
          $(this).addClass('c');
          _this.imageGalleryAnimateFlag = false;

        }
      }
    });

  },


  imageGalleryMoveThumb : function(nextNum, thumbObj){

    var $obj = $(thumbObj).find('ul.on'),
        nextNum = nextNum,
        $nextObj = $obj.siblings('.ul-'+nextNum),
        currentNum = $(thumbObj).find('ul').index($obj) + 1;

    if( Number(currentNum) < Number(nextNum)){
      $obj.css({
        left: 40,
        // right: 'initial'
      })
      $nextObj.css({
        left: -20,
        // right: 'initial'
      });
    }else{
      $obj.css({
      left: -40,
        // left: 'initial'
      })
      $nextObj.css({
        left: 40,
        // left: 'initial'
      });
    }

    var timer = setTimeout(function(){
      $obj.removeClass('fadein');
      $nextObj.addClass('on');

      var timer2 = setTimeout(function(){
        $obj.removeClass('on');
        $nextObj.addClass('fadein').css({
          left: 0
        });

      }, 150);

      clearTimeout(timer);
    }, 150);



  },


  imageGalleryClickMainImgNavigation : function(gallery){
    var _this = this,
        $gallery = $(gallery),
        $galleryNavi = $gallery.find('.gallery-navigation'),
        $mainimg = $gallery.find('.image-area');

    $galleryNavi.find('a').on('click', function(event) {
      event.preventDefault();
      var nextFlag = ($(this).hasClass('next'))? true : false;
      _this.imageGalleryAnimation($gallery, $mainimg, nextFlag);

    });

  },


  imageGalleryAnimation : function($gallery, $mainimg, nextFlag){
    var _this = this;
        // UI蛻�崛譎�
    // var separateNum = (Apps.mbLayoutFlag !== 'mb')? 10 : 12;
    var separateNum = _this.imageGalleryUlLength;

    if(!_this.imageGalleryAnimateFlag){
      _this.imageGalleryAnimateFlag = true;

      var currentNum = $gallery.find('.mainimg').data('current'),
          lis = $gallery.siblings('.hbr-image-gallery-thumb').find('.thumb-wrap').find('li'),
          $thumbObj = $gallery.siblings('.hbr-image-gallery-thumb'),
          pager = $($thumbObj).find('.thumb-pager'),
          // current UL Num
          thumbWrap = $thumbObj.find('.thumb-wrap'),
          thumbUl = thumbWrap.find('ul'),
          thumbUlLength = thumbUl.length,
          currentThumbUl = thumbWrap.find('ul.on'),
          currentThumbIndex = thumbUl.index(currentThumbUl);

// del start 20160216
//    if(currentNum === (lis.length-1)){
//      var nextNum = (nextFlag)? 0 : currentNum-1;
//    }else if(currentNum == 0){
//      var nextNum = (nextFlag)? currentNum+1 : lis.length-1;
//    }else{
//      var nextNum = (nextFlag)? currentNum+1 : currentNum-1;
//    }
// del end 20160216
// add start 20160216
      var nodata = $gallery.siblings('.hbr-image-gallery-thumb').find('.thumb-wrap').find('span'),
          nodataLength = nodata.length;

      if((lis.length-1-nodataLength) == 0){
        var nextNum = 0;
      }else{
        if(currentNum === (lis.length-1-nodataLength)){
          var nextNum = (nextFlag)? 0 : currentNum-1;
        }else if(currentNum == 0){
          var nextNum = (nextFlag)? currentNum+1 : lis.length-1-nodataLength;
        }else{
          var nextNum = (nextFlag)? currentNum+1 : currentNum-1;
        }
      }
// add end 20160216
      var newSrc = $(lis[nextNum]).find("a").attr("href");
      var newText = $(lis[nextNum]).find("a").attr("data-name");	//2017/01/26 add

      lis.find('a').removeClass('c');
      $(lis[nextNum]).find("a").addClass('c');


      // check
      if(Math.floor(currentNum/separateNum) === currentThumbIndex
      && thumbUlLength > 1 ) {
        // move pager
        // if last
        if((nextNum%separateNum === 0) && nextFlag){
          var slideNum = Math.ceil(nextNum/separateNum);

          _this.imageGalleryMoveThumb(slideNum+1, $thumbObj);
          pager.find('a').removeClass('c');
          pager.find('a.pager-'+(slideNum+1)).addClass('c');
        }
// del start 20160216
//      else if((nextNum%separateNum === (separateNum-1)) && !nextFlag){
//      var slideNum = Math.ceil(nextNum/separateNum);
// del end 20160216
// add start 20160216
        else if((currentNum%separateNum === 0) && !nextFlag){
          if(currentThumbIndex === 0){
            var slideNum = thumbUlLength;
          } else {
            var slideNum = currentThumbIndex;
          }
// add end 20160216
          _this.imageGalleryMoveThumb(slideNum, $thumbObj);
          pager.find('a').removeClass('c');
          pager.find('a.pager-'+(slideNum)).addClass('c');
        }

      }
//      _this.imageGalleryMainImgFadeIn($mainimg, newSrc, nextNum);				//2017/01/26 mod
      _this.imageGalleryMainImgFadeIn($mainimg, newSrc, newText, nextNum);		//2017/01/26 mod

      var timer = setTimeout(function(){
        _this.imageGalleryAnimateFlag = false;
      }, 500);

    }

  },


  imageGalleryClickMainImg : function(){


  },


  checkSelectedOptions : function(){

    var $body = $('body'),
        $contents = $body.find('#contents'),
        $chks = $contents.find('input[type="checkbox"]');

    $chks.change(function(event) {
      if($contents.find('input[type="checkbox"]:checked').length > 0){
        $('#floating-submit-btn').fadeIn('fast', function() {
        });
      }else{
        $('#floating-submit-btn').fadeOut('fast', function() {
        });
      }
    });


    // if($contents.hasClass('search-properties')){

    //   var target_distance = 100,
    //       contentsOffset = $contents.offset(),
    //       contentsOffsetTop = contentsOffset.top,
    //       contentsHeight = $contents.height(),
    //       windowHeight = $(window).height();

    //   if(scroll_pos>=target_distance && scroll_pos < (contentsHeight-windowHeight)){
    //     $('#floating-submit-btn').fadeIn('fast', function() {

    //     });

    //   }else{
    //     $('#floating-submit-btn').fadeOut('fast', function() {

    //     });
    //     // var timer = setTimeout(function(){
    //     //   $('#floating-submit-btn').removeClass('on');
    //     //   clearTimeout(timer);
    //     // }, 300);
    //   }

    // }

  },



  checkSelectedOptions_ensen : function(){

    var $body = $('body'),
        $contents = $body.find('#contents'),
        $chks = $contents.find('.ensen-list').find('input[type="checkbox"]');

    $chks.change(function(event) {

      if($(this).parents('#search-options').length===0){
        if($contents.find('.ensen-list').find('input[type="checkbox"]:checked').length > 0){
          $('#floating-submit-btn').fadeIn('fast', function() {
          });
        }else{
          $('#floating-submit-btn').fadeOut('fast', function() {
          });
        }
      }

    });

  },




  /*
   * Add 20151222
   * 逕ｻ蜒上�螟画峩
   */
  changeButtonsStatus : function(thisObj, cookieKind){

    var _this = this;


    if($('.property_detail').hasClass('single')){
      // for single page

      if(cookieKind === "QList"){
        var $tar = $('.addlist');
      }else if(cookieKind === "favorite"){
        var $tar = $('.addfavorite');
      }else{
        var $tar = $('.addfavorite');
      }
      $tar.addClass('added');

      if(Apps.Util.checkTheDevice == "mb"){
        $tar.find('img').attr('src', $tar.find('img').attr('src').replace('add', 'added'));
      }


    }else{
      // for archive page

      thisObj.addClass('added');

      if(Apps.Util.checkTheDevice == "mb"){
        thisObj.find('img').attr('src', thisObj.find('img').attr('src').replace('add', 'added'));
      }


    }

    return;
  },




  /*
   * 縲悟撫縺�粋繧上○繝ｪ繧ｹ繝医↓霑ｽ蜉�縲阪ｒ謚ｼ荳九＠縺滄圀縺ｮ繝懊ち繝ｳ逕ｻ蜒上�螟画峩
   */
  addContactList : function(){

    var _this = this,
        $tar = $('.addlist');

    $tar.on('click touchend', function(event) {
      event.preventDefault();
      var $this = $(this);
      if($this.hasClass('added')){
        // 菴輔ｂ縺励↑縺�
      }else{
        var name = 'clientcorp_room_cd';
        var cookieValue = $this.data('value');

        _this.cookieWrite(name, cookieValue, $this, 'QList');
      }
    });

  },




  /*
   * 縲後♀豌励↓蜈･繧翫Μ繧ｹ繝医↓霑ｽ蜉�縲阪ｒ謚ｼ荳九＠縺滄圀縺ｮ繝懊ち繝ｳ逕ｻ蜒上�螟画峩
   */
  addFavoriteList : function(){

    var _this = this,
    $tar = $('.addfavorite');
    
    // 2022/07/11 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�169蟇ｾ蠢� START
    $tar.on('click', function(event) {
    // 2022/07/11 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�169蟇ｾ蠢� END
      event.preventDefault();
      var $this = $(this);
      // 2022/06/14 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�154蟇ｾ蠢� START
      if($this.hasClass('added')){
        
        var name = 'favorite_clientcorp_room_cd';
        var cookieValue = $this.data('value');

        _this.cookieWrite(name, cookieValue, $this, 'favorite');
      }else{
        
        var name = 'favorite_clientcorp_room_cd';
        var cookieValue = $this.data('value');
        
        _this.deleteWrite (name, cookieValue, $this);
      }
      // 2022/06/14 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�154蟇ｾ蠢� END
    });

  },




  /*
   * 縲後♀豌励↓蜈･繧翫Μ繧ｹ繝医↓霑ｽ蜉�縲阪ｒ謚ｼ荳九＠縺滄圀縺ｮ繝懊ち繝ｳ逕ｻ蜒上�螟画峩
   */
  newAddFavoriteList : function(){

    var _this = this,
        $tar = $('.js-property-detail-favorite,.js-modal-favorite');
	
    // 2022/07/11 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�169蟇ｾ蠢� START
    $tar.on('click', function(event) {
    // 2022/07/11 202205繝｡繧ｾ繝ｳ繧ｵ繧､繝医Μ繝九Η繝ｼ繧｢繝ｫ縺ｮ隱ｲ鬘�169蟇ｾ蠢� END
    
      event.preventDefault();
      var $this = $(this);
      
      if(!$this.hasClass('is-active')){
          var name = 'favorite_clientcorp_room_cd';
          var cookieValue = $this.data('value');
          _this.deleteWrite (name, cookieValue, $this);
      }else{
          var name = 'favorite_clientcorp_room_cd';
          var cookieValue = $this.data('value');
          _this.newCookieWrite(name, cookieValue, $this, 'favorite');
        }
    });

  },



  /*
   *繧ｯ繝�く繝ｼ逋ｺ陦�
   */
  cookieWrite : function(name, cookieValue, thisObj, cookieKind){

    // add 20151222
    var _this = this;


    var cookieTemp = document.cookie.split(";");
    var value = '';
    var dateTemp    = new Date();
    //譛牙柑譛滄剞�亥濠蟷ｴ��
    dateTemp.setTime(dateTemp.getTime() + 180*24*60*60*1000);
    var date    = dateTemp.toGMTString();
    expires = 'expires='+date+'; ';
    var cookieArr = [];

    var alreadyCookied = false;

    if(cookieTemp != null){
      for(var cookieCnt = 0; cookieCnt < cookieTemp.length; cookieCnt++){
        var temp = cookieTemp[cookieCnt].split("=");
        if(temp[0].replace(" ", "") == name){
          cookieArr = temp[1].split("_");
          for(var cookieCnt2 = 0; cookieCnt2 < cookieArr.length; cookieCnt2++){
            if(cookieArr[cookieCnt2] != ""){
              if(cookieArr[cookieCnt2] == cookieValue) {
                alreadyCookied = true;
              }
              value = value + "_" + cookieArr[cookieCnt2];
            }
          }
        }
      }
    }

    if(alreadyCookied){

      // add 20151222
      _this.changeButtonsStatus(thisObj, cookieKind);

      // del 20151222
      // thisObj.addClass('added');
      // thisObj.find('img').attr('src', thisObj.find('img').attr('src').replace('add', 'added'));

    }else if(cookieArr.length >= 50){
      if(cookieKind == 'favorite'){
        alert("縺頑ｰ励↓蜈･繧翫�50莉ｶ縺ｾ縺ｧ縺励°逋ｻ骭ｲ縺ｧ縺阪∪縺帙ｓ縲�");
      }else{
        alert("縺雁撫縺�粋繧上○繝ｪ繧ｹ繝医�50莉ｶ縺ｾ縺ｧ縺励°逋ｻ骭ｲ縺ｧ縺阪∪縺帙ｓ縲�");
      }
    }else{
      document.cookie = name+'='+cookieValue+value+'; path=/; '+expires;

      // add 20151222
      _this.changeButtonsStatus(thisObj, cookieKind);

      // del 20151222
      // thisObj.addClass('added');
      // thisObj.find('img').attr('src', thisObj.find('img').attr('src').replace('add', 'added'));
      
    }

  },



  /*
   *繧ｯ繝�く繝ｼ逋ｺ陦�
   */
  newCookieWrite : function(name, cookieValue, thisObj, cookieKind){

    var _this = this;
    var cookieTemp = document.cookie.split(";");
    var value = '';
    var dateTemp    = new Date();
    //譛牙柑譛滄剞�亥濠蟷ｴ��
    dateTemp.setTime(dateTemp.getTime() + 180*24*60*60*1000);
    var date    = dateTemp.toGMTString();
    expires = 'expires='+date+'; ';
    var cookieArr = [];

    var alreadyCookied = false;

    if(cookieTemp != null){
      for(var cookieCnt = 0; cookieCnt < cookieTemp.length; cookieCnt++){
        var temp = cookieTemp[cookieCnt].split("=");
        if(temp[0].replace(" ", "") == name){
          cookieArr = temp[1].split("_");
          for(var cookieCnt2 = 0; cookieCnt2 < cookieArr.length; cookieCnt2++){
            if(cookieArr[cookieCnt2] != ""){
              if(cookieArr[cookieCnt2] == cookieValue) {
                alreadyCookied = true;
              }
              value = value + "_" + cookieArr[cookieCnt2];
            }
          }
        }
      }
    }

    if(alreadyCookied){
    }else if(cookieKind != 'favorite' && cookieArr.length >= 10){
        alert("縺雁撫縺�粋繧上○繝ｪ繧ｹ繝医�10莉ｶ縺ｾ縺ｧ縺励°逋ｻ骭ｲ縺ｧ縺阪∪縺帙ｓ縲�");
    }else{
      document.cookie = name+'='+cookieValue+value+'; path=/; '+expires;
      //if(cookieKind == 'favorite') {
      //    $('#js-property-detail-favorite_' + cookieValue + ',#js-modal-favorite_' + cookieValue).addClass('is-active');
      //}
    }
  },

  /*
   *繧ｯ繝�く繝ｼ蜑企勁
   */
  deleteWrite : function(name, cookieValue, thisObj){

    var cookieTemp = document.cookie.split(";");
    var value = '';
    var dateTemp    = new Date();
    //譛牙柑譛滄剞�亥濠蟷ｴ��
    dateTemp.setTime(dateTemp.getTime() + 180*24*60*60*1000);
    var date    = dateTemp.toGMTString();
    expires = 'expires='+date+'; ';
    var cookieArr = [];

    if(cookieTemp != null){
      for(var cookieCnt = 0; cookieCnt < cookieTemp.length; cookieCnt++){
        var temp = cookieTemp[cookieCnt].split("=");
        if(temp[0].replace(" ", "") == name){
          cookieArr = temp[1].split("_");
          for(var cookieCnt2 = 0; cookieCnt2 < cookieArr.length; cookieCnt2++){
            if(cookieArr[cookieCnt2] != cookieValue){
              value = value + "_" + cookieArr[cookieCnt2];
            }
          }
        }
      }
    }

    document.cookie = name+'='+value.substring(1)+'; path=/; '+expires;
    //thisObj.removeClass('is-active');
	//$('#js-property-detail-favorite_' + cookieValue + ',#js-modal-favorite_' + cookieValue).removeClass('is-active');
  }



}



//window.onresize = Apps.Util.reisze;

$(function(){
Apps.Prop.init();
Apps.Prop.addContactList();
Apps.Prop.addFavoriteList();
// 2022/01/17  譽滉ｸ隕ｧ逕ｻ髱｢繧貞ｻｺ迚ｩ蜊倅ｽ阪〒陦ｨ遉ｺ縺吶ｋ蟇ｾ蠢�  add start
Apps.Prop.newAddFavoriteList();
// 2022/01/17  譽滉ｸ隕ｧ逕ｻ髱｢繧貞ｻｺ迚ｩ蜊倅ｽ阪〒陦ｨ遉ｺ縺吶ｋ蟇ｾ蠢�  add end

if($('.h-line-main').length>0){
$('.h-line-main').heightLine({
        minWidth:740
});
}

});