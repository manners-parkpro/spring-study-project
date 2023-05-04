$(function(){
	header_pos();
	$(window).resize(function () {
		header_pos();
		stickyfn();
	});
	img_slider();
	stickyfn();
	mNav();
	familySite();
	quickMenu();
	estResult();
	txtCount();
	tabChk();
	txtLimit();
	selectedColor();
	detailEstimate(); // 상세견적 클릭 이벤트

	var skr;

	AOS.init({
	   once: true
	});

	// chekcbox
	$("#checkall").each(function (index) {
	   var group = $(this).attr("data-group");
	   var parent = $(this);

	   parent.change(function () {
		   $(group).prop('checked', parent.prop("checked"));
	   });
	   $(group).change(function () {
		   parent.prop('checked', false);
		   if ($(group + ':checked').length == $(group).length) {
			   parent.prop('checked', true);
		   }
	   });
	});
});

function header_pos() {

	var winW = $(window).width();
	var pdspace;

	if (winW > 1280) {
		pdspace = 40;

	} else {
		pdspace = 20;
	}

	$('.header_pc .gnb > li:not(:nth-of-type(n+5))').mouseenter(function () {
		var this_pos = $(this).offset().left;

		$(this).children().children().css({
			left: this_pos + pdspace
		});
	});

	$('.header_pc .gnb > li:nth-of-type(n+5)').mouseenter(function () {
		var this_pos = $(this).offset().left;
		var this_width = $(this).width();
		var rightPos = winW - this_pos - this_width - pdspace;

		if ($('.wrapper').hasClass('main')) {
			$(this).children().children().css({
				left: 'auto',
				right: rightPos + 17
			});
		}else{
			$(this).children().children().css({
				left: 'auto',
				right: rightPos
			});
		}
	});
}

