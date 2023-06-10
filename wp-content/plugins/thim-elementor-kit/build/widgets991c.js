/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/widgets/js/mini-cart.js":
/*!*************************************!*\
  !*** ./src/widgets/js/mini-cart.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MiniCart; }
/* harmony export */ });
function MiniCart() {
  const cart = document.querySelector('.thim-ekits-mini-cart.side-cart'),
        cartBtn = cart && cart.querySelector('.minicart-icon'),
        closePopup = cart && cart.querySelector('.thim-ekits-mini-cart__close');

  if (!cart) {
    return;
  }

  const isCartOpen = () => {
    return cart.classList.contains('thim-ekits-mini-cart--is-show');
  };

  const showCart = () => {
    if (isCartOpen()) {
      return;
    }

    cart.classList.add('thim-ekits-mini-cart--is-show');
  };

  const hideCart = () => {
    if (!isCartOpen()) {
      return;
    }

    cart.classList.remove('thim-ekits-mini-cart--is-show');
  };

  const toggleCart = () => {
    if (isCartOpen()) {
      hideCart();
    } else {
      showCart();
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 27) {
      hideCart();
    }
  };

  cartBtn && cartBtn.addEventListener('click', e => {
    e.preventDefault();
    toggleCart();
  });
  document.addEventListener('click', e => {
    if (!isCartOpen()) {
      return;
    }

    const target = e.target;

    if (target.closest('.thim-ekits-mini-cart__content') || target.closest('.minicart-icon')) {
      return;
    }

    hideCart();
  }); // Click close button.

  closePopup && closePopup.addEventListener('click', e => {
    e.preventDefault();
    hideCart();
  });
  document.addEventListener('keydown', onKeyDown, false); // click ESC button will hide popup

  jQuery(document.body).on('added_to_cart', showCart); // WooCommerce is required jQuery
}

/***/ }),

/***/ "./src/widgets/js/tabs.js":
/*!********************************!*\
  !*** ./src/widgets/js/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ThimEkitsTabs; }
/* harmony export */ });
/** https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role */
function ThimEkitsTabs() {
  const tabList = document.querySelector('.thim-ekit-tablist [role="tablist"]');

  if (!tabList) {
    return;
  }

  const tabs = document.querySelectorAll('.thim-ekit-tablist [role="tab"]'); // Add a click event handler to each tab

  tabs.forEach(tab => {
    tab.addEventListener('click', changeTabs);
  }); // Enable arrow navigation between tabs in the tab list

  let tabFocus = 0;
  tabList.addEventListener('keydown', e => {
    // Move right
    if (e.keyCode === 39 || e.keyCode === 37) {
      tabs[tabFocus].setAttribute('tabindex', -1);

      if (e.keyCode === 39) {
        tabFocus++; // If we're at the end, go to the start

        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        } // Move left

      } else if (e.keyCode === 37) {
        tabFocus--; // If we're at the start, move to the end

        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus();
    }
  });
}

