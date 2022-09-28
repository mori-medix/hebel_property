"use strict";

($(function () {
    var elForEach = Array.prototype.forEach;
    var mql_sp = window.matchMedia('screen and (max-width: 739px)');

    var getDevice = (function () {
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            return 'sp';
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            return 'tab';
        } else {
            return 'other';
        }
    })();

    //電話番号を取得して設定(spだけでリンクさせるため)
    // var tel = document.getElementsByClassName('js-tel');
    // if (getDevice == 'sp') {
    //     elForEach.call(tel, function (value) {
    //         var telno = value.dataset.telno;
    //         value.innerHTML = '<a href="tel:' + telno + '">' + value.innerHTML + '</a>';
    //     });
    // }

    //アイコンのリンクの切り替え
    var iconPet = document.getElementsByClassName('js-detail-info-pet');
    var iconFufu = document.getElementsByClassName('js-detail-info-fufu');
    var iconBoliki = document.getElementsByClassName('js-detail-info-boliki');
    var iconFreem2 = document.getElementsByClassName('js-detail-info-freem2');

    if (getDevice == 'sp') {
        elForEach.call(iconPet, function (value) {
            value.innerHTML = '<a href="/hebel-rooms/lightbox/index_sp.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconFufu, function (value) {
            value.innerHTML = '<a href="/hebel-rooms/lightbox02/index_sp.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconBoliki, function (value) {
            value.innerHTML = '<a href="/hebel-rooms/lightbox04/index.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconFreem2, function (value) {
            value.innerHTML = '<a href="/hebel-rooms/lightbox05/index_sp.html/">' + value.innerHTML + '</a>';
        });
    } else {
        elForEach.call(iconPet, function (value) {
            value.innerHTML = '<a class="js-modal-iframe" data-fancybox-type="iframe" href="/hebel-rooms/lightbox/index.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconFufu, function (value) {
            value.innerHTML = '<a class="js-modal-iframe" data-fancybox-type="iframe" href="/hebel-rooms/lightbox02/index.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconBoliki, function (value) {
            value.innerHTML = '<a class="js-modal-iframe" data-fancybox-type="iframe" href="/hebel-rooms/lightbox04/index.html/">' + value.innerHTML + '</a>';
        });
        elForEach.call(iconFreem2, function (value) {
            value.innerHTML = '<a class="js-modal-iframe" data-fancybox-type="iframe" href="/hebel-rooms/lightbox05/index.html/">' + value.innerHTML + '</a>';
        });
    }

    //スクロール
    $(".js-scroll").on('click', function (event) {
        event.preventDefault();
        var url = this.href;
        var parts = url.split("#");
        var target = parts[1];
        var target_offset = $("#" + target).offset();
        var target_top = target_offset.top;
        $('html, body').animate({scrollTop: target_top - 80}, 700);
    });

    //お気に入り状態変化
    var favorite = document.querySelectorAll('.js-favorite a');
    elForEach.call(favorite, function (value) {
        value.addEventListener('click', function (event) {
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
            favoriteAdd(this);
        }, false);
    });

    function favoriteAdd(el) {
        if (el.classList.contains('added')) {
            elForEach.call(favorite, function (value) {
                value.classList.remove('added');
            });
        } else {
            elForEach.call(favorite, function (value) {
                value.classList.add('added');
                                
                var flag = true;
                var cookies = document.cookie; //全てのcookieを取り出して
                var cookiesArray = cookies.split(';'); // ;で分割し配列に
                for(var c of cookiesArray){ //一つ一つ取り出して
                    var cArray = c.split('='); //さらに=で分割して配列に
                    if( cArray[0] == ' doNotShowMsgAgain' && cArray[1] == '1'){ // 取り出したいkeyと合致したら
                        flag = false;
                    }
                }
                if (flag) {
                    openFavoriteModal();
                }
            });
        }
    }

    //テキストもっとみる
    var txtHeight;
    var txtHeightEl = document.querySelector('.js-txt-height');
    var commentBtn = document.querySelector('.js-comment-btn');
    var firstHeight;
    var firstHeightInnerTxt;

    if(txtHeightEl){
    function checkBreakPoint(mql) {
        if (mql.matches) {
            firstHeight = document.defaultView.getComputedStyle(txtHeightEl.parentNode, null).height;
            firstHeightInnerTxt = document.defaultView.getComputedStyle(txtHeightEl, null).height;
            moreText();
        } else {
            firstHeight = document.defaultView.getComputedStyle(txtHeightEl.parentNode, null).height;
            firstHeightInnerTxt = document.defaultView.getComputedStyle(txtHeightEl, null).height;
            moreText();
        }
    }
        // ブレイクポイントの瞬間に発火
        mql_sp.addListener(checkBreakPoint);
        // 初回チェック
        checkBreakPoint(mql_sp);
    }

    function moreText() {
        if (parseInt(firstHeight) < parseInt(firstHeightInnerTxt) - 2) {
            commentBtn.style.display = 'block';
        } else {
            commentBtn.style.display = 'none';
        }
    }

    if (commentBtn) {
        commentBtn.addEventListener('click', function (event) {
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
            if (this.classList.contains('open')) {
                this.classList.remove('open');
                txtClose(this);
            } else {
                this.classList.add('open');
                txtOpen(this);
            }
        }, false);
    }

    function txtOpen(el) {
        el.addEventListener('transitionend', onTxtOpen, false);
    }

    function txtClose(el) {
        el.removeEventListener('transitionend', onTxtOpen, false);
        txtHeightEl.parentNode.style.height = firstHeight;
        el.querySelector('.detail-comment-btntxt').innerText = 'もっとよむ';
        if(matchMedia('screen and (max-width: 739px)').matches){
            txtHeightEl.parentNode.style.maxHeight = 'calc(1.8em * 6.8)';
        };
    }

    function onTxtOpen() {
        this.querySelector('.detail-comment-btntxt').innerText = 'とじる';
        txtHeight = document.defaultView.getComputedStyle(txtHeightEl, null).height;
        txtHeightEl.parentNode.style.height = txtHeight;
        if(matchMedia('screen and (max-width: 739px)').matches){
            txtHeightEl.parentNode.style.maxHeight = txtHeight;
        };
    }

    //目安賃料のアコーディオン
    var accordionBtn = $('.js-accordion');
    accordionBtn.on('click',function () {
        var _this = $(this);
        _this.prev().slideToggle();
        if(_this.hasClass('open')){
            _this.removeClass('open');
        } else {
            _this.addClass('open');
        }
    });
    //条件が似た物件のスイッチ
    var  switchBtn = $('.js-switch-btn-list').find('button');

    switchBtn.on('click',function () {
        var _this = $(this);
        swichBtnChange(_this);
        bukkenImgChange(_this);
    });

    function swichBtnChange(_this) {
        switchBtn.removeClass('active');
        _this.addClass('active');
    }

    var gaikanImg = $('.js-gaikan-img');
    var madoriImg = $('.js-madori-img');
    function bukkenImgChange(_this) {
        if(_this.hasClass('js-gaikan')){
            madoriImg.removeClass('detail-similar-bukken-show');
            gaikanImg.addClass('detail-similar-bukken-show');
        } else if(_this.hasClass('js-madori')){
            gaikanImg.removeClass('detail-similar-bukken-show');
            madoriImg.addClass('detail-similar-bukken-show');
        }

    }
    if (matchMedia('(max-width: 739px)').matches) {
        var bukkenListLength = $('.js-detail-similar-bukken-list > li').length;
        var bukkenListWidth;
        switch (bukkenListLength) {
            case 1:
                bukkenListWidth = 385 / 750 * 100;
                break;
            case 2:
                bukkenListWidth = (385 * 2) / 750 * 100;
                break;
            case 3:
                bukkenListWidth = (385 * 3) / 750 * 100;
                break;
        }
        $('.js-detail-similar-bukken-list').css({'width': bukkenListWidth + 'vw'});
    }

    //サムネイルが8個以上なら削除
    if (matchMedia('(max-width: 739px)').matches) {
        var detailThumitem = $('.js-detail-thumitem');
        if (detailThumitem.length > 8) {
            detailThumitem.css({'display': 'none'});
            for (var i = 0; i < detailThumitem.length; i++) {
                if (i < 7) {
                    detailThumitem.eq(i).css({'display': 'block'});
                }
            }
        }
    }

    //横からでるサムネイル
    var slideOpenBtn = document.querySelectorAll('.js-thum-slide');
    var slideCloseBtn = document.querySelectorAll('.js-thum-slideclose');
    var pageWrap = document.querySelectorAll('html,body');
    var slideThumarea = document.getElementsByClassName('slide-thumarea')[0];
    var touchY = null;

    elForEach.call(slideOpenBtn, function (value) {
        value.addEventListener('click', function (event) {
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
            slideThumarea.classList.add('slide-thumarea-open');
            elForEach.call(pageWrap, function (value) {
                value.style.overflow = 'hidden';
            })
        })
    });

    elForEach.call(slideCloseBtn, function (value) {
        value.addEventListener('click', function (event) {
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
            slideThumarea.classList.remove('slide-thumarea-open');
            elForEach.call(pageWrap, function (value) {
                value.style.overflow = 'visible';
            })
        })
    });

    function onTouchStart(event) {
        if (event.targetTouches.length > 1) {
            return;
        }
        touchY = event.targetTouches[0].clientY;
    }

    function onTouchMove(event) {
        if (event.targetTouches.length > 1) {
            return;
        }
        var touchMoveDiff = event.targetTouches[0].clientY - touchY;

        if (slideThumarea.scrollTop === 0 && touchMoveDiff > 0) {
            event.preventDefault();
            return;
        }

        if (targetTotallyScrolled(slideThumarea) && touchMoveDiff < 0) {
            event.preventDefault();
        }
    }

    function targetTotallyScrolled(element) {
        return element.scrollHeight - element.scrollTop <= element.clientHeight;
    }

    //横からでるiphone対策
    slideThumarea.addEventListener("touchstart", onTouchStart, false);
    slideThumarea.addEventListener("touchmove", onTouchMove, false);

    //遅延読み込み
    var loadon = document.querySelectorAll('.js-img-load');
    var loadSwipeon = document.querySelectorAll('.js-swipe-img-load');
    var loadFlag = true;
    if (loadFlag) {
        elForEach.call(loadon, function (value) {
            value.addEventListener('click', function () {
                loadSwitch();
                objectFitImages('.object-fit-img img,.object-fit-cover-img img');
                loadFlag = false;
            }, false);
        });

        elForEach.call(loadSwipeon, function (value) {
            value.addEventListener('transitionend', function () {
                loadSwitch();
                objectFitImages('.object-fit-img img,.object-fit-cover-img img');
                loadFlag = false;
            }, false);
            value.addEventListener('touchstart', function () {
                loadSwitch();
                objectFitImages('.object-fit-img img,.object-fit-cover-img img');
                loadFlag = false;
            }, false);
        });
    }

    function loadSwitch() {
        elForEach.call(document.querySelectorAll('img[data-srcset]'), function (img) {
            img.setAttribute('src', img.getAttribute('data-srcset'));
            img.addEventListener('load', function () {
                img.removeAttribute('data-srcset');
            }, false);
        });
    }

    //モーダル
    var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
    var scrollOff = function (e) {
        e.preventDefault()
    };
    var modalSwiper;

    $('.js-property-modal-btn').on('click', function () {
        $('body').css('overflow', 'hidden');
        var $this = $(this);
        var slideNo = $this.parent().index();
        var modalHref = $this.attr('href');
        var $href = $(modalHref);
        $href.append('<div class="property-modal-shade js-property-modal-shade"></div>');
        $href.addClass('property-modal-show');
        $href.children('.js-property-modal-shade')[0].addEventListener('click', function () {
            modalHide($href);
        }, {once: true});
        $href.find('.js-property-modal-close')[0].addEventListener('click', function () {
            modalHide($href);
        }, {once: true});

        //スライダーの起動
        modalSwiper = new Swiper(modalHref + ' .swiper-container-modal', {
            initialSlide: slideNo,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        document.addEventListener('touchmove', scrollOff, {passive: false});
        return false;
    });

    //間取り図クリックで2番目の間取り
    $('.js-property-modal-btn-call').on('click',function () {
        $('.js-property-modal-btn').eq(1).click();
    });

    function modalHide(target) {
        $('body').css('overflow', 'visible');
        target.removeClass('property-modal-show');
        target.addClass('property-modal-hide');
        $('.property-modal-hide').on(animationEnd, function () {
            if (target.hasClass('property-modal-hide')) {
                target.children('.js-property-modal-shade').remove();
            }
            target.removeClass('property-modal-hide');
        });
        document.removeEventListener('touchmove', scrollOff, {passive: false});
    }

    var infoModal = document.querySelectorAll('.js-infomodal');

    var $modalData;
    $('.js-infomodal').on('click', function () {
        $modalData = $('#' + $(this).data('pointmodal'));
        $modalData.addClass('is-show');
    });
    $('.js-infomodalclose').on('click', function (event) {
        (event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
        $modalData.addClass('is-hide').removeClass('is-show');
        $modalData.on('animationend', function () {
            $modalData.removeClass('is-hide');
            $modalData.off('animationend');
        });
        setTimeout(function () {
            $modalData.removeClass('is-hide');
            $modalData.off('animationend');
        }, 600)
    });


    var bodyHeight = 0;
    var windowHeight = 0;
    var scrollElePos;
    window.addEventListener('load', function () {
        bodyHeight = $('body').height();
        windowHeight = $(window).height();
        scrollElePos = $('.detail-info-list').offset().top;
    }, false);

    var $scrollFixed = $('#js-scroll-fixed');
    //var windowHeight = window.outerHeight;
    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos + scrollElePos > scrollElePos && scrollPos > windowHeight - 330) {
            $scrollFixed.slideDown();
        //} else if (scrollPos + scrollElePos < scrollElePos || scrollPos === 0) {修正前
        } else if (scrollPos + scrollElePos > scrollElePos && scrollPos < windowHeight - 330) {
            $scrollFixed.slideUp();
        }
    });

    (function () {
        //navスクロール
        var scrollTop;
        var ticking = false;
        var detailNav = document.querySelector('.js-detail-nav');
        window.addEventListener('scroll', navShow,!document.documentMode ? { passive: true } : false);
        function navShow(){
            if (!ticking) {
                requestAnimationFrame(function() {
                    ticking = false;
                    scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
                    if(scrollTop >= 100){
                    detailNav.classList.add('is-show');
                    } else if(scrollTop === 0){
                        detailNav.classList.remove('is-show');
                    }
                });
                ticking = true;
            }
        }

        loadPolyfills();
        window.addEventListener('load', function () {
            //pc head
            var reachPositionEl = document.querySelectorAll('.js-detail-head-nav-event');
            var detailNavItem = document.querySelectorAll('.js-detail-nav-item a');

            var showBlock = function showBtn(entries) {
                entries.forEach(function (entry) {
                    Array.prototype.forEach.call(detailNavItem,function (value) {
                        if (entry.isIntersecting) {
                            if('#' + entry.target.getAttribute('id') === value.getAttribute('href')){
                                value.classList.add('detail-nav-active');
                            } else if('#' + entry.target.getAttribute('id') === '#detail-nav-item-remove-point') {
                                value.classList.remove('detail-nav-active');
                            }
                            else {
                                value.classList.remove('detail-nav-active');
                            }
                        }
                    })
                    //entriesは配列,entryは配列の中のオブジェクト
                });
            };

            var observer = new IntersectionObserver(showBlock, {
                rootMargin: '-50% 0px',
                threshold: [0,1.0]
            });
            //第一引数は交差したとき実行する関数
            //小さい方の数がターゲットの下辺をすぎたら発火する数字（０は一番下）大きい方の数がターゲット上辺をすぎたら（1.0は一番上）
            Array.prototype.forEach.call(reachPositionEl, function (value) {
                observer.observe(value); //監視したい要素を入れる
            });
        });

        /* Disable minification (remove `.min` from URL path) for more info */
        /* observer ポリフィル*/
// Polyfills for Intersection Observer and Array.from
        function loadPolyfills() {
            "use strict";

            var isIntersectionObserverSupported = "IntersectionObserver" in window;

            // Intersection Observer未サポート時にPolyfillを適用
            if (!isIntersectionObserverSupported) {
                IntersectionObserverPolyfill();
            };

            /// minified version of the Intersection Observer polyfill from: https://github.com/w3c/IntersectionObserver/tree/master/polyfill
            function IntersectionObserverPolyfill() {
                (function (h, f) {
                    function m(a) {
                        this.time = a.time;this.target = a.target;this.rootBounds = a.rootBounds;this.boundingClientRect = a.boundingClientRect;this.intersectionRect = a.intersectionRect || l();this.isIntersecting = !!a.intersectionRect;a = this.boundingClientRect;a = a.width * a.height;var b = this.intersectionRect;b = b.width * b.height;this.intersectionRatio = a ? b / a : this.isIntersecting ? 1 : 0;
                    }function d(a, b) {
                        var c = b || {};if ("function" != typeof a) throw Error("callback must be a function");if (c.root && 1 != c.root.nodeType) throw Error("root must be an Element");this._checkForIntersections = u(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);this._callback = a;this._observationTargets = [];this._queuedEntries = [];this._rootMarginValues = this._parseRootMargin(c.rootMargin);this.thresholds = this._initThresholds(c.threshold);this.root = c.root || null;this.rootMargin = this._rootMarginValues.map(function (a) {
                            return a.value + a.unit;
                        }).join(" ");
                    }function u(a, b) {
                        var c = null;return function () {
                            c || (c = setTimeout(function () {
                                a();c = null;
                            }, b));
                        };
                    }function n(a, b, c, e) {
                        "function" == typeof a.addEventListener ? a.addEventListener(b, c, e || !1) : "function" == typeof a.attachEvent && a.attachEvent("on" + b, c);
                    }function r(a, b, c, e) {
                        "function" == typeof a.removeEventListener ? a.removeEventListener(b, c, e || !1) : "function" == typeof a.detatchEvent && a.detatchEvent("on" + b, c);
                    }function p(a) {
                        try {
                            var b = a.getBoundingClientRect();
                        } catch (c) {}if (!b) return l();b.width && b.height || (b = { top: b.top, right: b.right, bottom: b.bottom, left: b.left, width: b.right - b.left, height: b.bottom - b.top });return b;
                    }function l() {
                        return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                    }function t(a, b) {
                        for (var c = b; c;) {
                            if (c == a) return !0;c = q(c);
                        }return !1;
                    }function q(a) {
                        return (a = a.parentNode) && 11 == a.nodeType && a.host ? a.host : a;
                    }if ("IntersectionObserver" in h && "IntersectionObserverEntry" in h && "intersectionRatio" in h.IntersectionObserverEntry.prototype) "isIntersecting" in h.IntersectionObserverEntry.prototype || Object.defineProperty(h.IntersectionObserverEntry.prototype, "isIntersecting", { get: function get() {
                            return 0 < this.intersectionRatio;
                        } });else {
                        var k = [];d.prototype.THROTTLE_TIMEOUT = 100;d.prototype.POLL_INTERVAL = null;d.prototype.USE_MUTATION_OBSERVER = !0;d.prototype.observe = function (a) {
                            if (!this._observationTargets.some(function (b) {
                                return b.element == a;
                            })) {
                                if (!a || 1 != a.nodeType) throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({ element: a, entry: null });this._monitorIntersections();this._checkForIntersections();
                            }
                        };d.prototype.unobserve = function (a) {
                            this._observationTargets = this._observationTargets.filter(function (b) {
                                return b.element != a;
                            });this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
                        };d.prototype.disconnect = function () {
                            this._observationTargets = [];this._unmonitorIntersections();this._unregisterInstance();
                        };d.prototype.takeRecords = function () {
                            var a = this._queuedEntries.slice();this._queuedEntries = [];return a;
                        };d.prototype._initThresholds = function (a) {
                            a = a || [0];Array.isArray(a) || (a = [a]);return a.sort().filter(function (a, c, e) {
                                if ("number" != typeof a || isNaN(a) || 0 > a || 1 < a) throw Error("threshold must be a number between 0 and 1 inclusively");return a !== e[c - 1];
                            });
                        };d.prototype._parseRootMargin = function (a) {
                            a = (a || "0px").split(/\s+/).map(function (a) {
                                a = /^(-?\d*\.?\d+)(px|%)$/.exec(a);if (!a) throw Error("rootMargin must be specified in pixels or percent");return { value: parseFloat(a[1]), unit: a[2] };
                            });a[1] = a[1] || a[0];a[2] = a[2] || a[0];a[3] = a[3] || a[1];return a;
                        };d.prototype._monitorIntersections = function () {
                            this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (n(h, "resize", this._checkForIntersections, !0), n(f, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in h && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(f, { attributes: !0, childList: !0, characterData: !0, subtree: !0 }))));
                        };d.prototype._unmonitorIntersections = function () {
                            this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, r(h, "resize", this._checkForIntersections, !0), r(f, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null));
                        };d.prototype._checkForIntersections = function () {
                            var a = this._rootIsInDom(),
                                b = a ? this._getRootRect() : l();this._observationTargets.forEach(function (c) {
                                var e = c.element,
                                    d = p(e),
                                    g = this._rootContainsTarget(e),
                                    f = c.entry,
                                    k = a && g && this._computeTargetAndRootIntersection(e, b);c = c.entry = new m({ time: h.performance && performance.now && performance.now(), target: e, boundingClientRect: d, rootBounds: b, intersectionRect: k });f ? a && g ? this._hasCrossedThreshold(f, c) && this._queuedEntries.push(c) : f && f.isIntersecting && this._queuedEntries.push(c) : this._queuedEntries.push(c);
                            }, this);this._queuedEntries.length && this._callback(this.takeRecords(), this);
                        };d.prototype._computeTargetAndRootIntersection = function (a, b) {
                            if ("none" != h.getComputedStyle(a).display) {
                                for (var c = p(a), e = q(a), d = !1; !d;) {
                                    var g = null,
                                        k = 1 == e.nodeType ? h.getComputedStyle(e) : {};if ("none" == k.display) return;e == this.root || e == f ? (d = !0, g = b) : e != f.body && e != f.documentElement && "visible" != k.overflow && (g = p(e));if (g) {
                                        k = Math.max(g.top, c.top);var l = Math.min(g.bottom, c.bottom),
                                            m = Math.max(g.left, c.left);c = Math.min(g.right, c.right);g = c - m;var n = l - k;c = 0 <= g && 0 <= n && { top: k, bottom: l, left: m, right: c, width: g, height: n };if (!c) break;
                                    }e = q(e);
                                }return c;
                            }
                        };d.prototype._getRootRect = function () {
                            if (this.root) var a = p(this.root);else {
                                a = f.documentElement;var b = f.body;a = { top: 0, left: 0, right: a.clientWidth || b.clientWidth, width: a.clientWidth || b.clientWidth, bottom: a.clientHeight || b.clientHeight, height: a.clientHeight || b.clientHeight };
                            }return this._expandRectByRootMargin(a);
                        };d.prototype._expandRectByRootMargin = function (a) {
                            var b = this._rootMarginValues.map(function (b, d) {
                                return "px" == b.unit ? b.value : b.value * (d % 2 ? a.width : a.height) / 100;
                            });b = { top: a.top - b[0], right: a.right + b[1], bottom: a.bottom + b[2], left: a.left - b[3] };b.width = b.right - b.left;b.height = b.bottom - b.top;return b;
                        };d.prototype._hasCrossedThreshold = function (a, b) {
                            var c = a && a.isIntersecting ? a.intersectionRatio || 0 : -1,
                                d = b.isIntersecting ? b.intersectionRatio || 0 : -1;if (c !== d) for (var f = 0; f < this.thresholds.length; f++) {
                                var g = this.thresholds[f];if (g == c || g == d || g < c !== g < d) return !0;
                            }
                        };d.prototype._rootIsInDom = function () {
                            return !this.root || t(f, this.root);
                        };d.prototype._rootContainsTarget = function (a) {
                            return t(this.root || f, a);
                        };d.prototype._registerInstance = function () {
                            0 > k.indexOf(this) && k.push(this);
                        };d.prototype._unregisterInstance = function () {
                            var a = k.indexOf(this);-1 != a && k.splice(a, 1);
                        };h.IntersectionObserver = d;h.IntersectionObserverEntry = m;
                    }
                })(window, document);
            };

            // Mini polyfill for Array.from without optional arguments (mapFunction [second argument], thisArg [third argument]) (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
            if (typeof Array.from !== "function") {
                Array.from = function (arrLikeObj) {
                    return Array.prototype.slice.call(arrLikeObj, 0);
                };
            };
        };
    }())

    /***************************************
     * 2020.12.09 お気に入りモーダル
     ***************************************/

    var favModalMain  = '.js-favorite-modal';
    var favModalClose = '.js-favorite-modal__close';

    var $favModalMain  = $(favModalMain);
    var $favModalClose = $(favModalClose);

    function openFavoriteModal() {
        $('html').addClass('favorite-modal-opened');
        $favModalMain.fadeIn();
    }

    $favModalClose.on('click', function() {
        $('html').removeClass('favorite-modal-opened');
        $favModalMain.fadeOut();
    });
}()));