function isMob() {
	return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

function isMacOs() {
	return navigator.platform.indexOf('Mac') > -1;
}

function isChrome() {
	return /Chrome/.test(navigator.userAgent);
}

function isFirefox() {
	return /Firefox/.test(navigator.userAgent);
}

function isIE11() {
	// console.log(navigator.userAgent.match(/Trident\/7\./));
	// return navigator.userAgent.match(/Trident\/7\./);
	return /Trident\/7\./.test(navigator.userAgent);
}

function smoothScroll() {
	if (isMob() || isMacOs() || isFirefox() || isIE11()) return;

	var $window = $(window);
	if (smoothScrollPassive()) {
		window.addEventListener("wheel", smoothScrolling, {
			passive: false
		});
	} else {
		$window.on("mousewheel DOMMouseScroll", smoothScrolling);
	}
}

function smoothScrollPassive() {
	var supportsPassive = false;
	try {
		document.addEventListener("test", null, {
			get passive() {
				supportsPassive = true
			}
		});
	} catch (e) {}
	return supportsPassive;
}

function smoothScrolling(event) {
	event.preventDefault();
	var $window = $(window);
	var scrollTime = 1;
	var scrollDistance = $window.height() / 2.5;
	var delta = 0;

	if (smoothScrollPassive()) {
		delta = event.wheelDelta / 120 || -event.originalEvent.detail / 3;
	} else {
		if (typeof event.originalEvent.deltaY != "undefined") {
			delta = -event.originalEvent.deltaY / 120;
		} else {
			delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
		}
	}

	var scrollTop = $window.scrollTop();
	var finalScroll = scrollTop - parseInt(delta * scrollDistance);

	TweenMax.to($window, scrollTime, {
		scrollTo: {
			y: finalScroll,
			autoKill: true
		},
		ease: Power3.easeOut,
		overwrite: 5
	});
}

function motionArgs(args) {
	if ($('html').hasClass('ie')) {
		args.rotation = 0.1;
	}
	return args
}

function cssAnimate() {
	//if (isMob()) return;
	$('.img_clip').each(function() {
		var $this = $(this);

		$this.waypoint(function() {
			$this.addClass('ani');
			this.destroy();
		}, {
			offset: $this.attr("data-offset")
		});
	});

}

function classAnimate() {
	if (isMob()) return;
	$('.ani_tit').each(function() {
		var $this = $(this);
		var tl = new TimelineLite({
			paused: true
		});
		TweenMax.set($this, {
			autoAlpha: 0,
			y: 50
		});
		tl.to($this, 1.4, motionArgs({
			autoAlpha: 1,
			y: 0,
			ease: Back.easeOut
		}));

		$this.waypoint(function() {
			tl.play();
			this.destroy();
		}, {
			offset: "90%"
		});

	});

	$('.ani_sub_tit').each(function() {
		var $this = $(this);
		var tl = new TimelineLite({
			paused: true
		});
		TweenMax.set($this, {
			autoAlpha: 0,
			y: 50
		});
		tl.to($this, 1.2, motionArgs({
			autoAlpha: 1,
			y: 0,
			ease: Back.easeOut
		}));

		$this.waypoint(function() {
			tl.play();
			this.destroy();
		}, {
			offset: "90%"
		});

	});

	$('.ani_txt').each(function() {
		var $this = $(this);
		var tl = new TimelineLite({
			paused: true
		});

		if ($(window).width() > 960) {
			var txt_original = $this.html();
			var txt_split = new SplitText($this, {
				type: "lines"
			});
			var lines = txt_split.lines;

			TweenMax.set(lines, {
				autoAlpha: 0,
				y: 30
			});
			tl.staggerTo(lines, 2.2, motionArgs({
				autoAlpha: 1,
				y: 0,
				ease: Back.easeOut,
				onComplete: function() {
					$this.html(txt_original);
				}
			}), 0.1, "+=0");

		} else {
			TweenMax.set($this, {
				autoAlpha: 0,
				y: 30
			});
			tl.to($this, 2.2, motionArgs({
				autoAlpha: 1,
				y: 0,
				ease: Back.easeOut
			}));
		}

		$this.waypoint(function() {
			tl.play();
			this.destroy();
		}, {
			offset: "90%"
		});

	});

	$('.ani_img').each(function() {
		var $this = $(this);
		var offSet = $this.attr('data-offset');
		var tl = new TimelineLite({
			paused: true
		});

		if (offSet == undefined) {
			offSet = '100%';
		}
		if ($this.hasClass('ani_img_none')) {
			tl.from($this, 1.6, {
				y: '50%',
				force3D: true,
				ease: Power3.easeOut
			});
		} else {
			TweenMax.set($this, {
				css: {
					transformPerspective: 400,
					transformStyle: "preserve-3d"
				}
			});
			tl.from($this, 1.6, {
				y: '40%',
				z: 40,
				rotationX: 4,
				force3D: true,
				ease: Power3.easeOut
			});
		}

		tl.from($this, 0.5, {
			autoAlpha: 0,
			ease: Power3.easeOut
		}, "-=1.6");

		$this.waypoint(function() {
			tl.play();
			this.destroy();
		}, {
			offset: offSet
		});

	});

}

function launchSkr() {

	if (!isMob()) {
		skrollrInit();

		$(window).on('load', function() {
			if (skr != null) {
				skr.refresh();
			}
		})
	}

}

function skrollrInit() {

	if ($(window).width() <= 960) {
		if (skr != null) {
			skr.destroy();
		}
	} else {
		skr = skrollr.init({
			smoothScrolling: false,
			forceHeight: false
		});
	}

}

function gnbEffect() {
	$(".header_pc .gnb > li").on("mouseover", function() {
		$(".header_pc").addClass("on");
	}).on("mouseout", function() {
		$(".header_pc").removeClass("on");
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 20) {
			$(".header_pc").addClass("scroll");
		} else {
			$(".header_pc").removeClass("scroll");
		}
	});
}

