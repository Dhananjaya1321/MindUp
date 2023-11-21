let base_url="http://localhost:8080";

$("#file-input-in-post-module").click(function () {
    $("#post-txt").css("height", "100px");
    $("#post-txt").css("border", "none");
    $("#post-media").css("display", "block");

})

$("#radio-1").click(function () {
    $("#page-activity-section").css("display", "flex");
    $("#page-about-section").css("display", "none");
    $("#page-event-section").css("display", "none");
});
$("#radio-2").click(function () {
    $("#page-activity-section").css("display", "none");
    $("#page-about-section").css("display", "flex");
    $("#page-event-section").css("display", "none");
});
$("#radio-3").click(function () {
    $("#page-activity-section").css("display", "none");
    $("#page-about-section").css("display", "none");
    $("#page-event-section").css("display", "flex");
});


$("#nav-home").click(function () {
    $("#page-section").css("display", "none");
    $("#followed-page-section").css("display", "flex");
    $("#posts-shared-section").css("display", "flex");
    $("#recommendation-section").css("display", "flex");
    $("#user-section").css("display", "none");
    $("#notifications-section").css("display", "none");
    $("#profile-section").css("display", "none");
});

$("#nav-users").click(function () {
    $("#page-section").css("display", "none");
    $("#followed-page-section").css("display", "flex");
    $("#posts-shared-section").css("display", "none");
    $("#recommendation-section").css("display", "none");
    $("#user-section").css("display", "flex");
    $("#notifications-section").css("display", "none");
    $("#profile-section").css("display", "none");
});

$("#nav-notification").click(function () {
    $("#page-section").css("display", "none");
    $("#followed-page-section").css("display", "flex");
    $("#posts-shared-section").css("display", "none");
    $("#recommendation-section").css("display", "none");
    $("#user-section").css("display", "none");
    $("#notifications-section").css("display", "flex");
    $("#profile-section").css("display", "none");
});

$("#nav-profile").click(function () {
    $("#page-section").css("display", "none");
    $("#profile-section").css("display", "flex");
    $("#followed-page-section").css("display", "none");
    $("#posts-shared-section").css("display", "none");
    $("#recommendation-section").css("display", "flex");
    $("#user-section").css("display", "none");
    $("#notifications-section").css("display", "none");
});

$("#addBtn").click(function () {
    $("#page-section").css("display", "flex");
    $("#profile-section").css("display", "none");
    $("#followed-page-section").css("display", "none");
    $("#posts-shared-section").css("display", "none");
    $("#recommendation-section").css("display", "flex");
    $("#user-section").css("display", "none");
    $("#notifications-section").css("display", "none");
    $("#exampleModal").modal("hide");
});

$("#user-view-btn").click(function () {
    $("#follow-btn-div").css("display", "block")
    $("#more-btn-div").css("display", "block")
    $("#user-view-btn-div").css("display", "none")
    $("#edit-details-btn-div").css("display", "none")
    $("#follow-btn").css("display", "block")
    $("#more-btn").css("display", "block")
    $("#user-view-btn").css("display", "none")
    $("#edit-details-btn").css("display", "none")
});

$("#follow-btn").click(function () {
    $("#follow-btn-div").css("display", "none")
    $("#unfollow-btn-div").css("display", "block")
    $("#follow-btn").css("display", "none")
    $("#unfollow-btn").css("display", "block")
});

$("#unfollow-btn").click(function () {
    $("#follow-btn-div").css("display", "block")
    $("#unfollow-btn-div").css("display", "none")
    $("#follow-btn").css("display", "block")
    $("#unfollow-btn").css("display", "none")
});


$("#page-to-profile-btn").click(function () {
    $("#page-section").css("display", "none");
    $("#profile-section").css("display", "flex");
    $("#followed-page-section").css("display", "none");
    $("#posts-shared-section").css("display", "none");
    $("#recommendation-section").css("display", "flex");
    $("#user-section").css("display", "none");
    $("#notifications-section").css("display", "none");
});

/*================Create Page Image Show Part=================*/
PageImageShow();

function PageImageShow() {
    $(document).ready(function () {
        $("#inputGroupFile,#file-input-in-post-module").on("change", function () {
            const files = this.files;
            let id = $(this).attr("id");
            let div_id = getDivId(id);
            if (files.length > 0) {
                $("#" + div_id).css("background", `url(${URL.createObjectURL(files[0])})`);
                $("#" + div_id).css("backgroundPosition", "center");
                $("#" + div_id).css("backgroundSize", "cover");
            }
        });
    });
}

function getDivId(id) {
    switch (id) {
        case "inputGroupFile":
            return "Page_Image_Show";
        case "file-input-in-post-module":
            return "post-media";
    }
}