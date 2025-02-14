$(document).ready(function () {

	// nice select
	$('.select-beauty').niceSelect();
	// nice select === end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth = window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight: scrollWidth
			});

		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight: 0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function () {
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		}, 600);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-close, .hide-modal').click(function () {
		closeModal();
	});
	//modals===end

	// fix top-menu
	var shrinkHeader = 250;
	var head = $('.header');
	var heightHeader = head.height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			$('body').css('paddingTop', heightHeader);
			head.addClass('shrink');
		} else {
			$('body').css('paddingTop', 0);
			head.removeClass('shrink');
		}
	});

	$(window).resize(function () {
		heightHeader = head.height();
	});
	// fix top-menu === end

	// main-slider
	$('.main-slider').slick({
		slidesToShow: 1,
		speed: 500,
		autoplay: false,
		arrows: false,
		dots: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging: function (slider, i) {
			return '<span class="dot"></span>';
		}
	});
	// main-slider === end

	// basket slider
	$('.basket-add').slick({
		speed: 500,
		autoplay: false,
		arrows:true,
		dots:false,
		slidesToShow: 1.6,
		infinite: false,
		rows:0,
		prevArrow:'<svg class="slick-prev slick-arrow"><use xlink:href="#arrow-left"></use></svg>',
		nextArrow:'<svg class="slick-next slick-arrow"><use xlink:href="#arrow-right"></use></svg>',
	});
	// basket slider === end

	// gallery
		$('.gallery-slider').slick({
			slidesToShow: 1,
			speed: 500,
			dots:false,
			arrows:false,
			asNavFor: '.gallery-slider-nav',

		});
	// gallery === end

		// gallery nav
		$('.gallery-slider-nav').slick({
			slidesToShow: 5,
			speed: 500,
			dots:false,
			arrows:false,

			asNavFor: '.gallery-slider',
			//centerMode: true,
			focusOnSelect: true,

		});
		// gallery nav === end
	// SLIDERS === end

	// increment field
	$('.incr__minus').click(function (e) {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) - 1;
		if (!$(this).hasClass("incr--one")) { // add class incr--one for 1 always
			if (count < 1) {
				count = 0;
			}
		} else {
			if (count < 1) {
				$(this).closest('.add-ingr__el').removeClass('add-ingr__el--active');
				//ingr toggle === end
				$(this).closest('.product-footer').find('.product-add').show();
				$(this).closest('.product-footer').toggleClass('product-footer-numb');
				$(this).closest('.product-footer').find('.incr__val span').html(1);
				count = 1;
			}
		}
		$input.html(count);
		e.stopPropagation();
	});
	$('.incr__plus').click(function () {
		var $input = $(this).parent().find('.incr__val span');
		var count = parseInt($input.html()) + 1;
		count = count > 100 ? 100 : count;
		$input.html(count);
	})
	// increment field === end

	// ==== PRODUCT ====
	$('.product-get').click(function () {
		$(this).closest('.product-footer').find('.product-get').hide();
		$(this).closest('.product-footer').find('.product-add').show();
	});

	//toggle button
	$('.product-add').click(function () {
		$(this).closest('.product-footer').find('.product-add').hide();
		$(this).closest('.product-footer').toggleClass('product-footer-numb');
	})

	var currentIncr;

	$('.product-incr .incr__nav').click(function () {
		currentIncr = $(this).closest('.incr').find('.incr__val span').html() * 1;
		console.log();
		if (currentIncr == 0) {
			$(this).closest('.product-footer').find('.product-add').show();
			$(this).closest('.product-footer').toggleClass('product-footer-numb');
			$(this).closest('.incr').find('.incr__val span').html(1)
		}

	});
	//check val < 0 end
	// ==== PRODUCT ==== === end



	// switch
	$('.js-switch').click(function () {
		var typeItem = $(this).data("item");
		var groupItem = $(this).data("group");
		var size = 0;
		$('.js-switch').each(function () {
			if ($(this).data("item") === typeItem) {
				$(this).removeClass("active");
				 size = $(this).size();
			}
			return size;
		});
		$('.js-switch-cont').each(function () {
			if ($(this).data("group") === groupItem) {
				if ($(this).data("item") === typeItem) {
					if(size===1){
						$(this).toggleClass("hidden")
					}else{
						$(this).removeClass("hidden")
					}
				} else {
					$(this).addClass("hidden");
				}
			}
		});
		$(this).addClass("active");
	});
	// switch === end



	// slide menu
	$('.js-slide-block-toggle').click(function (event) {
		$(".js-slide-block-toggle").not(this).removeClass('slide-block-toggle--open');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("slide-block--open")
			} else {
				$(this).removeClass("slide-block--open")
			}
		})
		$(this).toggleClass('slide-block-toggle--open');
		event.stopPropagation();
	});

	$('.slide-block').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
		$('.slide-block').removeClass('slide-block--open');
		$(".js-slide-block-toggle").removeClass('slide-block-toggle--open');
	});

	// mobile scroll to id
	$('.slide-nav__el').click(function(){
		$(".slide-block").removeClass("slide-block--open")
		$('.js-slide-block-toggle').toggleClass('slide-block-toggle--open');
	});
	// mobile scroll to id === end
	// slide menu === end


	// template scroll
	if ($(window).width() > 769) {
		$(".scroll").niceScroll({
			autohidemode: false,
			cursorcolor: "#dcdcdc",
			scrollspeed: 160, // scrolling speed
			mousescrollstep: 10,
		});
	}
	// template scroll === end

	// scroll to id
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
		offset:100,
		highlightClass:"header-nav__el--active",
	});

	// scroll to id === end

	//tab delivery
	$('.order-form__tab-el').click(function(){
		var currentTab = $(this).data('tab');
		if(currentTab=='self'){
			$('.order-form__border-el').addClass('order-form__border-el--right')
		} else {
			$('.order-form__border-el').removeClass('order-form__border-el--right')
		}
		$('.order-form__tab-el').removeClass('order-form__tab-el--active');
		$(this).addClass('order-form__tab-el--active');

		$('.order-form__tab-container').each(function(){
			if($(this).data('tab')==currentTab){
				$(this).addClass('order-form__tab-container-active')
			}else{
				$(this).removeClass('order-form__tab-container-active')
			}
		})
	});
	//tab delivery end

	// toggle lk-history
	$('.history__el-head').click(function(){
		$(this).toggleClass("history__el-head--active");
		$(this).closest(".history__el").find(".history__el-cont").slideToggle();
	});
	// toggle lk-history === end

	// rating
	$('.star .star-el').click(function () {
		if (!$(this).parent().hasClass('star--fix')) {
			$(this).closest(".star").find('.star-el').removeClass('star-el--active');
			$(this).addClass('star-el--active');
			$(this).prevAll('.star-el').addClass('star-el--active')
		}
	});
	// rating === end

	// STICK
	var isMobile = function () {
		if ($(window).width() > 1025) {
			$(".msg").stick_in_parent({
				'offset_top': 100
			});
		}

		if ($(window).width() < 769) {
			$(".msg").trigger("sticky_kit:detach");
		}
	};
	$(window).resize(function () {
		isMobile();
		/*if($(window).width() > 769){
			initSlider();
		}*/
	});
	isMobile();
	// STICK === end

	//window.condition = {};
	//window.condition.info = info;
});
