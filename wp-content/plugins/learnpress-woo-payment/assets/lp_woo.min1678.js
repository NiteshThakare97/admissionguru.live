!function($){let a;$.fn._add_course_to_cart=function(){$(document).on("submit","form[name=form-add-course-to-cart]",function(g){g.preventDefault();let c=$(this);if(a.length&&"yes"!==localize_lp_woo_js.woo_enable_signup_and_login_from_checkout&&"yes"!==localize_lp_woo_js.woocommerce_enable_guest_checkout&&$('body:not(".logged-in")')){a.trigger("click");let b=$("form[name=loginpopopform]");if(!b.find(".params-purchase-code").length){let d=c.find("input[name=course-id]").val();b.append('<p class="params-purchase-code"></p>');let e=b.find(".params-purchase-code");e.append('<input type="hidden" name="add-to-cart" value="'+d+'" />'),e.append('<input type="hidden" name="purchase-course" value="'+d+'" />')}return!1}let h=c.find(".btn-add-course-to-cart"),f=$(this).serialize();return f+="&action=lpWooAddCourseToCart",$.ajax({url:localize_lp_woo_js.url_ajax,data:f,method:"post",dataType:"json",success(a){1===a.code?void 0!==a.redirect_to&&""!==a.redirect_to?window.location=a.redirect_to:($(".wrap-btn-add-course-to-cart").each(function(g){let b=$(this),d=b.find("[name=course-id]").val(),e=c.find("[name=course-id]").val();if(d===e){b.append(a.button_view_cart);let f=b.find("form[name=form-add-course-to-cart]");f.remove()}}),$("div.widget_shopping_cart_content").html(a.widget_shopping_cart_content),$(".minicart_hover .items-number").html(a.count_items)):alert(a.message)},beforeSend(){h.append('<span class="fa fa-spinner"></span>')},complete(){h.find("span").removeClass("fa fa-spinner")},error(a){console.log(a)}}),!1})},window.addEventListener("pageshow",function(a){let b=a.persisted|| void 0!==window.performance&&"back_forward"==String(window.performance.getEntriesByType("navigation")[0].type);b&&location.reload()}),$(function(){a=$(".thim-login-popup .login"),$.fn._add_course_to_cart()})}(jQuery)