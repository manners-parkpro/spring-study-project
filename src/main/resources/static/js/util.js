/**
 * Common JS
 * @author Park-pro
 * @date 19.05.08
 */

function multiDateRangePickerInit(options) {
	if (typeof(options) != "object") {
		return false;
	}

	var target;
	if (typeof(options.targetId) === "string") {
		target = $("#" + options.targetId);
	}
	else if (typeof(options.target) === "object") {
		target = options.target;
	} else {
		return false;
	}

	var st_dt;
	var en_dt;
	if (typeof(options.startName) === "string") {
		st_dt = $("input[name='" + options.startName + "']");
	} else if (typeof(options.startTarget) === "object") {
		st_dt = options.startTarget;
	} else {
		return false;
	}

	if (typeof(options.endName) === "string") {
		en_dt = $("input[name='" + options.endName + "']");
	} else if (typeof(options.endTarget) === "object") {
		en_dt = options.endTarget;
	} else {
		return false;
	}

	var yearCheck = false;
	var now = moment();
	if (typeof(options.year) === "string") {
		yearCheck = true;
		now = moment().set('year', options.year);
	}

	//Date range picker init
	target.daterangepicker({
		startDate: moment(),
		endDate: moment(),
		timePicker12Hour: false,
		format: 'YYYY-MM-DD',
		showDropdowns: true,
		showWeekNumbers: false,
		opens: 'right',
		locale: {
			applyLabel: '저장',
			cancelLabel: '초기화',
			fromLabel: 'From',
			toLabel: 'To',
			daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			firstDay: 1
		},
		autoUpdateInput: true
	});

	/*
	var setShowDateRange = function () {
		var startDate = target.data('daterangepicker').startDate.format('DD/MM/YYYY');
		var endDate = target.data('daterangepicker').endDate.format('DD/MM/YYYY');
		var startDateTime = target.data('daterangepicker').startDate.format('YYYY-MM-DDT00:00:00');
		var endDateTime = target.data('daterangepicker').endDate.format('YYYY-MM-DDT23:59:59');
		target.val(startDate + " ~ " + endDate);
		st_dt.val(startDateTime);
		en_dt.val(endDateTime);
	};
	*/

	var setShowDateRange = function () {
		var startDate = target.data('daterangepicker').startDate.format('YYYY-MM-DD');
		var endDate = target.data('daterangepicker').endDate.format('YYYY-MM-DD');
		var startDateTime = target.data('daterangepicker').startDate.format('YYYY-MM-DDT00:00:00');
		var endDateTime = target.data('daterangepicker').endDate.format('YYYY-MM-DDT23:59:59');
		target.val(startDate + " ~ " + endDate);
		st_dt.val(startDateTime);
		en_dt.val(endDateTime);
	};

	//init search date start / end
	if (st_dt.val().length > 0 && en_dt.val().length > 0) {
		/*
		if (yearCheck) {
			target.data("daterangepicker").setStartDate(moment(st_dt.val(), "DD/MM/YYYY").set('year', options.year));
			target.data("daterangepicker").setEndDate(moment(en_dt.val(), "DD/MM/YYYY").set('year', options.year));
		} else {
			target.data("daterangepicker").setStartDate(moment(st_dt.val(), "DD/MM/YYYY"));
			target.data("daterangepicker").setEndDate(moment(en_dt.val(), "DD/MM/YYYY"));
		}
		*/

		target.data("daterangepicker").setStartDate(moment(st_dt.val(), "YYYY-MM-DD"));
		target.data("daterangepicker").setEndDate(moment(en_dt.val(), "YYYY-MM-DD"));
		setShowDateRange();
	} else {
		target.val('');
	}

	//date range picker apply event
	target.on('apply.daterangepicker', function (e, picker) {
		setShowDateRange();
	});

	//date range picker cancel event
	target.on('cancel.daterangepicker', function (e, picker) {
		$(this).val('');
		st_dt.val('');
		en_dt.val('');
	});

	target.on('hide.daterangepicker', function (e, picker) {
		setShowDateRange();
	});
};

var iCheckInit = function() {
	$('input[type="checkbox"], input[type="radio"]').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_flat-blue'
	});
};

