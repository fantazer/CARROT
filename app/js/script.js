$(document).ready(function () {

	// nice select
	//$('.select-beauty').niceSelect();
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

	$('.modal-close, .modal-hide').click(function () {
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


	//window.condition = {};
	//window.condition.info = info;
});
