$(window).ready(function () {
    loadAllCountries();
    saveReaction();
});

let base_url = "http://localhost:8080";
let user_id;
let user_email;
let user_profile_photo;
let user_cover_photo;
let user_name;
let user_headline;

/*========================================= profile =================================*/
$("#edit-details-btn").click(function () {
    $("#update-profile-details-name").val(user_name);
    $("#update-profile-details-address").val($("#location").text());
    $("#update-profile-details-youtube").val($("#youtube-link").text());
    $("#update-profile-details-headline").val($("#headline").text());
});

$("#update-profile-details-form-btn").click(function () {
    updateProfileDetails();
});

$("#update-cover-photo-save-btn").click(function () {
    updateProfileCoverPhoto();
});

$("#update-profile-photo-save-btn").click(function () {
    updateProfilePhoto();
});

/*=========================================signIn, signUp, getDetails form navigation=================================*/
$("#signin-btn").click(function () {
    let email = $("#sign-in-email").val();
    let password = $("#sign-in-password").val();
    searchPassword(email, password);
});

$("#signup-btn").click(function () {
    $("#sign-up-section").css("display", "none");
    $("#get-details-section").css("display", "flex");
});

$("#signup-get-details-next-btn").click(function () {
    let name = $("#signup-get-details-full-name").val();
    let country = $("#signup-get-details-country").val();
    let contact = $("#signup-get-details-contact").val();
    let gender = $("input[name='gender']:checked").val();
    saveUser(name, country, contact, gender);
});

$("#signup-get-details-skip-btn").click(function () {
    saveUser();
});

$("#signin-to-signup-btn").click(function () {
    $("#sign-in-section").css("display", "none");
    $("#sign-up-section").css("display", "flex");
});

$("#signup-to-signin-btn").click(function () {
    $("#sign-in-section").css("display", "flex");
    $("#sign-up-section").css("display", "none");
});

$("#file-input-in-post-module").click(function () {
    $("#post-txt").css("height", "100px");
    $("#post-txt").css("border", "none");
    $("#post-media").css("display", "block");

})

/*=========================================page radio button navigation=================================*/
$("#radio-1").click(function () {
    $("#page-activity-section").css("display", "flex");
    $("#page-about-section,#page-event-section").css("display", "none");
});
$("#radio-2").click(function () {
    $("#page-activity-section,#page-event-section").css("display", "none");
    $("#page-about-section").css("display", "flex");

});
$("#radio-3").click(function () {
    $("#page-activity-section,#page-about-section").css("display", "none");
    $("#page-event-section").css("display", "flex");
});

/*====================================home,users,notification,profile and page navigation=============================*/
$("#nav-home").click(function () {
    $("#followed-page-section,#posts-shared-section,#recommendation-section").css("display", "flex");
    $("#page-section,#user-section,#notifications-section,#profile-section").css("display", "none");
});

$("#nav-users").click(function () {
    $("#followed-page-section,#user-section").css("display", "flex");
    $("#page-section,#posts-shared-section,#recommendation-section,#notifications-section,#profile-section").css("display", "none");
    getNotFollowers();
    followBtnEvent();
});

$("#nav-notification").click(function () {
    $("#followed-page-section,#notifications-section").css("display", "flex");
    $("#page-section,#posts-shared-section,#recommendation-section,#user-section,#profile-section").css("display", "none");
});

$("#nav-profile").click(function () {
    $("#page-section,#followed-page-section,#posts-shared-section,#user-section,#notifications-section").css("display", "none");
    $("#profile-section,#recommendation-section").css("display", "flex");
    getUserDetails();
    getUserPostCount();
    getUserFollowingCount();
    getUserFollowersCount();
    getUserPosition();
    getUserPosts();
});

$("#addBtn").click(function () {
    $("#page-section,#recommendation-section").css("display", "flex");
    $("#profile-section,#followed-page-section,#posts-shared-section,#user-section,#notifications-section").css("display", "none");
    // $("#exampleModal").modal("hide");
});

$("#user-view-btn").click(function () {
    $("#follow-btn-div,#more-btn-div,#follow-btn,#more-btn").css("display", "block")
    $("#user-view-btn-div,#edit-details-btn-div,#user-view-btn,#edit-details-btn").css("display", "none")
});

$("#follow-btn").click(function () {
    $("#follow-btn-div,#follow-btn").css("display", "none")
    $("#unfollow-btn-div,#unfollow-btn").css("display", "block")
});

$("#unfollow-btn").click(function () {
    $("#follow-btn-div,#follow-btn").css("display", "block")
    $("#unfollow-btn-div,#unfollow-btn").css("display", "none")
});


$("#page-to-profile-btn").click(function () {
    $("#page-section,#followed-page-section,#posts-shared-section,#user-section,#notifications-section").css("display", "none");
    $("#profile-section,#recommendation-section").css("display", "flex");
});

/*================Create Page Image Show Part=================*/
PageImageShow();

function PageImageShow() {
    $(document).ready(function () {
        $("#inputGroupFile,#file-input-in-post-module,#update-cover-photo-form-file-chooser,#update-profile-photo-form-file-chooser").on("change", function () {
            const files = this.files;
            let id = $(this).attr("id");
            let div_id = getDivId(id);
            console.log(div_id);
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
        case "update-cover-photo-form-file-chooser":
            return "update-cover-photo-show";
        case "update-profile-photo-form-file-chooser":
            return "update-profile-photo-show";
    }
}