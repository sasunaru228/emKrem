function t121_setHeight(recid) {
    var rec = $('#rec' + recid);
    var div = $("#youtubeiframe" + recid);
    var height = div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);
    var videoLazy = rec.find('.t-video-lazyload');
    var iframeLazy = videoLazy.find('iframe');
    if (videoLazy != undefined) {
        var heightLazy = videoLazy.width() * 0.5625;
        videoLazy.height(heightLazy);
        iframeLazy.height(heightLazy)
    }
}

function t268_init(recid) {
    var el = $("#rec" + recid);
    el.find(".t268__col-left").css({
        'height': (el.find(".t268__col-right").height() + 'px')
    });
    $(window).resize(function() {
        el.find(".t268__col-left").css({
            'height': (el.find(".t268__col-right").height() + 'px')
        })
    })
}

function t410_init(recid) {
    var el = $('#rec' + recid);
    var firstimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-first");
    var firstimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-first");
    var firstimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-first");
    var secondimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-second");
    var secondimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-second");
    var secondimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-second");
    new juxtapose.JXSlider('#t410-juxtapose__' + recid + '', [{
        src: firstimgurl,
        label: firstimgdescr
    }, {
        src: secondimgurl,
        label: secondimgdescr
    }], {
        animate: !1,
        showLabels: !0,
        showCredits: !1,
        startingPosition: '50%',
        makeResponsive: !0,
        callback: function() {
            if (firstimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-left img').attr('alt', firstimgalt)
            }
            if (secondimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-right img').attr('alt', secondimgalt)
            }
            if (window.$isMobile) {
                el.find('.t410__wrapper').append('<div class="t410__mobile_left"></div><div class="t410__mobile_right"></div>');
                var hanlerWidth = el.find('.jx-handle').width(),
                    leftSide = el.find('.jx-image.jx-left'),
                    rightSide = el.find('.jx-image.jx-right'),
                    leftWidth = leftSide.width() - hanlerWidth / 2,
                    rightWidth = rightSide.width() - hanlerWidth / 2,
                    wrapper = el.find('.t410__wrapper'),
                    mobileLeft = el.find('.t410__mobile_left'),
                    mobileRight = el.find('.t410__mobile_right');
                mobileLeft.css('width', leftWidth);
                mobileRight.css('width', rightWidth);
                wrapper.on('touchend', function() {
                    leftWidth = leftSide.width() - hanlerWidth / 2;
                    rightWidth = rightSide.width() - hanlerWidth / 2;
                    mobileLeft.css('width', leftWidth);
                    mobileRight.css('width', rightWidth)
                })
            }
        }
    })
}

function t451_showMenu(recid) {
    var el = $('#rec' + recid);
    $('body').addClass('t451__body_menushowed');
    el.find('.t451m').addClass('t451m__menu_show');
    el.find('.t451m__overlay').addClass('t451m__menu_show');
    el.find('.t451m__overlay, .t451m__close, a[href*=#]').click(function() {
        if ($(this).is(".tooltipstered, .t794__tm-link")) {
            return
        }
        t451_closeMenu()
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('body').removeClass('t451__body_menushowed');
            $('.t451m').removeClass('t451m__menu_show');
            $('.t451m__overlay').removeClass('t451m__menu_show')
        }
    })
}

function t451_closeMenu() {
    $('body').removeClass('t451__body_menushowed');
    $('.t451m').removeClass('t451m__menu_show');
    $('.t451m__overlay').removeClass('t451m__menu_show')
}

function t451_checkSize(recid) {
    var el = $('#rec' + recid).find('.t451m');
    var windowheight = $(window).height() - 80;
    var contentheight = el.find(".t451m__top").height() + el.find(".t451m__rightside").height();
    if (contentheight > windowheight) {
        el.addClass('t451m__overflowed');
        el.find(".t451m__container").css('height', 'auto')
    }
}

function t451_initMenu(recid) {
    var el = $('#rec' + recid);
    var obj = el.find('.t451__burger');
    obj.click(function(e) {
        t451_closeMenu();
        t451_showMenu(recid);
        t451_checkSize(recid);
        e.preventDefault()
    });
    $('.t451').bind('clickedAnchorInTooltipMenu', function() {
        t451_closeMenu()
    });
    if (isMobile) {
        $('#rec' + recid).find('.t-menu__link-item').each(function() {
            var $this = $(this);
            if ($this.hasClass('t451__link-item_submenu')) {
                $this.on('click', function() {
                    setTimeout(function() {
                        t451_checkSize(recid)
                    }, 100)
                })
            }
        })
    }
    var navLinks = el.find('.t451 a.t-menusub__link-item:not(.tooltipstered)[href*="#"]');
    if (navLinks.length > 0) {
        t451_catchScroll(navLinks)
    }
}