function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode; // Remove all current selected tabs

  parent.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute('aria-selected', false)); // Set this tab as selected

  target.setAttribute('aria-selected', true); // Hide all tab panels

  grandparent.querySelectorAll('[role="tabpanel"]').forEach(p => p.setAttribute('hidden', true)); // Show the selected panel

  grandparent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`).removeAttribute('hidden');
}

/***/ }),

/***/ "./src/widgets/js/thim-slider.js":
/*!***************************************!*\
  !*** ./src/widgets/js/thim-slider.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ThimSlider; }
/* harmony export */ });
class ThimSlider extends elementorModules.frontend.handlers.SwiperBase {
  getDefaultSettings() {
    return {
      selectors: {
        carousel: '.thim-ekits-sliders',
        gallery: '.thim-ekits-gallery-thumbs',
        slideContent: '.swiper-slide'
      }
    };
  }

  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $swiperContainer: this.$element.find(selectors.carousel),
      $swiperGallery: this.$element.find(selectors.gallery)
    };
    elements.$slides = elements.$swiperContainer.find(selectors.slideContent);
    return elements;
  }

  getSwiperOptions() {
    const elementSettings = this.getElementSettings(),
          slidesToShow = +elementSettings.slidesPerView || 3,
          isSingleSlide = 1 === slidesToShow,
          elementorBreakpoints = elementorFrontend.config.breakpoints,
          defaultSlidesToShowMap = {
      small_mobile: 1,
      mobile: 1,
      tablet: isSingleSlide ? 1 : 2
    };
    let swiperOptions = {
      slidesPerView: slidesToShow,
      loop: 'yes' === elementSettings.slider_loop,
      speed: elementSettings.slider_speed,
      // handleElementorBreakpoints: true,
      freeMode: true,
      watchSlidesProgress: true
    };

    if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiperOptions = {
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: +elementSettings.slidesPerView || 3,
        speed: elementSettings.slider_speed,
        handleElementorBreakpoints: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        watchSlidesProgress: true
      };

      if ('yes' === elementSettings.slider_autoplay) {
        swiperOptions.autoplay = {
          delay: elementSettings.slider_speed,
          disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
        };
      }
    } else {
      swiperOptions.breakpoints = {};
      let lastBreakpointSlidesToShowValue = slidesToShow,
          screenName;
      Object.keys(elementorBreakpoints).reverse().forEach(breakpointName => {
        if (elementorBreakpoints[breakpointName] == '1660') {
          screenName = 'widescreen';
        } else if (elementorBreakpoints[breakpointName] == '768') {
          screenName = 'tablet';
        } else if (elementorBreakpoints[breakpointName] == '480') {
          screenName = 'mobile';
        } else if (elementorBreakpoints[breakpointName] == '0') {
          screenName = 'small_mobile';
        }

        const defaultSlidesToShow = defaultSlidesToShowMap[screenName] ? defaultSlidesToShowMap[screenName] : lastBreakpointSlidesToShowValue;
        swiperOptions.breakpoints[elementorBreakpoints[breakpointName]] = {
          slidesPerView: +elementSettings['slidesPerView_' + screenName] || defaultSlidesToShow,
          slidesPerGroup: +elementSettings['slidesPerGroup_' + screenName] || 1,
          spaceBetween: +elementSettings['spaceBetween_' + screenName] || elementSettings.spaceBetween
        };
        lastBreakpointSlidesToShowValue = +elementSettings['slidesPerView_' + screenName] || defaultSlidesToShow;
      });
    }

    if ('yes' === elementSettings.centered_slides) {
      swiperOptions.centeredSlides = true;
    }

    if ('yes' === elementSettings.slider_autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.slider_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }

    if (isSingleSlide) {
      swiperOptions.effect = elementSettings.effect;

      if ('fade' === elementSettings.effect) {
        swiperOptions.fadeEffect = {
          crossFade: true
        };
      }
    } else {
      swiperOptions.slidesPerGroup = +elementSettings.slidesPerGroup || 1;
    }

    if (elementSettings.spaceBetween) {
      swiperOptions.spaceBetween = elementSettings.spaceBetween;
    }

    if ('yes' === elementSettings.slider_show_arrow) {
      swiperOptions.navigation = {
        prevEl: this.$element.find('.thim-slider-nav-prev'),
        nextEl: this.$element.find('.thim-slider-nav-next')
      };
    }

    switch (elementSettings.slider_show_pagination) {
      case 'number':
        swiperOptions.pagination = {
          el: this.$element.find('.thim-slider-pagination'),
          clickable: true,

          renderBullet(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }

        };
        break;

      case 'scrollbar':
        swiperOptions.scrollbar = {
          el: this.$element.find('.thim-slider-pagination'),
          hide: true
        };
        break;

      case 'bullets':
      case 'progressbar':
      case 'fraction':
        swiperOptions.pagination = {
          el: this.$element.find('.thim-slider-pagination'),
          type: elementSettings.slider_show_pagination,
          clickable: true
        };
        break;

      case 'yes':
        swiperOptions.pagination = {
          el: this.$element.find('.thim-slider-pagination'),
          type: 'bullets',
          clickable: true
        };
        break;
    }

    return swiperOptions;
  }

  getSwiperOptionsGallery(carousel) {
    const elementSettings = this.getElementSettings();
    let swiper_opt_gallery = {
      loop: true,
      slidesPerView: 1,
      speed: elementSettings.slider_speed
    };
    swiper_opt_gallery.spaceBetween = 30;

    if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiper_opt_gallery = {
        loop: true,
        // slidesPerView: 1,
        loopedSlides: +elementSettings.slidesPerView || 3,
        speed: elementSettings.slider_speed,
        autoplay: false
      };
    } else {
      swiper_opt_gallery.thumbs = {
        swiper: carousel
      };
    }

    if ('yes' === elementSettings.slider_show_arrow) {
      swiper_opt_gallery.navigation = {
        prevEl: this.$element.find('.thim-slider-nav-prev'),
        nextEl: this.$element.find('.thim-slider-nav-next')
      };
    }

    if ('yes' === elementSettings.slider_autoplay && !this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
      swiper_opt_gallery.autoplay = {
        delay: elementSettings.slider_speed,
        disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
      };
    }

    return swiper_opt_gallery;
  }

  async onInit() {
    super.onInit(...arguments);
    const elementSettings = this.getElementSettings();

    if (!this.elements.$swiperContainer.length || 2 > this.elements.$slides.length) {
      return;
    } // const Swiper = elementorFrontend.utils.swiper;


    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper(this.elements.$swiperContainer, this.getSwiperOptions()); // Expose the swiper instance in the frontend

    this.elements.$swiperContainer.data('swiper', this.swiper); // gallery slider

    if (this.elements.$swiperGallery.length) {
      this.swiper_gallery = await new Swiper(this.elements.$swiperGallery, this.getSwiperOptionsGallery(this.swiper));
      this.elements.$swiperGallery.data('swiper', this.swiper_gallery);

      if (this.elements.$swiperContainer.hasClass('thim-ekits-testimonial__avatars')) {
        this.swiper_gallery.controller.control = this.swiper;
        this.swiper.controller.control = this.swiper_gallery;

        if ('yes' === elementSettings.pause_on_hover) {
          this.$element.on('mouseenter', () => {
            this.swiper.autoplay.stop();
          }).on('mouseleave', () => {
            this.swiper.autoplay.start();
          });
        }
      }
    }

    if ('yes' === elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    }
  }

  updateSwiperOption(propertyName) {
    const elementSettings = this.getElementSettings(),
          newSettingValue = elementSettings[propertyName],
          params = this.swiper.params; // Handle special cases where the value to update is not the value that the Swiper library accepts.

    switch (propertyName) {
      case 'autoplay_speed':
        params.autoplay.delay = newSettingValue;
        break;

      case 'speed':
        params.speed = newSettingValue;
        break;
    }

    this.swiper.update();
  }

  getChangeableProperties() {
    return {
      pause_on_hover: 'pauseOnHover',
      autoplay_speed: 'delay',
      speed: 'speed'
    };
  }

  onElementChange(propertyName) {
    const changeableProperties = this.getChangeableProperties();

    if (changeableProperties[propertyName]) {
      // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library.
      if ('pause_on_hover' === propertyName) {
        const newSettingValue = this.getElementSettings('pause_on_hover');
        this.togglePauseOnHover('yes' === newSettingValue);
      } else {
        this.updateSwiperOption(propertyName);
      }
    }
  } // onEditSettingsChange(propertyName) {
  // 	if ('activeItemIndex' === propertyName) {
  // 		this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
  // 	}
  // }


}

/***/ }),

/***/ "./src/widgets.scss":
/*!**************************!*\
  !*** ./src/widgets.scss ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/widgets.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _widgets_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./widgets.scss */ "./src/widgets.scss");
/* harmony import */ var _widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widgets/js/tabs */ "./src/widgets/js/tabs.js");
/* harmony import */ var _widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/js/mini-cart */ "./src/widgets/js/mini-cart.js");
/* harmony import */ var _widgets_js_thim_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widgets/js/thim-slider */ "./src/widgets/js/thim-slider.js");




document.addEventListener('DOMContentLoaded', () => {
  (0,_widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"])();
}); // callback in Elementor Editor.

document.body.addEventListener('thimEkitsEditor:init', function () {
  (0,_widgets_js_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"])();
}); // callback in Elementor Editor.

document.body.addEventListener('thimEkitsEditor:miniCart', _widgets_js_mini_cart__WEBPACK_IMPORTED_MODULE_2__["default"]);
jQuery(window).on('elementor/frontend/init', () => {
  const addHandler = $element => {
    elementorFrontend.elementsHandler.addHandler(_widgets_js_thim_slider__WEBPACK_IMPORTED_MODULE_3__["default"], {
      $element
    });
  };

  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-list-course.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-list-blog.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-testimonial.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-ekits-team.default', addHandler);
  elementorFrontend.hooks.addAction('frontend/element_ready/thim-list-event.default', addHandler);
});
}();
/******/ })()
;
//# sourceMappingURL=widgets.js.map