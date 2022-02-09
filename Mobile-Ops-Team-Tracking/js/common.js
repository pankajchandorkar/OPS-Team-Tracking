$(document).ready(function () {

    //for show slide-menu
    $(".homepage-menu-icon").click(function () {
        $('.slide-menu').toggle("slow");
    });

    //for hide slide-menu
    $(".close").click(function () {
        $('.slide-menu').toggle("slow");
    });

    //for toggle active call type radio button
    $("input[class='custome_radio']").on("click", function () {
        $(".call-type-input").removeClass("active_custome_radio");
        $(this).parent("div").addClass("active_custome_radio");
    });

    //for toggle tabs content
    $("#write-comment,#view-details").on("click", function () {

        var tabId = $(this).attr("id");

        //for manage active tab
        $(".page-tab").removeClass("active");
        $(this).addClass("active");

        //for mange active tab content area
        $(".page-tabs-content > div").hide();
        $(".page-tabs-content div[class='" + tabId + "']").show();
    });

    //for back page
    $(".page-back-icon").on("click", function () {
        window.history.back();
    });

    //for hide all list
    function hideAllLists() {
        $(".slide-list-header").hide();
        $(".slidelist").hide();
    }

    //for operator name list
    $("#txtOperatorName").on("click", function () {
        hideAllLists();
        $(".operatorNameSearch").show();
        $("#txtsOperatorName").focus();
        $(".slide-list-contain").addClass("show-slide-list");
    });

    $(".sl-back-icon").click(function () {
        $(".slide-list-contain").removeClass("show-slide-list");
    });

    //for set drop down data
    initDropDownData();

    function initDropDownData(){

        var opsData = {};
        opsData.opName = [{}]


        alert("test");
    }

});