function pagination(page) {
	var $frmSearch = $("form[name='frmSearch']");
	$frmSearch.find("input[name='page']").val(page);
	$frmSearch.submit();
}

function drawAttachments($params) {

	if ($params === null || $params === undefined) return false;

	var data = $params.rs_data;

	var originalFileName = data.orgFilename,
        s3FileName = data.savedFilename,
        fullPath = data.fullPath,
        fileType = data.fileType;

	var downloadUri = '/attachment/download?savedFileName=' + encodeURI(s3FileName) + '&originalFileName=' + encodeURI(originalFileName);

    var tags = "";
    if (fileType === 'Image' || 'Thumbnail') {
        tags = "<a href='" + downloadUri + "'> <img src='" + fullPath + "'></a>";
    } else {
        tags = "<a href='" + downloadUri + "'>" + originalFileName + "</a>";
    }

	return tags;
}

var onlyNumberKeyEvent = function (options) {
	if (typeof(options) !== 'object') return false;

	var option = {};
	option.className = "only-number";
	option.formId = "";

	$.extend(options, option);

	var target = "";
	if (option.formId === "") {
		target = $("." + option.className);
	} else {
		target = $("." + option.className, $("#" + option.formId));
	}

	target.each(function() {
		$(this).unbind("keydown").keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter, and, -, .
			//if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 189, 190]) !== -1 ||
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
				// Allow: Ctrl+A
				(e.keyCode == 65 && e.ctrlKey === true) ||
				// Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				return ;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	});

	target.keyup(function(e) {
		var inputValue = $(this).val();
		if(e.keyCode == 8) return;
		$(this).val(onlyNumber(inputValue));
	});
};

var onlyNumber = function(str) {
	var len = str.length;
	var result = "";

	for (var i=0; i<len; i++) {
		if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9") || str.charAt(i) === "." || str.charAt(i) === "-") {
			result += str.charAt(i);
		}
	}
	return result;
};

var onlyContractKeyEvent = function (options) {
	if (typeof(options) !== 'object') return false;
	
	var option = {};
	option.className = "only-contract";
	option.formId = "";
	
	$.extend(options, option);
	
	var target = "";
	if (option.formId === "") {
		target = $("." + option.className);
	} else {
		target = $("." + option.className, $("#" + option.formId));
	}
	
	target.each(function() {
		$(this).unbind("keydown").keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter, and, -, .
			//if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 189, 190]) !== -1 ||
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 189]) !== -1 ||
				// Allow: Ctrl+A
				(e.keyCode == 65 && e.ctrlKey === true) ||
				// Allow: home, end, left, right
				(e.keyCode >= 35 && e.keyCode <= 39)) {
				return ;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	});
	
	target.keyup(function(e) {
		var inputValue = $(this).val();
		if(e.keyCode == 8) return;
		$(this).val(onlyContract(inputValue));
	});
};

var onlyContract = function(str) {
	var len = str.length;
	var result = "";
	
	for (var i=0; i<len; i++) {
		if ((str.charAt(i) >= "0") && (str.charAt(i) <= "9") || str.charAt(i) === "." || str.charAt(i) === "-") {
			result += str.charAt(i);
		}
	}
	return result;
};

var setCookie = function(cookieName, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
	document.cookie = cookieName + "=" + cookieValue;
};

var getCookie = function(cookieName) {
	cookieName = cookieName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cookieName);
	var cookieValue = '';
	if(start != -1){
		start += cookieName.length;
		var end = cookieData.indexOf(';', start);
		if(end == -1)end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}
	return unescape(cookieValue);
};

var deleteCookie = function(cookieName) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toUTCString() + "; path=/";
};

