var commonModal = function(options) {
	if(typeof(options) !== 'object') {
		return false;
	}

	/*
	* 2019-12-18 추가
	* multipleYn(다중 bPopup 사용시 true, default false)
	* modalId(다중 bPopup 사용시 띄울 bPopup의 Id)
	* submitCloseYn(callBack시 bPopup 닫힘 유무 default true)
	* allCloseYn(callBack시에 띄워져있는 bPopup 전부 닫을지 선택 default false)
	*/

	var option = {
		title: '알림',
		submitText: '확인',
		cancelText: '취소',
		onlySubmit: false,
		autoClose: false,
		multipleYn: false,
        modalId: '',
        submitCloseYn: true,
        allCloseYn: false
	};

	$.extend(option, options);

	var $modal = $("#commonModal");

	if(option.multipleYn === true) {
		if(option.modalId === '') option.modalId = moment().format('YYYYMMDDHHmmss');
		var cloneTag = cloneTagDraw(option.modalId);
		$modal.after(cloneTag);
		$modal = $("#" + option.modalId);
	}

	var $title = $modal.find(".commonModalTitle"),
		$contents = $modal.find(".commonModalContent"),
		$btnClose = $modal.find(".pop_close"),
		$btnCancel = $modal.find(".commonModalClose"),
		$btnSubmit = $modal.find(".commonModalConfirm");

	this.modalInit = function() {
		$title.text(option.title);
		$contents.html(option.contents);
		$btnCancel.text(option.cancelText);
		$btnSubmit.text(option.submitText);
		$btnCancel.show();
		$btnSubmit.show();

		if(option.onlySubmit) {
			$btnCancel.hide();
		}

		if(option.autoClose) {
			$btnCancel.hide();
			$btnSubmit.hide();
		}
	};

	this.modalReset = function() {
		$title.text("");
		$contents.html("");
		$btnCancel.find("span").text("확인");
		$btnSubmit.find("span").text("취소");
	};

	var bPopupOption = {};
	bPopupOption.opacity = 0.80;
	bPopupOption.onOpen = function() {
		modalInit();
	};
	bPopupOption.modalClose = false;

	if(option.autoClose) {
		bPopupOption.autoClose = 1000;
		if(typeof(option.submit) === "function") {
			bPopupOption.onClose = function() {
				option.submit();
			}
		}
	}

	var bPopup = $modal.bPopup(bPopupOption);

	$btnSubmit.unbind("click").click(function(e) {
		e.preventDefault();

		if(typeof(option.submit) === 'function') {
			option.submit();

			if(option.multipleYn) {
			    if(option.submitCloseYn) {
                    $("#" + option.modalId).bPopup().close();
                    $("#" + option.modalId).remove();

                    if(option.allCloseYn) {
                    	$(".pop_wrap").each(function() {
                    		if($(this).attr("id") !== 'commonModal') {
								$(this).find(".commonModalClose").click();
								$(this).remove();
							}
						});
                    } else {
						$("#" + option.modalId).remove();
					}
                }
            } else {
                modalReset();
                bPopup.close();
            }
		} else {
			modalReset();
			bPopup.close();
		}
	});

	$(".pop_close").on("click", function() {
		var $modal = $(this).closest(".pop_wrap");
		$modal.find(".commonModalClose").click();
	});

	$btnCancel.unbind("click").click(function(e) {
		e.preventDefault();
		if(typeof(options.cancel) === "function") {
			option.cancel();
		}
		modalReset();
		bPopup.close();
	});

	$btnClose.unbind("click").click(function(e) {
		e.preventDefault();
		if(typeof(options.cancel) === "function") {
			option.cancel();
		}
		modalReset();
		bPopup.close();
	});
};

var oneBtnModal = function(message, callback) {
    commonModal({
        contents: message ? message : "Error",
        submit: callback,
        onlySubmit: true
    });
};

var twoBtnModal = function(message, callback) {
    commonModal({
        contents: message ? message : "Error",
        submit: callback
    });
};

var commonErrorModal = function(message, callback, onlySubmit) {
	commonModal({
		contents: message ? message : "Error",
		submit: callback,
		cancel: callback,
		onlySubmit: onlySubmit ? onlySubmit : false
	});
};

var cloneTagDraw = function(newId) {
	var cloneTag = "";

	cloneTag += "<div class=\"pop_wrap pop_alert\" id=\"" + newId + "\">";
	cloneTag += "<div class=\"pop_container\">";
	cloneTag += "<div class=\"pop_hd\">";
	cloneTag += "<h1 class=\"pop_title commonModalTitle\">알림</h1>";
	cloneTag += "<button type=\"button\" class=\"pop_close\"><i class=\"xi-close\"></i></button>";
	cloneTag += "</div>";
	cloneTag += "<div class=\"pop_cont\">";
	cloneTag += "<p class=\"commonModalContent\"></p>";
	cloneTag += "</div>";
	cloneTag += "<div class=\"btn_wrap btn_mr\">";
	cloneTag += "<button type=\"button\" class=\"btn btn_st1 commonModalClose\">취소</button>";
	cloneTag += "<button type=\"button\" class=\"btn btn_st2 commonModalConfirm\">확인</button>";
	cloneTag += "</div>";
	cloneTag += "</div>";
	cloneTag += "</div>";

	return cloneTag;
};


