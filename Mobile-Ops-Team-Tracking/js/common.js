$(document).ready(function () {

    $("input[class='custome_radio']").on("click",function(){

        $(".call-type-input").removeClass("active_custome_radio");

        $(this).parent("div").addClass("active_custome_radio");

    });


    $("#write-comment,#view-details").on("click", function () {

        var tabId = $(this).attr("id");

        //for manage active tab
        $(".page-tab").removeClass("active");
        $(this).addClass("active");

        //for mange active tab content area
        $(".page-tabs-content > div").hide();
        $(".page-tabs-content div[class='" + tabId + "']").show();
    });

    $(".page-back-icon").on("click", function () {
        window.history.back();
    });

});