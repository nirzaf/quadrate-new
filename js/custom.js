(function($) {
    "use strict";
    var win = $(window);

    win.on("load", function() {

        /********************
         *  Preloader  *
         ********************/
        var $element = $("#loader");
        $element.fadeOut(1000);

        /******************************
         *  Language Select dropdown  *
         ******************************/
        function formatState(state) {
            var $state = $('<span><img src="images/' + $.trim(state.text.toLowerCase()) + '.png" class="img-flag" /> ' + state.text + '</span>');
            return $state;
        };

        /****************************
         *  Custom Select dropdown  *
         ****************************/
        var $element = $('.currency_select');
        if ($element.length > 0) {
            $element.select2({
                templateResult: formatState,
                templateSelection: formatState,
                minimumResultsForSearch: Infinity
            });
        }
        var $elements = $(".custom_select");
        if ($element.length > 0) {
            $elements.select2({
                minimumResultsForSearch: Infinity
            });
        }

        /*******************************************
         *   Add/remove class on scroll to Header  *
         *******************************************/
        win.on('scroll',function() {
            var scroll = win.scrollTop();
            if (scroll >= 100) {
                $("header.opt5").addClass("fixed");
            } else {
                $("header.opt5").removeClass("fixed");
            }
        });

        /*************************************
         *  Dropdown Menu on hover  *
         *************************************/
        function dropdown() {
            var $viewportWidth = win
                .width();
            var $element = $('ul.navbar-nav li.dropdown');
            if ($viewportWidth > 767) {
                $element.on('mouseenter',function() {
                    $(this)
                        .find('.dropdown-menu')
                        .stop(true, true)
                        .delay(200)
                        .slideDown(300);
                });
                $element.on('mouseleave',function() {
                    $(this)
                        .find('.dropdown-menu')
                        .stop(true, true)
                        .delay(200)
                        .slideUp(300);
                });
            }
        }
        win.on('resize', dropdown);
        dropdown();

        /*************************************
         *  Side Panel Menu  *
         *************************************/
        var menuwidth = 240; // pixel value for sliding menu width
        var menuspeed = 400; // milliseconds for sliding menu animation time
        var $bdy = $('body');
        var $container = $('body');
        var $burger = $('.side-panel-menu');
        var negwidth = "-" + menuwidth + "px";
        var poswidth = menuwidth + "px";
        var overlay = $('.overlay');
        $('.mob-icon').on('click', function(e) {
            if ($bdy.hasClass('openmenu')) {
                jsAnimateMenu('close');
            } else {
                jsAnimateMenu('open');
            }
        });
        overlay.on('click', function(e) {
            if ($bdy.hasClass('openmenu')) {
                jsAnimateMenu('close');
            }
        });
        $('a[href$="#"]').on('click', function(e) {
            e.preventDefault();
        });

        function jsAnimateMenu(tog) {
            if (tog == 'open') {
                $bdy.addClass('openmenu');

                $container.animate({
                    marginLeft: negwidth,
                    marginRight: poswidth
                }, menuspeed);
                $burger.animate({
                    width: poswidth
                }, menuspeed);
                overlay.animate({
                    left: poswidth
                }, menuspeed);
            }
            if (tog == 'close') {
                $bdy.removeClass('openmenu');
                $container.animate({
                    marginRight: "0",
                    marginLeft: "0"
                }, menuspeed);
                $burger.animate({
                    width: "0"
                }, menuspeed);
                overlay.animate({
                    left: "0"
                }, menuspeed);
            }
        }

        /*****************************
         *  Responsive Equal Height  *
         *****************************/
        var $element = $('.equal-hight');
        if ($element.length > 0) {
            var $viewportWidth = win
                .width();
            if ($viewportWidth > 767) {
                $element.matchHeight();
            }
            win.on('resize', function() {
                if ($viewportWidth > 767) {
                    $element.matchHeight();
                }
            });
        }

        /*********************
         *  Banner Carousel  *
         *********************/
        var $element = $('.banner-slider');
        if ($element.length > 0) {
            $element.bxSlider({
                controls: false,
                auto: true,
                mode: 'fade',
                speed: 1500,
            });
        }
        
        /********************************
         * Animated Background Gradient *
         ********************************/
        var colors = new Array(
            [62, 220, 148], 
            [97, 177, 35], 
            [87, 188, 225], 
            [48, 89, 91], 
            [63, 207, 221], 
            [242, 154, 50]);

        var step = 0;
        //color table indices for: 
        // current color left
        // next color left
        // current color right
        // next color right
        var colorIndices = [0, 1, 2, 3];

        //transition speed
        var gradientSpeed = 0.002;

        function updateGradient() {

            if ($ === undefined) return;

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

            $('.animated-gradient').css({
                background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
            }).css({
                background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
            });
            step += gradientSpeed;
            if (step >= 1) {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            }
        }

        setInterval(updateGradient, 10);

        /*****************************
         *  FAQ Collapse Add Class  *
         *****************************/
        var $element = $('.card-header a');
        if ($element.length > 0) {
            $element.on('click',function() {
                $('.card-header').removeClass('active');
                if (!$(this).closest('.card').find('.collapse').hasClass('show'))
                    $(this).parents('.card-header').addClass('active');
            });
        }

        /****************************
         *  Couter up  *
         ****************************/
        var $element = $('.counter');
        if ($element.length > 0) {
            $element.counterUp({
                delay: 10,
                time: 1000
            });
        }

        /*****************************
         *  Client Speak opt1  *
         ******************************/
        var $element = $('.carousel1 .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                margin: 30,
                navText: ['', ''],
                nav: true,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                        center: true,
                    },
                }
            });
        }

        /******************************
         *  Client Speak opt2  *
         ******************************/
        var $element = $('.carousel2');
        if ($element.length > 0) {
            $element.bxSlider({
                controls: false,
                auto: true,
                speed: 800,
                pagerCustom: '#bx-pager'
            });
        }

        /******************************
         *  Client Speak opt3  *
         ******************************/
        var $element = $('.carousel3 .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                margin: 30,
                navText: ['', ''],
                nav: true,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2,
                    },
                }
            });
        }

        /*****************************
         *  Client Speak opt4  *
         ******************************/
        var $element = $('.carousel4 .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                margin: 30,
                navText: ['', ''],
                nav: true,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3,
                        center: true,
                    },
                }
            });
        }

        /**********************
         *  Brands Carousel  *
         **********************/
        var $element = $('.brands .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                margin: 30,
                dots: false,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    480: {
                        items: 3,
                        margin: 20
                    },
                    768: {
                        items: 4,
                        margin: 20
                    },
                    1024: {
                        items: 5,
                        margin: 30
                    },
                    1200: {
                        items: 6,
                        margin: 30
                    },
                }
            });
        }
        
        /*********************************
         *  Related Products Carousel  *
         ********************************/
        var $element = $('.related-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                dots: false,
                navText: ['&#xe90e;', '&#xe911;'],
                nav: true,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    481: {
                        items: 2,
                        margin: 20,
                    },
                    768: {
                        items: 3,
                        margin: 20,
                    },
                    992: {
                        margin: 30,
                    },
                }
            });
        }

        /***************************************
         * footer menu accordian (@media 767)  *
         ***************************************/
        function footerAcc() {
            var $allFooterAcco = $(".mob-acco ul");
            var $allFooterAccoItems = $(".mob-acco h4");
            if (win.width() < 768) {
                $allFooterAcco.css('display', 'none');
                $allFooterAccoItems.on("click", function() {
                    if ($(this)
                        .hasClass('open')) {
                        $(this)
                            .removeClass('open');
                        $(this)
                            .next()
                            .stop(true, false)
                            .slideUp(300);
                    } else {
                        $allFooterAcco.slideUp(300);
                        $allFooterAccoItems.removeClass('open');
                        $(this)
                            .addClass('open');
                        $(this)
                            .next()
                            .stop(true, false)
                            .slideDown(300);
                        return false;
                    }
                });
            } else {
                $allFooterAcco.css('display', 'block');
                $allFooterAccoItems.off();
            }
        }
        win.on('resize', function() {
            footerAcc();
        });
        footerAcc();

        /**********************
         *  Gallery Isotope  *
         **********************/
        var $isotopeContainer = $('.isotopeContainer');
        if ($isotopeContainer.length > 0) {
            $isotopeContainer.isotope({
                itemSelector: '.isotopeSelector'
            });
            $('.isotopeFilters')
                .on('click', 'a', function(e) {
                    $('.isotopeFilters')
                        .find('.active')
                        .removeClass('active');
                    $(this)
                        .parent()
                        .addClass('active');
                    var $filterValue = $(this)
                        .attr('data-filter');
                    $isotopeContainer.isotope({
                        filter: $filterValue
                    });
                    e.preventDefault();
                    return false;
                });
        }

        /**************************
         *  Blog Masonry  *
         **************************/
        var $element = $('.masonry-blog > ul');
        if ($element.length > 0) {
            $element.masonry({
                itemSelector: '.masonry-blog > ul > li',
                percentPosition: true
            });
        }

        /*************************
         *  Vertical Tab  *
         *************************/
        var tab_vertical_content = $(".tab-vertical-content");
        tab_vertical_content.hide();
        $(".tab-vertical-content:first").show();
        /* if in tab mode */
        var $element = $(".tabs-vertical li");
        if ($element.length > 0) {
            $element.on('click', function() {
                tab_vertical_content.hide();
                var activeTab = $(this).attr("rel");
                $("#" + activeTab).fadeIn();
                $(".tabs-vertical li").removeClass("active");
                $(this).addClass("active");
                $(".tab-drawer-heading").removeClass("active-item");
                $(".tab-drawer-heading[rel^='" + activeTab + "']").addClass("active-item");
            });
        }
        /* if in drawer mode */
        var $element = $(".tab-drawer-heading");
        if ($element.length > 0) {
            $element.on('click', function() {
                tab_vertical_content.hide();
                var d_activeTab = $(this).attr("rel");
                $("#" + d_activeTab).fadeIn();
                $(".tab-drawer-heading").removeClass("active-item");
                $(this).addClass("active-item");
                $(".tabs-vertical li").removeClass("active");
                $(".tabs-vertical li[rel^='" + d_activeTab + "']").addClass("active");
            });
        }

        /***************************
         *  Features-carousel  *
         ***************************/
        var owl = $(".features-carousel-sec .owl-carousel");
        if (owl.length > 0) {
            owl.owlCarousel({
                items: 1,
                navText: ['<i class="icon-know-more-arrow" ></i>', '<i class="icon-know-more-arrow " ></i>'],
                navigation: true,
                controls: true,
                autoPlay: true
            });
        }

        /*****************************
         *  Browse File Settings  *
         *****************************/
        var $element = $('#browse-file');
        if ($element.length > 0) {
            $element.on("change", function() {
                $('#browse-path').val($(this).val().replace("C:\\fakepath\\", ""));
            });
        }
        var $element = $('#browse-photo');
        if ($element.length > 0) {
            $element.on("change", function() {
                $('#browse-path').val($(this).val().replace("C:\\fakepath\\", ""));
            });
        }

        /***************************
         *  career-carousel  *
         ***************************/
        var owl = $(".career-carousel .owl-carousel");
        if (owl.length > 0) {
            owl.owlCarousel({
                margin: 2,
                responsive: {
                    0: {
                        items: 1
                    },
                    575: {
                        items: 2
                    },
                    767: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                },
                navText: ['<i class="icon-know-more-arrow" ></i>', '<i class="icon-know-more-arrow " ></i>'],
                navigation: true,
                controls: true,
                autoPlay: false,
                scrollPerPage: true
            });
        }

        /*************************
         *  Component Carousel  *
         *************************/
        var $element = $('.component-carousel .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                loop: true,
                margin: 30,
                navText: ['', ''],
                nav: true,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },

                    768: {
                        items: 2,
                        margin: 20
                    },
                }
            });
        }

        /******************************
         *  Custom Opacity carousel  *
         ******************************/
        var $element = $('.custom-opacity .owl-carousel');
        if ($element.length > 0) {
            $element.owlCarousel({
                navText: ['<i class="icon-know-more-arrow" ></i>', '<i class="icon-know-more-arrow " ></i>'],
                nav: true,
                margin: 30,
                autoplay: true,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                scrollPerPage: true,
                loop: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3,
                        center: true,
                        margin: 20
                    },
                }
            });
        }

        /**************************
         *  Typed Master  *
         **************************/
        var $element = $('#typed');
        if ($element.length > 0) {
            new Typed('#typed', {
                strings: ['SaaS Template', 'Software Template', 'WebApp Template'],
                typeSpeed: 55,
                backSpeed: 55,
                smartBackspace: true,
                loop: true
            });
        }

        /*********************************
         *  Map Disable Scroll to Zoom  *
         *********************************/
        var $element = $('.contact-map');
        $element
            .on('click',function() {
                $(this).find('iframe').addClass('clicked');
            })
            .on('mouseleave',function() {
                $(this).find('iframe').removeClass('clicked');
        });
        
        /*********************************
         *  Price range slider  *
         *********************************/
        var $element = $("#slider-range");
        if ($element.length > 0) {
        	var amount = $("#amount");
        	$element.slider({
	             range: true,
	             min: 0,
	             max: 500,
	             values: [12, 350],
	             slide: function (event, ui) {
	                 amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
	             }
         	});	
         	amount.val("$" + $("#slider-range").slider("values", 0) +
             " - $" + $("#slider-range").slider("values", 1));
        
        }

        /******************************
         *  Product Slider  *
         ******************************/
        var $element = $('.product-carousel');
        if ($element.length > 0) {
            $element.bxSlider({
                controls: false,
                auto: true,
                speed: 800,
                pagerCustom: '#bx-pager'
            });
        }

        /****************************
         *  Validate Contact Form  *
         ****************************/
        var $form = $("#ContactForm");
        if ($form.length > 0) {
            $form.validate({
                rules: {
                    your_name: {
                        required: true,
                        minlength: 3
                    },
                    business_email: {
                        required: true,
                        email: true
                    },
                    phone_number: {
                        required: true,
                        number: true,
                        minlength: 10
                    },
                    company: {
                        required: true
                    },
                    message: {
                        required: true
                    }
                },
                messages: {
                    your_name: {
                        required: "Please Enter Name",
                        minlength: "Name must consist of at least 3 characters"
                    },
                    business_email: {
                        required: "Please provide an Email",
                        email: "Please enter a valid Email"
                    },
                    phone_number: {
                        required: "Please provide Phone Number",
                        number: "Please enter only digits",
                        minlength: "Phone Number must be atleast 10 Numbers"
                    },
                    company: {
                        required: "Please Enter Company Name"
                    },
                },
                submitHandler: function($form) {
                    //Send Booking Mail AJAX
                    var formdata = jQuery("#ContactForm")
                        .serialize();
                    jQuery.ajax({
                        type: "POST",
                        url: "contact_form/ajax-contact.php",
                        data: formdata,
                        dataType: 'json',
                        async: false,
                        success: function(data) {
                            if (data.success) {
                                jQuery('.msg')
                                    .removeClass('msg-error');
                                jQuery('.msg')
                                    .addClass('msg-success');
                                jQuery('.msg')
                                    .text('Thank You, Your Message Has been Sent');
                            } else {
                                jQuery('.msg')
                                    .removeClass('msg-success');
                                jQuery('.msg')
                                    .addClass('msg-error');
                                jQuery('.msg')
                                    .text('Error on Sending Message, Please Try Again');
                            }
                        },
                        error: function(error) {
                            jQuery('.msg')
                                .removeClass('msg-success');
                            jQuery('.msg')
                                .addClass('msg-error');
                            jQuery('.msg')
                                .text('Something Went Wrong');
                        }
                    });
                }
            });
        }

        /******************************
         *  Smooth Scrolling To Div  *
         ******************************/
        var $element = $(".scroll-link");
        if ($element.length > 0) {
            $element.on('click', function(event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800, function() {});
                }
            });
        }

        /***************************
         *  Scroll to top Action  *
         ***************************/
        var $element = $('.scroll-top');
        win.on("scroll", function() {
            if ($(this)
                .scrollTop() > 100) {
                $('.scroll-top').fadeIn();
            } else {
                $('.scroll-top').fadeOut();
            }
        });
        $element.on("click", function() {
            var $scrollElement = $("html, body");
            $scrollElement.animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        /*****************************
         *  Image Gallery Popup  *
         *****************************/
        var $element = $('.galleryItem');
        if ($element.length > 0) {
            var groups = {};
            $element.each(function() {
                var id = parseInt($(this).attr('data-group'), 10);
                if (!groups[id]) {
                    groups[id] = [];
                }
                groups[id].push(this);
            });
            $.each(groups, function() {

                $(this).magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        /***************************
         *  Video popup  *
         ***************************/
        var $element = $('.video');
        if ($element.length > 0) {
            $element.magnificPopup({
                type: 'iframe',
                iframe: {
                    patterns: {
                        dailymotion: {
                            index: 'dailymotion.com',
                            id: function(url) {
                                var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                                if (m !== null) {
                                    if (m[4] !== undefined) {
                                        return m[4];
                                    }
                                    return m[2];
                                }
                                return null;
                            },
                            src: 'https://www.dailymotion.com/embed/video/%id%'
                        },
                        youtube: {
                            index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                            id: 'v=', // String that splits URL in a two parts, second part should be %id%
                            // Or null - full URL will be returned
                            // Or a function that should return %id%, for example:
                            // id: function(url) { return 'parsed id'; }
                            src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: '/',
                            src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                        },
                        gmaps: {
                            index: 'https://maps.google.',
                            src: '%id%&output=embed'
                        }
                    }
                }
            });
        }

        /***************************
         *  Image popup  *
         ***************************/
        var $element = $('.image-popup');
        if ($element.length > 0) {
            $element.magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                image: {
                    verticalFit: true
                },
            });
        }
    });

})(jQuery);