function t451_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "default.htm"
    }
    $(".t451__list_item a[href='" + url + "']").addClass("t-active");
    $(".t451__list_item a[href='" + url + "default.htm']").addClass("t-active");
    $(".t451__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t451__list_item a[href='./" + pathname + "']").addClass("t-active");
    $(".t451__list_item a[href='" + pathname + "default.htm']").addClass("t-active");
    $(".t451__list_item a[href='./" + pathname + "default.htm']").addClass("t-active")
}

function t451_changeBgOpacityMenu(recid) {
    var window_width = $(window).width();
    var record = $("#rec" + recid);
    record.find(".t451__container__bg").each(function() {
        var el = $(this);
        var bgcolor = el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity = el.attr("data-bgopacity");
        var bgopacity_afterscroll = el.attr("data-bgopacity2");
        var menu_shadow = el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color", bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        } else {
            el.css("background-color", bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        }
    })
}

function t451_appearMenu(recid) {
    var window_width = $(window).width();
    var record = $("#rec" + recid);
    record.find(".t451__panel").each(function() {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        console.log(appearoffset)
        if (appearoffset != "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
            }
            appearoffset = parseInt(appearoffset, 10);
            if ($(window).scrollTop() >= appearoffset) {
                if (el.hasClass('t451__beforeready')) {
                    el.removeClass('t451__beforeready')
                }
            } else {
                el.addClass('t451__beforeready')
            }
        }
    })
}

function t451_catchScroll(navLinks) {
    var clickedSectionId = null;
    var sections = new Array();
    var sectionIdTonavigationLink = [];
    var interval = 100;
    var lastCall;
    var timeoutId;
    navLinks = $(navLinks.get().reverse());
    navLinks.each(function() {
        var cursection = t451_getSectionByHref($(this));
        if (typeof cursection.attr("id") != "undefined") {
            sections.push(cursection)
        }
        sectionIdTonavigationLink[cursection.attr("id")] = $(this)
    });
    $(window).bind('resize', t_throttle(function() {
        t451_updateSectionsOffsets(sections)
    }, 200));
    $('.t451').bind('displayChanged', function() {
        t451_updateSectionsOffsets(sections)
    });
    setInterval(function() {
        t451_updateSectionsOffsets(sections)
    }, 5000);
    setTimeout(function() {
        t451_updateSectionsOffsets(sections);
        t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId)
    }, 1000);
    navLinks.click(function() {
        if (!$(this).hasClass("tooltipstered")) {
            navLinks.removeClass('t-active');
            sectionIdTonavigationLink[t451_getSectionByHref($(this)).attr("id")].addClass('t-active');
            clickedSectionId = t451_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function() {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval)) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                lastCall = now;
                clickedSectionId = t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId)
            }, interval - (now - lastCall))
        } else {
            lastCall = now;
            clickedSectionId = t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId)
        }
    })
}

function t451_updateSectionsOffsets(sections) {
    $(sections).each(function() {
        var curSection = $(this);
        curSection.attr("data-offset-top", curSection.offset().top)
    })
}

function t451_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue.substring(1) + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue.substring(1) + "']")
    }
}

function t451_highlightNavLinks(navLinks, sections, sectionIdTonavigationLink, clickedSectionId) {
    var scrollPosition = $(window).scrollTop();
    var valueToReturn = clickedSectionId;
    if (sections.length != 0 && clickedSectionId == null && sections[sections.length - 1].attr("data-offset-top") > (scrollPosition + 300)) {
        navLinks.removeClass('t-active');
        return null
    }
    $(sections).each(function(e) {
        var curSection = $(this);
        var sectionTop = curSection.attr("data-offset-top");
        var id = curSection.attr('id');
        var navLink = sectionIdTonavigationLink[id];
        if (((scrollPosition + 300) >= sectionTop) || (sections[0].attr("id") == id && scrollPosition >= $(document).height() - $(window).height())) {
            if (clickedSectionId == null && !navLink.hasClass('t-active')) {
                navLinks.removeClass('t-active');
                navLink.addClass('t-active');
                valueToReturn = null
            } else {
                if (clickedSectionId != null && id == clickedSectionId) {
                    valueToReturn = null
                }
            }
            return !1
        }
    });
    return valueToReturn
}