function mNav() {
	var winH = $(window).height();
	var $btnNav = $(".btn_nav"),
		$navM = $(".nav_m"),
		$navBg = $(".nav_m_bg"),
		$depth1 = $(".nav_m .gnb > li .category"),
		$subMenu = $(".nav_m .gnb > li > ul");

	$btnNav.click(function() {
		$navM.animate({
			"right": "0"
		}, 600, 'easeOutQuart');
		$navBg.show();
		$("html").css({
			"height": winH,
			"overflow": "hidden"
		});
		//$("html,body").addClass("non_scrl");
	});
	$(".nav_m_bg,.btn_close").click(function() {
		$navM.animate({
			"right": "-100%"
		}, 300, 'easeOutQuart');
		$navBg.delay(100).hide();
		//$("html,body").removeClass("non_scrl");
		$("html").css({
			"height": "auto",
			"overflow": "visible"
		});
	});
	$depth1.on("click", function() {
		$depth1.removeClass("on");
		if ($(this).next().is(":visible")) {
			$subMenu.slideUp(600, 'easeOutExpo');
		} else {
			$subMenu.slideUp();
			$(this).addClass("on");
			$(this).next().slideDown(300, 'easeOutExpo');
		}
	});
}

function familySite(){
	$(".family_site").click(function(){
		$(this).toggleClass("on");
		$(".family_site .lst").slideToggle( 'slow' , 'easeOutExpo');
	});
}

function quickMenu(){
	$(".quick_menu .tit").click(function(){
		$(this).parent(".quick_menu").toggleClass("on");
	});
}

function estResult(){
	$(window).scroll(function(){
		var scrollDistance = $(window).scrollTop() + $(window).height(),
			footerDistance = $('.footer').offset().top;

		if ($('.bathroom .sq_btm:visible').length > 0) {
			// 상품 선택내역 열릴 경우 height 문제로 인한 변경
			footerDistance = $('.sq_btm').offset().top + $('.tile_section').height();
			footerDistance = $('.toggle_top').hasClass('on') ? footerDistance-100 : footerDistance;
		}

		if(scrollDistance >= footerDistance) {
			$(".sq_result,.result_area").removeClass("fixed");
		} else {
			$(".sq_result,.result_area").addClass("fixed");
		}
	});

}

function txtCount(){
	$('.txtform_count .txtform').keyup(function (e){
		var total = $(this).val();
		var totalNum = $('.txtform_count .txtform').attr('maxlength');
		$('.txtform_count .count').html('(' + '<em>' + total.length + '</em>' + ' / ' + totalNum + ')');
	});
	$('.txtform_count .txtform').keyup();
}

function tabChk(){
	var $tabChkLst = $(".tab_chk .lst");
	$('.tab_chk .lst').on('click', function(e){
		e.preventDefault();
		var $this = $(this);

		// this all | single .on true | false
		if (!$this.hasClass('on')) {
			if ($this.hasClass('all')) {
				$('.tab_chk .lst').removeClass('on');
				$('.tab_chk .lst').find(':checkbox').prop('checked', false);
			} else {
				$('.tab_chk .all').removeClass('on');
				$('.tab_chk .all').find(':checkbox').prop('checked', false);
			}
			$this.addClass('on');
			$this.find(':checkbox').prop('checked', true);
		} else {
			$this.removeClass('on');
			$this.find(':checkbox').prop('checked', false);
		}

		var lstIndex = $('.tab_chk .each').length,
			chkedIndex = $('.tab_chk .on').length;
		if(lstIndex == chkedIndex){
			$('.tab_chk .each').removeClass('on');
			$('.tab_chk .each').find(':checkbox').prop('checked', false);
			$('.tab_chk .all').addClass('on');
			$('.tab_chk .all').find(':checkbox').prop('checked', true);
		}
	});
}

function txtLimit() {
	$('.txt_limit .limit_area').on('click', function () {
		$('.txt_limit').toggleClass('on');
	});
}

function stickyfn() {

	var winW = $(window).width();

	if ($('.lside_section').length > 0) {
		txt_more();
		side_fixed();
		$(window).scroll(function () {
			// PC
			if (960 < winW) {
				$('.lside_section .partner_view .tab_wrap').removeClass('tab_fixed');
				side_fixed();
			} else {
				// MOBILE
				tab_fixed();
			}
		});
	}
}