/**
 * 로그인 모달
 *  author : Jake
 *  date : 20.04.02
 */

var loginModal = function(options) {
	if(typeof(options) !== 'object') {
		return false;
	}

	/*
	* 2019-12-18 추가
	* multipleYn(다중 bPopup 사용시 true, default false)
	* modalId(다중 bPopup 사용시 띄울 bPopup의 Id)
	* submitCloseYn(callBack시 bPopup 닫힘 유무 default true)
	* allCloseYn(callBack시에 띄워져있는 bPopup 전부 닫을지 선택 default false)
	*/

	var option = {
		title: '알림',
		submitText: '로그인 후 상담신청',
		cancelText: '비회원 상담신청',
		onlySubmit: false,
		autoClose: false,
		multipleYn: false,
		modalId: '',
		submitCloseYn: true,
		allCloseYn: false
	};

	$.extend(option, options);

	var $modal = $("#commonModal");

	if(option.multipleYn === true) {
		if(option.modalId === '') option.modalId = moment().format('YYYYMMDDHHmmss');
		var cloneTag = cloneTagDraw(option.modalId);
		$modal.after(cloneTag);
		$modal = $("#" + option.modalId);
	}

	var $title = $modal.find(".commonModalTitle"),
		$contents = $modal.find(".commonModalContent"),
		$btnClose = $modal.find(".pop_close"),
		$btnCancel = $modal.find(".commonModalClose"),
		$btnSubmit = $modal.find(".commonModalConfirm");

	this.modalInit = function() {
		$title.text(option.title);
		$contents.html(option.contents);
		$btnCancel.text(option.cancelText);
		$btnSubmit.text(option.submitText);
		$btnCancel.show();
		$btnSubmit.show();

		if(option.onlySubmit) {
			$btnCancel.hide();
		}

		if(option.autoClose) {
			$btnCancel.hide();
			$btnSubmit.hide();
		}
	};

	this.modalReset = function() {
		$title.text("");
		$contents.html("");
		$btnCancel.find("span").text("로그인 후 상담신청");
		$btnSubmit.find("span").text("비회원 상담신청");
	};

	var bPopupOption = {};
	bPopupOption.opacity = 0.80;
	bPopupOption.onOpen = function() {
		modalInit();
	};
	bPopupOption.modalClose = false;

	if(option.autoClose) {
		bPopupOption.autoClose = 1000;
		if(typeof(option.submit) === "function") {
			bPopupOption.onClose = function() {
				option.submit();
			}
		}
	}

	var bPopup = $modal.bPopup(bPopupOption);

	$btnSubmit.unbind("click").click(function(e) {
		e.preventDefault();

		if(typeof(option.submit) === 'function') {
			option.submit();

			if(option.multipleYn) {
				if(option.submitCloseYn) {
					$("#" + option.modalId).bPopup().close();
					$("#" + option.modalId).remove();

					if(option.allCloseYn) {
						$(".pop_wrap").each(function() {
							if($(this).attr("id") !== 'commonModal') {
								$(this).find(".commonModalClose").click();
								$(this).remove();
							}
						});
					} else {
						$("#" + option.modalId).remove();
					}
				}
			} else {
				modalReset();
				bPopup.close();
			}
		} else {
			modalReset();
			bPopup.close();
		}
	});

	$(".pop_close").on("click", function() {
		var $modal = $(this).closest(".pop_wrap");
		$modal.find(".commonModalClose").click();
	});

	$btnCancel.unbind("click").click(function(e) {
		e.preventDefault();
		if(typeof(option.close) === 'function') {
			option.close();

			if(option.multipleYn) {
				if(option.submitCloseYn) {
					$("#" + option.modalId).bPopup().close();
					$("#" + option.modalId).remove();

					if(option.allCloseYn) {
						$(".pop_wrap").each(function() {
							if($(this).attr("id") !== 'commonModal') {
								$(this).find(".commonModalClose").click();
								$(this).remove();
							}
						});
					} else {
						$("#" + option.modalId).remove();
					}
				}
			} else {
				modalReset();
				bPopup.close();
			}
		} else {
			modalReset();
			bPopup.close();
		}
	});

	$btnClose.unbind("click").click(function(e) {
		e.preventDefault();
		if(typeof(options.cancel) === "function") {
			option.cancel();
		}
		modalReset();
		bPopup.close();
	});
};