function t477_setHeight(recid) {
    var el = $('#rec' + recid);
    el.find('.t-container').each(function() {
        var highestBox = 0;
        $('.t477__col', this).each(function() {
            if ($(this).height() > highestBox) highestBox = $(this).height()
        });
        $('.t477__textwrapper', this).css('height', highestBox);
        $('.t477__blockimg', this).css('height', highestBox)
    })
}

function t480_setHeight(recid) {
    var el = $('#rec' + recid);
    var sizer = el.find('.t480__sizer');
    var height = sizer.height();
    var width = sizer.width();
    var ratio = width / height;
    var imgwrapper = el.find(".t480__blockimg");
    var imgwidth = imgwrapper.width();
    if (height != $(window).height()) {
        imgwrapper.css({
            'height': ((imgwidth / ratio) + 'px')
        })
    }
}

function t486_setHeight(recid) {
    var el = $('#rec' + recid);
    var window_width = $(window).width();
    if (window_width > 980) {
        el.find('.t486__blockimg').css('height', el.find('.t486__blockimg').innerWidth());
        var textwrapper = el.find('.t486__textwrapper');
        var blockimg = el.find('.t486__imgcontainer');
        textwrapper.css('height', blockimg.innerHeight())
    } else {
        el.find('.t486__blockimg').css('height', el.find('.t486__blockimg').width());
        el.find('.t486__textwrapper').css('height', 'auto')
    }
}

function t552_init(recid, ratio) {
    var t552__el = $("#rec" + recid),
        t552__image = t552__el.find(".t552__blockimg:first");
    t552__setHeight(recid, t552__image, ratio);
    var t552__doResize;
    $(window).resize(function() {
        clearTimeout(t552__doResize);
        t552__doResize = setTimeout(function() {
            t552__setHeight(recid, t552__image, ratio)
        }, 200)
    })
}

function t552__setHeight(recid, image, ratio) {
    $("#rec" + recid + " .t552__blockimg").css("height", Math.round(image.innerWidth() * ratio))
}

function t604_init(recid) {
    t604_imageHeight(recid);
    t604_arrowWidth(recid);
    t604_show(recid);
    t604_hide(recid);
    $(window).bind('resize', t_throttle(function() {
        t604_arrowWidth(recid)
    }, 200))
}