function formatDate(createdAt) {
	var date = new Date(createdAt);
	return date.getFullYear() + "." + (date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + "." + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + " " + date.getHours() + ":" + date.getMinutes();
}

function drawPaging($pageInfo, $totalCount, $currentPage) {
	var totalCount = parseInt($totalCount),
		countPerPage = parseInt($pageInfo.pageSize),
		currentPage = parseInt($currentPage);

	var totalPage = Math.ceil(totalCount/countPerPage);
	var pageDivCount = 5;
	var firstPage = Math.floor((currentPage - 1)/pageDivCount) * pageDivCount + 1;
	var lastPage = firstPage + pageDivCount - 1;
	var lastBlock = Math.floor(totalPage/pageDivCount) * pageDivCount + 1;

	var tag = "";

	tag += "<div class=\"page_wrap\">";
	tag += "<div class=\"prev_wrap\">";
	tag += "<button type=\"button\" class=\"page_first ir trans paging\" data-page_number=\"0\">맨 처음으로 이동</button>";
	if (firstPage === 1) {
		tag += "<button type=\"button\" class=\"page_prev ir trans paging\" data-page_number=\"0\">이전페이지</button>";
	} else {
		tag += "<button type=\"button\" class=\"page_prev ir trans paging\" data-page_number=\"" + (firstPage-2) + "\">이전페이지</button>";
	}
	tag += "</div>";


	tag += "<ul class=\"page\">";
	for (var i = firstPage; i <= lastPage; i++) {
		if (i === currentPage) {
			tag += "<li class=\"pagefocus paging\" data-page_number=\"" + (i-1) + "\"><a> " + i + "</a></li>";
		} else {
			if (i <= totalPage) {
				tag += "<li class=\"paging\" data-page_number=\"" + (i-1) + "\"><a>" + i + "</a></li>";
			}
		}
	}
	tag += "</ul>";


	tag += "<div class=\"next_wrap\">";
	if (firstPage === lastBlock) {
		tag += "<button type=\"button\" class=\"page_next ir trans paging\" data-page_number=\"" + (totalPage-1) + "\">다음페이지</button>";
	} else {
		tag += "<button type=\"button\" class=\"page_next ir trans paging\" data-page_number=\"" + (lastPage) + "\">다음페이지</button>";
	}

	tag += "<button type=\"button\" class=\"page_end ir trans paging\" data-page_number=\"" + (totalPage - 1) + "\">맨 끝으로 이동</button>";
	tag += "</div>";
	tag += "</div>";

	$(".page_area").html("");
	$(".page_area").append(tag);
}

/*
 * 호출 방법은
 * constructionExample_view 291 Line 참고. ( snsShareTrigger )
 */
function snsShare(snsName, link, title) {

	if (title === null) return false;

	var snsPopUp;
	var _width = '500';
	var _height = '450';
	var _left = Math.ceil(( window.screen.width - _width )/2);
	var _top = Math.ceil(( window.screen.height - _height )/2);

	switch(snsName){
		case 'facebook':
			snsPopUp = window.open("http://www.facebook.com/sharer/sharer.php?u=" + link, '', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
			break;

		case 'twitter' :
			snsPopUp = window.open("http://twitter.com/intent/tweet?url=" + link + "&text=" + title, '', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
			break;

		case 'kakao' :

			// Kakao.Story.share({
			// 	url: 'https://www.homecc.co.kr/community/case_view.do?boardId=2348'
			// });

			snsPopUp = window.open("https://story.kakao.com/share?url=" + link, '', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
			break;

		case 'addurl' :
			var dummy = document.createElement("textarea");
			document.body.appendChild(dummy);
			dummy.value = link;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			oneBtnModal("URL이 클립보드에 복사되었습니다.");
			break;
	}
}

var like = function(response) {
	if (response) {
		$('.like i').removeClass('xi-heart-o');
		$('.like i').addClass('xi-heart');
	} else {
		$('.like i').removeClass('xi-heart');
		$('.like i').addClass('xi-heart-o');
	}
};

var bookmark = function(response) {
	if (response) {
		$('.bookmark i').removeClass('xi-bookmark-o');
		$('.bookmark i').addClass('xi-bookmark');
	} else {
		$('.bookmark i').removeClass('xi-bookmark');
		$('.bookmark i').addClass('xi-bookmark-o');
	}
};

// 이메일
var emailSelect = function () {
	$(".email_slct option:selected").each(function () {
		var $emailDomain = $('.emailDomain');

		if ($(this).val() === '') { //직접입력일 경우
			$emailDomain.val(''); //값 초기화
			$emailDomain.attr("disabled", false); //활성화
		} else { //직접입력이 아닐경우
			$emailDomain.val($(this).text()); //선택값 입력
			$emailDomain.attr("disabled", true); //비활성화
		}
	});
};

var drawArea = function(index, params, cityCodes, townCodes) {
	var $wrapper = $('#areaBox');
	var tag = '';

	if (params.code === "CITY_CD_16") params.groupId = 16;

	/** CITY **/
	tag += '<div class="select_group">' +
		'<div class="row">' +
		'<div class="inp_slct">' +
		'<select class="cityCd">' +
		'<option value="">시/도</option>';

	$.each(cityCodes, function(cityIndex, cityItem) {
		if (params.groupId === cityItem.id) tag += '<option value="' + cityItem.code +'" description="' + cityItem.description +'" data-id="' + cityItem.id + '" selected>' + cityItem.description +'</option>';
		else tag += '<option value="' + cityItem.code +'" description="' + cityItem.description +'" data-id="' + cityItem.id + '">' + cityItem.description +'</option>';
	});

	tag += '</select>' +
		'<i class="xi-angle-down-min"></i>' +
		'</div>';

	/** TOWN **/
	tag += '<div class="inp_slct">' +
		'<select class="townCd" name="townCd">' +
		'<option value="">구</option>';

	$.each(townCodes, function(townIndex, townItem) {
		if (params.groupId === townItem.groupId) {
			if (params.id === townItem.id) tag += '<option value="' + townItem.code +'" description="' + townItem.description +'" data-id="' + townItem.id + '" selected>' + townItem.description +'</option>';
			else tag += '<option value="' + townItem.code +'" description="' + townItem.description +'" data-id="' + townItem.id + '">' + townItem.description +'</option>';
		}
	});

	tag += '</select>' +
		'<i class="xi-angle-down-min"></i>' +
		'</div>';

	if (index === 0) {
		tag += '<button type="button" class="row_add" id="btnTownAdd">' + '<i class="xi-plus"></i>' + '</button>' +
			'</div>' +
			'</div>';
	} else {
		tag += '<button type="button" class="row_del btnRemove">' + '<i class="xi-minus"></i>' + '</button>' +
			'</div>' +
			'</div>';
	}

	return $wrapper.append(tag);
};

// 파트너 관련 DRAW
var textLoad = function(detailDto) {

	console.log(detailDto);

	var $wrapper = $('.divide_wrap');
	var areaText = '',
		detailText = '';

	// 공사가능 지역 DRAW.
	if (detailDto.areas !== null && detailDto.areas.length > 0) {
		$.each(detailDto.areas, function(index, item) {
			if(item.value === "CITY_CD_16"){ item.groupDescription = '' }
			index = index + 1;
			if (index === detailDto.areas.length) areaText += item.groupDescription + ' ' + item.description;
			else areaText += item.groupDescription + ' ' + item.description + ', ';
		});

		$wrapper.find('#area').text(areaText);
	}

	// 주력공사 DRAW
	if (detailDto.constructions !== null && detailDto.constructions.length > 0) {
		$.each(detailDto.constructions, function(index, item) {
			index = index + 1;
			if (index === detailDto.constructions.length) detailText += item.description;
			else detailText += item.description + '/';
		});

		$wrapper.find('#detail-construct').text(detailText);
	}
};

var drawMoreImages = function(dto) {
	if (dto !== null && dto.attachments !== null && dto.attachments.length > 0) {
		var $wrapper = $('.infoImg_box .img_lst');

		// Init
		$wrapper.find('.item').remove();
		$wrapper.closest('.img_box').find('.more_view').css({'display': 'none'});

		$.each(dto.attachments, function(index, f) {
			if (f.fullUri === "null" || f.fullUri === null || f.position !== 4) return ;

			var tag = '<div class="item">' +
				'<div class="img"></div>' +
				'</div>';

			$wrapper.append(tag);
			$wrapper.find('.item .img').last().css({'background':'url(' + f.thumbnailPath + ')', 'background-repeat': 'no-repeat', 'background-position':'50% 50%'});
		});

		$wrapper.find('.item').css({'display': 'inline-block'});
	}
};
