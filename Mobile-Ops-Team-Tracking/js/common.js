$(document).ready(function () {


    //only required for home page, so that added in if condition
    if ($(".form-container").length) {

        //for set drop down data
        var opsData = {};
        opsData.opName = ["Mahendra Travels-1234", "Shrinath Travels-4549", "Ravi MultaniSona Travels (Neemuch)..", "Sheetal Travels-1234", "Neeta Travels-1234", "Babu Travels - 1234", "Laxmi Travels - 11604", "Rathore Travels-4570", "Shree Samrth Travel-12334", "Vijay Tour And Travels-1234", "Gujarat Travels-1234", "Sundesha Travels-1234", "Neeta Travels-1234"];

        //for start time data array
        opsData.startTime = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 4; j++) {
                var hours = i;
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                var min = j === 0 ? "00" : j * 15;
                var strTime = hours + ':' + min + ' ' + ampm;
                opsData.startTime.push(strTime);
            }
        }

        //for duration in minute data array
        opsData.durInMin = [];
        var totMin = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 4; j++) {
                //var min = (i === 0 && j === 0) ? 0 :  15;
                var min = 15;
                totMin += min;
                opsData.durInMin.push(totMin + '');
            }
        }

        var hasTransformSupport = (function () {
            var div = document.createElement('div');
            return (div.style.transform !== undefined ||
                div.style.webkitTransform !== undefined ||
                div.style.MozTransform !== undefined ||
                div.style.OTransform !== undefined ||
                div.style.msTransform !== undefined) &&
                navigator.userAgent.indexOf('Opera Mini') === -1;
        })();

        //for show slide-menu
        $(".homepage-menu-icon").click(function () {
            $('.slide-menu').toggle("slow");
        });

        //for hide slide-menu
        $(".close").click(function () {
            $('.slide-menu').toggle("slow");
        });

        //for toggle active call type radio button
        $(".call-type-input input[class='custome_radio']").on("click", function () {
            $(".call-type-input").removeClass("active_custome_radio");
            $(this).parent("div").addClass("active_custome_radio");
        });

        //for hide all list
        function hideAllLists() {
            $(".slide-list-header").hide();
            $(".slidelist").hide();
        }

        //for operator name drop down list
        $("#txtOperatorName").on("click", function () {
            hideAllLists();
            $(".operatorNameSearch").show();
            $("#txtsOperatorName").focus();
            $(".slide-list-contain").addClass("show-slide-list");
        });

        //for start time drop down list
        $("#txtStartTime").on("click", function () {
            hideAllLists();
            $(".startTimeSearch").show();
            $("#txtsStartTime").focus();
            $(".slide-list-contain").addClass("show-slide-list");
        });

        //for duration drop down list
        $("#txtDuration").on("click", function () {
            hideAllLists();
            $(".durationInMinSearch").show();
            $("#txtsDuration").focus();
            $(".slide-list-contain").addClass("show-slide-list");
        });

        $(".sl-back-icon").on("click", function () {
            $(".slide-list-contain").removeClass("show-slide-list");
        });

        //for show calender
        $("#txtStartDate").on("click", function () {
            $("#calSlide1").addClass("active");
        });

        $("#closeBtn1").click(function (e) {
            $("#calSlide1").removeClass("active");
        });

        function callBackFn(e, value, close) {

            if ($(this).parent().hasClass('operatorNameSearch')) {
                $('#txtOperatorName').val(value);
            } else if ($(this).parent().hasClass('startTimeSearch')) {
                $('#txtStartTime').val(value);
            } else if ($(this).parent().hasClass('durationInMinSearch')) {
                $('#txtDuration').val(value);
            }

            if (close) {
                $(".slide-list-contain").removeClass("show-slide-list");
                return;
            }
        }

        $.fn.setAutoComplete = function (acData1, acData2, callback, appendTo) {

            var _that = this,
                documentFragment = document.createDocumentFragment(),
                ulElem,
                searchResultsElem,
                keyEvntTimeout,
                hoverEvntTimeout,
                acData2 = acData2 || [],
                selectedInp, selectedText;

            function initAutoCompleteFn() {
                var class_name = hasTransformSupport ? 'sites-atc-city-matched sites-transform-support' : 'sites-atc-city-matched';
                if (appendTo !== undefined) {

                    searchResultsElem = $(appendTo).append('<form class="' + class_name + '"></form>').find('.sites-atc-city-matched');
                } else {
                    searchResultsElem = $('<form class="' + class_name + '"></form>').insertAfter(_that);
                }
                findMatchingItem(acData1, $(_that), acData2);
            }

            function findMatchingItem(acData1, formElement, acData2) {
                var escapedText = formElement.val().replace(/(?!\s)\W/g, "").replace(/^\s+/, ""),
                    pmatchIndex = 0,
                    matchIndex = 0,
                    isInpEmpty = (escapedText.length === 0);
                ulElem = document.createElement('ul');
                documentFragment.appendChild(ulElem);
                clearUlElemFn(ulElem);

                if (acData2.length > 0 && isInpEmpty) {
                    acData2.map(function (value, key) {
                        var liElem,
                            selectedTextRegEx = new RegExp("^" + selectedText + "$", 'i'),
                            replacedVal = value.replace(/(?!\s)\W/g, "").replace(/^\s+/, "");
                        liElem = document.createElement('li');
                        liElem.className = 'sites-atc-city-search';
                        liElem.title = capitalizeFirstLetterFn(value);
                        if (!selectedTextRegEx.test(replacedVal)) {
                            liElem.innerHTML = "<label><label class=\"sites-radio sites-radio-blue\">" +
                                "<input type=\"radio\" name=\"destPop\" value=\"true\"/><i></i></label><span>" + capitalizeFirstLetterFn(value) + "</span></label>";
                        } else {
                            liElem.innerHTML = "<label><label class=\"sites-radio sites-radio-blue\">" +
                                "<input type=\"radio\" name=\"destPop\" value=\"true\" checked /><i></i></label><span> " + capitalizeFirstLetterFn(value) + "</span></label>";
                        }
                        if (pmatchIndex === 0) {
                            //liElem.className += ' sites-atc-popular-results sites-atc-search-highlighted';
                        }
                        ulElem.appendChild(liElem);
                        pmatchIndex++;
                    });
                }

                if (!isInpEmpty && acData1.length > 0) {
                    acData1.map(function (value, key) {
                        var liElem,
                            regex = new RegExp("^" + escapedText, 'i'),
                            selectedTextRegEx = new RegExp("^" + selectedText + "$", 'i'),
                            replacedVal = value.replace(/(?!\s)\W/g, "").replace(/^\s+/, "");
                        if (regex.test(replacedVal)) {
                            liElem = document.createElement('li');
                            liElem.className = 'sites-atc-city-search';
                            liElem.title = capitalizeFirstLetterFn(value);
                            if (!selectedTextRegEx.test(replacedVal)) {
                                liElem.innerHTML = "<label><label class=\"sites-radio sites-radio-blue\">" +
                                    "<input type=\"radio\" name=\"destAll\" value=\"true\"/><i></i></label><span> " + capitalizeFirstLetterFn(value) + "</span></label>";
                            } else {
                                liElem.innerHTML = "<label><label class=\"sites-radio sites-radio-blue\">" +
                                    "<input type=\"radio\" name=\"destAll\" value=\"true\" checked /><i></i></label><span> " + capitalizeFirstLetterFn(value) + "</span></label>";
                            }
                            if ((!isInpEmpty || acData2.length === 0) && matchIndex === 0) {
                                liElem.className += ' sites-atc-search-highlighted';
                            } else if (matchIndex === 0) {
                                liElem.className += ' sites-atc-all-results';
                            }
                            ulElem.appendChild(liElem);
                            matchIndex++;
                        }
                    });
                }
                searchResultsElem.html(documentFragment);
            }

            function capitalizeFirstLetterFn(string) {
                return string
                    .replace(/(^\w)/, function (l) {
                        return l.toUpperCase();
                    });
            }

            function onKeyEventsFn(e) {
                var that = this,
                    key = e.keyCode || e.which;
                clearTimeout(keyEvntTimeout);
                keyEvntTimeout = setTimeout(function () {
                    if (key !== 38 && key !== 40) {
                        findMatchingItem(acData1, $(_that), acData2);
                    }
                }, 300);
            }

            function showSearchResultsIfEmpty(searchResults) {
                if (searchResults.length === 0) {
                    findMatchingItem(acData1, $(_that), acData2);
                    return true;
                }
                return false;
            }

            function clearUlElemFn(ulElem) {
                if (ulElem && 'innerHTML' in ulElem) {
                    ulElem.innerHTML = "";
                }
            }

            initAutoCompleteFn();

            $(_that).bind({
                'keyup': onKeyEventsFn,
                'focus': function () {
                    findMatchingItem(acData1, $(_that), acData2);
                },
                'blur': function (e) {
                    var that = this;

                },
                'swap': function (e, enteredValInSwapElem, value) {
                    selectedText = value.replace(/(?!\s)\W/g, "").replace(/^\s+/, "");
                    $(_that).val(enteredValInSwapElem);
                    findMatchingItem(acData1, $(_that), acData2);
                }
            })

            $(_that).closest(".sites-slide-destination-blk").find('.sites-slide-destination-clear').click(function (e) {
                $(_that).val("").focus();
                selectedText = "";
                findMatchingItem(acData1, $(_that), acData2);
                callback.call(searchResultsElem, e, selectedText);
                cargoLrreset();
            });


            searchResultsElem.delegate('.sites-atc-city-search label', 'click', function (e) {

                selectedInp = $(this);
                selectedText = $(this).text().replace(/(?!\s)\W/g, "").replace(/^\s+/, "");
                if (selectedText == "") return;
                callback.call(searchResultsElem, e, $(this).text().replace(/^\s+/, ""), true);
            });
        };

        initDropDownData();

        var datePicker1 = new Pikaday({
            field: document.getElementById('txtStartDate'),
            firstDay: 1,
            minDate: new Date,
            maxDate: getDateFromToday(90),
            format: "ddd, DD MMM YYYY",
            numberOfMonths: 3,
            bound: !1,
            container: document.getElementById("container1"),
            onSelect: function () {
                $("#calSlide1").removeClass("active");
            }
        });

        function initDropDownData() {
            opsData.opName.sort();
            $(".operatorNameSearch input").setAutoComplete(opsData.opName, opsData.opName, callBackFn, $('#txtOperatorNameList')[0]);
            $(".startTimeSearch input").setAutoComplete(opsData.startTime, opsData.startTime, callBackFn, $('#txtStartTimeList')[0]);
            $(".durationInMinSearch input").setAutoComplete(opsData.durInMin, opsData.durInMin, callBackFn, $('#txtDurationInMinList')[0]);
        }

        function getDateFromToday(no_of_days) {
            var cur = new Date();
            var dateFromToday = new Date();
            dateFromToday.setDate(cur.getDate() + no_of_days);
            return dateFromToday;
        }
    }


    //for toggle tabs content
    $("#write-comment,#view-details").on("click", function () {

        var tabId = $(this).attr("id");

        //for manage active tab
        $(".page-tab").removeClass("active");
        $(this).addClass("active");

        //for mange active tab content area
        $(".page-tabs-content > div").hide();
        $(".page-tabs-content div[class='" + tabId + "']").show();

        //for focus on tab selected
        if (tabId == "write-comment") {
            $(".page-tabs-content div[class='" + tabId + "'] textarea").focus();
        } else {
            $(".page-tabs-content div[class='" + tabId + "'] input:first").focus();
        }

    });

    if ($(".page-content textarea").length) {
        $(".page-content textarea").focus();
    }

    //for back page
    $(".page-back-icon").on("click", function () {
        window.history.back();
    });



});



function focusHandler(obj) {
    var inputId = $(obj).attr("id");
    var labelRef = $(obj).next("label");
    // switch (inputId) {
    //case 'txtQuestion1':
    labelRef.addClass("activeLabel");
    labelRef.removeClass("filled");
    //break;
    //}
}

function blurHandler(obj) {
    var inputId = $(obj).attr("id");
    var labelRef = $(obj).next("label");
    //switch (inputId) {
    //case 'txtQuestion1':
    if ($(obj).val() == '' || $(obj).val() == null) {
        labelRef.removeClass("activeLabel");
    } else {
        labelRef.addClass("filled");
    }
    //break;
    //}
}
