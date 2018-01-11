webpackHotUpdate(0,[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _nav = __webpack_require__(1);
	
	var _nav2 = _interopRequireDefault(_nav);
	
	var _about = __webpack_require__(2);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _modals = __webpack_require__(3);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	var _filters = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../blocks/gallery/filters.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _filters2 = _interopRequireDefault(_filters);
	
	var _pagination = __webpack_require__(72);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;(function () {
		(0, _nav2.default)();
		(0, _about2.default)();
		(0, _modals2.default)();
		(0, _filters2.default)();
		(0, _pagination2.default)();
	
		$(document).on('click', '.actions-offer__btn', function () {
			$('[data-remodal-id=action]').find('input[name="form"]').val('Акция - ' + $(this).parents('.actions-offer').find('.actions-offer__title').html());
		});
	
		$('.actions-offer__btn').hover(function () {
			$(this).parents('.actions-offer').find('img').addClass('active');
		}, function () {
			$(this).parents('.actions-offer').find('img').removeClass('active');
		});
	
		//helper
		function setCookie(name, value, options) {
			options = options || {};
			var expires = options.expires;
			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString) {
				options.expires = expires.toUTCString();
			}
			var val = encodeURIComponent(value);
			var updatedCookie = name + "=" + val;
			for (var propName in options) {
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}
			document.cookie = updatedCookie;
		}
	
		$('input[type="tel"]').mask('+7(999)999-99-99');
	
		$(document).on('focus click', '.required', function () {
			$(this).removeClass('error');
		});
	
		//handler
		$(document).on('click', 'button[type="submit"]', function () {
	
			var $form = $(this).parents('form');
			var $btn = $(this);
			var errors = false;
	
			$form.find('.required').each(function () {
				var $val = $(this).val();
				if (!$val) {
					$(this).addClass('error');
					errors = true;
				}
			});
	
			if (errors == false) {
				yaCounter.reachGoal('order');
	
				var $btnText = $btn.text();
				$btn.text('Обработка данных...');
	
				var $method = $form.attr('method');
				var $action = $form.attr('action');
				var formData = new FormData($(this).parents('form')[0]);
	
				$.ajax({
					type: $method,
					url: $action,
					data: formData,
					processData: false,
					contentType: false,
					success: function success(data) {
						setCookie('empty', 'val', { path: '/' });
						window.location.href = '/thank.html';
						$btn.text($btnText);
					},
					error: function error(data) {
						$btn.text('Ошибка');
						setTimeout(function () {
							$btn.text($btnText);
						}, 2000);
					}
				});
			} else {
				console.log('Error');
			}
			return false;
		});
	
		function loadFiles(data) {
			var sendData = '';
	
			if (data) {
				sendData = data;
			} else {
				sendData = '';
			}
			$.ajax({
				url: '/assets/templates/content/upload.php',
				type: 'POST',
				data: sendData,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,
				xhr: function xhr() {
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener('progress', function (evt) {
						if (evt.lengthComputable) {
							$('.progress .progress-bar').slideDown();
							var progress = parseInt(evt.loaded / evt.total * 100);
							$('.progress .progress-bar').css('width', progress + '%');
						}
					}, false);
					return xhr;
				},
				success: function success(respond, textStatus, jqXHR) {
					if (typeof respond.error === 'undefined') {
						setTimeout(function () {
							$('.progress .progress-bar').slideUp();
							$('.progress .progress-bar').css('width', '0');
						}, 600);
						var files_path = respond;
						var html = '';
						$.each(files_path, function (key, val) {
							html += '<div class="file-item"><div class="text">' + val + '</div><div class="delfile"></div></div>';
						});
						$('.files').html(html);
					} else {
						console.log('Ошибка°: ' + respond.error);
					}
				},
				error: function error(jqXHR, textStatus, errorThrown) {
					console.log('Ошибка°: ' + textStatus);
				}
			});
		}
	
		document.addEventListener('DOMContentLoaded', function () {
			loadFiles();
			if (window.location.pathname.search(/ogrady/) != -1) {
				$('.char li:eq(3)').addClass('another');
				return false;
			}
			$('.open-gallery').fancybox();
		});
	
		var files = '';
	
		$(document).on('change', 'input[type=file]', function () {
	
			files = this.files;
	
			var data = new FormData();
	
			$.each(files, function (key, value) {
				data.append(key, value);
			});
	
			loadFiles(data);
		});
	
		$(document).on('click', '.delfile', function () {
			var self = this;
			var name = $(self).parent().find('.text').html();
			$('#nameDel').val(name);
			var data = $(this).parents('form').serialize();
			$.ajax({
				url: '/assets/templates/content/delete.php',
				type: 'POST',
				data: data,
				cache: false,
				success: function success(respond, textStatus, jqXHR) {
					if (respond == 'success') {
						$(self).parent().remove();
						$('input[type=file]').val('');
					}
				},
				error: function error(respond, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		});
	})();

/***/ })
])
//# sourceMappingURL=0.2211fd237a72d71b2435.hot-update.js.map