function t604_show(recid) {
    var el = $("#rec" + recid),
        play = el.find('.t604__play');
    play.click(function() {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"../https@www.youtube.com/embed/" + url + "@autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"../https@player.vimeo.com/video/" + url + "@autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t604_hide(recid) {
    var el = $("#rec" + recid),
        body = el.find('.t604__frame');
    el.on('updateSlider', function() {
        body.html('').css('z-index', '')
    })
}

function t604_imageHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t604__separator");
    image.each(function() {
        var width = $(this).attr("data-slider-image-width");
        var height = $(this).attr("data-slider-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t604_arrowWidth(recid) {
    var el = $("#rec" + recid),
        arrow = el.find('.t-slds__arrow_wrapper'),
        slideWidth = el.find('.t-slds__wrapper').width(),
        windowWidth = $(window).width(),
        arrowWidth = windowWidth - slideWidth;
    if (windowWidth > 960) {
        arrow.css('width', arrowWidth / 2)
    } else {
        arrow.css('width', '')
    }
}

function t668_init(recid) {
    var el = $('#rec' + recid),
        toggler = el.find(".t668__header");
    toggler.click(function() {
        $(this).toggleClass("t668__opened");
        $(this).next().slideToggle();
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    })
}

function t698_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function() {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t698_onSuccess(t698_form) {
    var t698_inputsWrapper = t698_form.find('.t-form__inputsbox');
    var t698_inputsHeight = t698_inputsWrapper.height();
    var t698_inputsOffset = t698_inputsWrapper.offset().top;
    var t698_inputsBottom = t698_inputsHeight + t698_inputsOffset;
    var t698_targetOffset = t698_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t698_target = t698_targetOffset - 200
    } else {
        var t698_target = t698_targetOffset - 100
    }
    if (t698_targetOffset > $(window).scrollTop() || ($(document).height() - t698_inputsBottom) < ($(window).height() - 100)) {
        t698_inputsWrapper.addClass('t698__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t698_target
        }, 400);
        setTimeout(function() {
            t698_inputsWrapper.addClass('t698__inputsbox_hidden')
        }, 400)
    }
    var successurl = t698_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
}

function t774_init(recid) {
    t774_unifyHeights(recid);
    $(window).bind('resize', t_throttle(function() {
        t774_unifyHeights(recid)
    }, 200));
    $(".t774").bind("displayChanged", function() {
        t774_unifyHeights(recid)
    });
    $(window).load(function() {
        t774_unifyHeights(recid)
    });
    setTimeout(function() {
        t774__updateLazyLoad(recid)
    }, 500)
}

function t774__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t774__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview" && window.lazy === "y") {
        scrollContainer.bind('scroll', t_throttle(function() {
            t_lazyload_update()
        }, 500))
    }
}

function t774_unifyHeights(recid) {
    var t774_el = $('#rec' + recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
        t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;
    if ($(window).width() <= 480 && t774_mobScroll == 0) {
        t774_cols.css("height", "auto");
        return
    }
    var t774_perRow = +t774_blocksPerRow;
    if ($(window).width() <= 960 && t774_mobScroll > 0) {
        var t774_perRow = t774_cols.length
    } else {
        if ($(window).width() <= 960) {
            var t774_perRow = 2
        }
    }
    for (var i = 0; i < t774_cols.length; i += t774_perRow) {
        var t774_maxHeight = 0,
            t774_row = t774_cols.slice(i, i + t774_perRow);
        t774_row.each(function() {
            var t774_curText = $(this).find(".t774__textwrapper"),
                t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
                t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();
            if (t774_itemHeight > t774_maxHeight) {
                t774_maxHeight = t774_itemHeight
            }
        });
        t774_row.css("height", t774_maxHeight)
    }
}

function t817_init(recid) {
    var rec = $('#rec' + recid);
    var curMode = $('.t-records').attr('data-tilda-mode');
    var tab = rec.find('.t817__tab');
    var select = rec.find('.t817__select');
    var content = rec.find('.t817__content');
    if (curMode != 'edit' && curMode != 'preview') {
        t817_scrollToTabs(recid)
    }
    t817_showTabByUrl(recid, tab, content, select);
    t817_showTab(tab, content, recid);
    t817_showTabMobile(select, content, recid)
}

function t817_showTab(tab, content, recid) {
    var tabNumber;
    var curUrl = window.location.href;
    var curMode = $('.t-records').attr('data-tilda-mode');
    tab.on('click', function(e) {
        tabNumber = $(this).attr('data-tab-number');
        tab.removeClass('t817__tab_active');
        content.removeClass('t817__content_active');
        $(this).addClass('t817__tab_active');
        t817_removeUrl();
        content.each(function(i) {
            if ($(content[i]).attr('data-tab-content-number') == tabNumber) {
                $(content[i]).addClass('t817__content_active')
            }
        });
        if (curMode != 'edit' && curMode != 'preview') {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumber)
            }
        }
        if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    })
}

function t817_showTabMobile(select, content, recid) {
    var tabNumberMobile;
    var curUrl = window.location.href;
    var curMode = $('.t-records').attr('data-tilda-mode');
    select.change(function(e) {
        tabNumberMobile = $(this).val();
        content.removeClass('t817__content_active');
        t817_removeUrl();
        content.each(function(i) {
            if ($(content[i]).attr('data-tab-content-number') == tabNumberMobile) {
                $(content[i]).addClass('t817__content_active')
            }
        });
        if (curMode != 'edit' && curMode != 'preview') {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumberMobile)
            }
        }
        if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    })
}

function t817_showTabByUrl(recid, tab, content, select) {
    var curUrl = window.location.href;
    var tabIndexNumber = curUrl.indexOf(recid + '-');
    var tabIndex = curUrl.substring(tabIndexNumber + recid.length + 1);
    if (tabIndexNumber != -1) {
        tab.each(function(i) {
            if ($(tab[i]).attr('data-tab-number') == tabIndex) {
                $(tab[i]).addClass('t817__tab_active')
            }
        });
        content.each(function(i) {
            if ($(content[i]).attr('data-tab-content-number') == tabIndex) {
                $(content[i]).addClass('t817__content_active')
            }
        });
        select.val(tabIndex)
    } else {
        tab.first().addClass('t817__tab_active');
        content.first().addClass('t817__content_active')
    }
}