function side_fixed() {

	var winWidth = $(window).width();
	var winTop = $(window).scrollTop() + 100;
	var sectionTop = $('.lside_section').offset().top;
	var sectionBottom = sectionTop + $('.lside_section').height();
	var fixedDiv = $('.profile_info');
	var fixedWidth;
	var wrapper = $('.divide_wrap');
	var fixedBottom = $(window).scrollTop() + fixedDiv.height() + 120;
	var rightPos = ($(window).width() - wrapper.width()) / 2;
	var sticky;

	if (1265 < winWidth) { //PC
		fixedWidth = (wrapper.width() * 0.33) - 53;
	} else if (961 < winWidth && winWidth < 1266) { //tablet
		fixedWidth = (wrapper.width() * 0.33) - 30;
	}

	if (fixedDiv.height() < wrapper.height()) {
		if (960 < winWidth) {
			sticky = 1;
		} else {
			sticky = 0;
		}
	}

	if (sticky == 1) {
		// 기존회원
		if (!$('.wrapper').hasClass('partner_wrapper')) {
			if (sectionTop < winTop+20) {
				if (sectionBottom < fixedBottom) {
					fixedDiv.css({
						position: 'absolute',
						width: fixedWidth,
						top: 'auto',
						bottom: 0,
						right: 0
					});
				} else {
					fixedDiv.css({
						position: 'fixed',
						width: fixedWidth,
						top: 120,
						right: rightPos,
						bottom: 'auto'
					});
				}
			}
			else if (winTop < sectionTop) {
				fixedDiv.css({
					position: 'relative',
					top: 0,
					right: 0
				});
			}
		} else {
			// 파트너
			if (sectionTop + 80 < winTop) {
				if (sectionBottom < fixedBottom - 100) {
					fixedDiv.css({
						position: 'absolute',
						width: fixedWidth,
						top: 'auto',
						bottom: 0,
						right: 0
					});
				} else {
					fixedDiv.css({
						position: 'fixed',
						width: fixedWidth,
						top: 20,
						right: rightPos,
						bottom: 'auto'
					});
				}
			}
			else if (winTop < sectionTop + 80) {
				fixedDiv.css({
					position: 'relative',
					top: 0,
					right: 0
				});
			}
		}
	} else {
		fixedDiv.css({
			position: 'relative',
			width: '100%',
			top: 0,
			right: 0
		});
	}
}

function txt_more() {
	var txtDesc = $('.infoImg_box .txtwrap .desc');
	var descH = txtDesc.height();
	var txtBtn = $('.txtwrap .txt_more');

	if ($(window).width() < 961) {
		$('.txtwrap').insertAfter('.img_box');
		if (72 <= descH) {
			txtDesc.removeClass('on');
			txtBtn.show();
			txtBtn.click(function () {
				txtDesc.addClass('on');
				txtBtn.hide();
			});
		} else {
			txtBtn.hide();
		}
	} else {
		txtBtn.hide();
		$('.img_box').insertAfter('.txtwrap');
	}
}

function tab_fixed() {
	var winTop = $(window).scrollTop() + 135;
	var sectionTop = $('.lside_section').offset().top;
	var tab = $('.lside_section .partner_view .tab_wrap');

	if (sectionTop < winTop) {
		tab.addClass('tab_fixed');
	} else if (winTop < sectionTop) {
		tab.removeClass('tab_fixed');
	}
}

function img_slider() {
	$('.img_box .img_lst').slick({
		mobileFirst: true,
		autoPlay: false,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 961,
				settings: "unslick"
			}
		]
	});
	$(window).resize(function () {
		if ($(window).width() < 961) {
			$('.img_box .img_lst').slick('resize');
		}
	});
}

function selectedColor(){
	$('select').change(function () {
		if ($(this).children('option:selected')){
			$(this).css('color', '#333');
			$(this).siblings('i').css('color', '#333');
		}else{
			$(this).css('color', '#aaa');
			$(this).siblings('i').css('color', '#aaa');
		}
	});
}

function detailEstimate(){ // 상세견적 클릭 이벤트
	$('.estimate_step .lst').on('click', function(){
		$(this).closest('.estimate_step').find('.lst').removeClass('on');
		$(this).addClass('on');
	});
}