function t817_scrollToTabs(recid) {
    var curUrl = window.location.href;
    var tabIndexNumber = curUrl.indexOf('#!/tab/');
    var tabIndexNumberStart = curUrl.indexOf('tab/');
    if (tabIndexNumber != -1) {
        var tabRec = curUrl.substring(tabIndexNumberStart + 4, tabIndexNumberStart + 4 + recid.length)
        if (+tabRec == +recid) {
            var tabBlock = $('#rec' + tabRec).find('.t817');
            var targetOffset = tabBlock.offset().top;
            if ($(window).width() > 960) {
                var target = targetOffset - 200
            } else {
                var target = targetOffset - 100
            }
            $('html, body').animate({
                scrollTop: target
            }, 400)
        }
    }
}

function t817_removeUrl() {
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tab/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tab/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    if (indexToRemove != -1) {
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }
}

function t822_init(recid) {
    t822_setHeight(recid);
    $(window).load(function() {
        t822_setHeight(recid)
    });
    $(window).bind('resize', t_throttle(function() {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t822_setHeight(recid)
    }, 200));
    $('.t822').bind('displayChanged', function() {
        t822_setHeight(recid)
    })
}

function t822_setHeight(recid) {
    $('#rec' + recid + ' .t822 .t-container').each(function() {
        var t822__highestBox = 0;
        $('.t822__col', this).each(function() {
            var t822__curcol = $(this);
            var t822__curcolchild = t822__curcol.find('.t822__col-wrapper');
            if (t822__curcol.height() < t822__curcolchild.height()) t822__curcol.height(t822__curcolchild.height());
            if (t822__curcol.height() > t822__highestBox) t822__highestBox = t822__curcol.height()
        });
        if ($(window).width() >= 960) {
            $('.t822__col', this).css('height', t822__highestBox)
        } else {
            $('.t822__col', this).css('height', "auto")
        }
    })
};

function t843_init(recid) {
    var rec = $('#rec' + recid);
    var container = rec.find('.t843');
    t843_setHeight(rec);
    $(window).bind('resize', t_throttle(function() {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t843_setHeight(rec)
    }, 200));
    $('.t843').bind('displayChanged', function() {
        t843_setHeight(rec)
    });
    if (container.hasClass('t843__previewmode')) {
        setInterval(function() {
            t843_setHeight(rec)
        }, 5000)
    }
}

function t843_setHeight(rec) {
    var image = rec.find('.t843__blockimg');
    image.each(function() {
        var width = $(this).attr('data-image-width');
        var height = $(this).attr('data-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%')
    });
    if ($(window).width() > 960) {
        var textwr = rec.find('.t843__textwrapper');
        var deskimg = rec.find('.t843__desktopimg');
        textwr.each(function(i) {
            $(this).css('height', $(deskimg[i]).innerHeight())
        })
    }
}

function t850_init(recid) {
    var rec = $('#rec' + recid);
    var container = rec.find('.t850');
    var doResize;
    t850_unifyHeights(rec);
    $(window).resize(function() {
        clearTimeout(doResize);
        doResize = setTimeout(function() {
            t850_unifyHeights(rec)
        }, 200)
    });
    $(window).load(function() {
        t850_unifyHeights(rec)
    });
    $('.t850').bind('displayChanged', function() {
        t850_unifyHeights(rec)
    });
    if (container.hasClass('t850__previewmode')) {
        setInterval(function() {
            t850_unifyHeights(rec)
        }, 5000)
    }
}

function t850_unifyHeights(rec) {
    if ($(window).width() >= 960) {
        rec.find('.t850 .t-container .t850__row').each(function() {
            var highestBox = 0;
            var currow = $(this);
            $('.t850__inner-col', this).each(function() {
                var curCol = $(this);
                var curText = curCol.find('.t850__wrap');
                var curColHeight = curText.outerHeight();
                if (curColHeight > highestBox) {
                    highestBox = curColHeight
                }
            });
            $('.t850__inner-col', this).css('height', highestBox)
        })
    } else {
        $('.t850__inner-col').css('height', 'auto')
    }
}