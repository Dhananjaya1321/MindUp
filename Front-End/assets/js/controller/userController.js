/*============================================= user account =============================================*/
function setPostsForUserActivitySection() {
    for (let i in user_posts) {
        let reactions = getReactionsOfPost(user_posts[i].post_id);
        let reaction = `<small>No reactions</small>`;
        if (reactions.length > 0) {
            reaction = `<div class="first-reacted-user"></div><!--first reacted user-->
                      <div class="second-reacted-user"></div><!--second reacted user-->
                      <div class="other-reacted-users">
                          <small>
                              <span class="first-reacted-user-name">${reactions[0].name}</span>
                              <span class="second-reacted-user-name">${reactions[1].name}</span>
                              and others <a href="#"><span class="other-reaction-count">${reactions.length - 2}</span></a>
                          </small>
                      </div>`
            $("#first-reacted-user").css("background", `url(${reactions[0].profile_photo})`);
            $("#second-reacted-user").css("background", `url(${reactions[1].profile_photo})`);
            $("#first-reacted-user,#second-reacted-user").css("backgroundPosition", "center");
            $("#first-reacted-user,#second-reacted-user").css("backgroundSize", "cover");
        }

        let post = `<div id="${user_posts[i].post_id}" style="border: 1px solid #e5e5e5;" class="post flex f-col">
                    <div class="posted-account-details f-row">
                        <div class="user-or-page-dp"></div><!--user or page DP-->
                        <div class="user-or-page-details">
                            <h3>${user_name}</h3>
                            <p>${user_headline}</p>
                            <small class="posted-time">Just Now <i class="fa-solid fa-earth-americas"></i></small>
                        </div><!--user or page details-->
                    </div><!--posted account or page details-->
                    <div class="post-content">
                        <p>${user_posts[i].post_text}</p>
                    </div><!--post content-->
                    <div class="post-media"></div><!--image or video content of post-->
                    <div class="post-reaction-bar"></div><!--who are the react this post-->
                    <div class="horizontal-line"></div>
                    <div class="post-reaction-bar">
                        <button class="heart-react"><i class="fa-regular fa-heart"></i></button>
                    </div><!--heart reaction button here-->
            </div>`

        $("#user-or-page-dp").css("background", `url(${user_profile_photo})`);
        $("#user-or-page-dp").css("backgroundPosition", "center");
        $("#user-or-page-dp").css("backgroundSize", "cover");
        $(`#${user_posts[i].post_id} > div:nth-child(4)`).append(reaction);
        $("#profile-activity-section>section").append(post);
    }
}

function getUserPosition() {
    $.ajax({
        url: base_url + "/user/position?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            for (let i in resp.data) {
                let position =
                    `<div class="position flex f-col">
                        <div class="flex f-row">
                            <div class="position-page-img"></div>
                            <div class="position-details flex f-col">
                                <h3>${resp.data[i].company_name}</h3><!--organisation name-->
                                <h4>${resp.data[i].position}</h4><!--position-->
                                <p>${resp.data[i].start_date}-${resp.data[i].end_date}</p><!--time period-->
                            </div>
                        </div>
                        <div class="flex f-row">
                            <!--                        <div class="vertical-line"></div>-->
                            <p>${resp.data[i].description}</p>
                        </div><!--description-->
                    </div>`;

                $("#profile-positions-section>section").append(position);
            }
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}

function getUserPostCount() {
    $.ajax({
        url: base_url + "/user/post/count?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            $("#post-count>h3:nth-child(1)").text(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}

function getUserFollowersCount() {
    $.ajax({
        url: base_url + "/user/followers/count?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            $("#followers-count>h3:nth-child(1)").text(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}

function getUserFollowingCount() {
    $.ajax({
        url: base_url + "/user/following/count?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            $("#following-count>h3:nth-child(1)").text(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}

function getNotFollowers() {
    $.ajax({
        url: base_url + "/user/not/followers?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data);
            for (let i in resp.data) {
                let user = resp.data[i];
                let headline = truncateParagraph(user.headline, 101);
                let userForFollow = `<div class="user flex f-col">
                                        <div id="user-cover-photo-${user.user_id}" class="user-cover-photo"></div><!--cover photo-->
                                        <div class="user-dp flex">
                                            <div class="flex">
                                                <div id="profile-photo-${user.user_id}" class="profile-photo"></div>
                                            </div>
                                        </div><!--profile photo-->
                                        <div class="user-summary flex f-col">
                                            <h4 class="user-name">${user.name}</h4>
                                            <p class="user-about">
                                                ${headline}
                                            </p>
                                        </div><!--about-->
                                        <div class="flex user-follow-btn-div">
                                                <button id="user-${user.user_id}" class="user-follow-btn">Follow</button>
                                        </div><!--follow button-->
                                 </div><!--user-->`
                $("#popular-peoples-section>section").append(userForFollow);

                if (user.cover_photo !== null) {
                    $(`#user-cover-photo-${user.user_id}`).css("background", `url(${user.cover_photo})`);
                }
                if (user.profile_photo !== null) {
                    $(`#profile-photo-${user.user_id}`).css("background", `url(${user.profile_photo})`);
                }
                $(`#user-cover-photo-${user.user_id}, #profile-photo-${user.user_id}`).css("backgroundPosition", "center");
                $(`#user-cover-photo-${user.user_id}, #profile-photo-${user.user_id}`).css("backgroundSize", "cover");

            }
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function followBtnEvent() {
    $(".user-follow-btn").click(function () {
        /*this user id like user-user-1*/
        let btnId = $(this).attr("id").substring(5);/*remove user- and get to user-1*/
        console.log(btnId);
        checkBeforeToFollowUser(btnId);
    });
}

function checkBeforeToFollowUser(other_user_id) {
    $.ajax({
        url: base_url + "/user/check/follow?user_id=" + user_id + "&other_user_id=" + other_user_id,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}

function followUser(other_user_id) {
    let following = {
        "following_id": getLastFollowingId(),
        "other_user_id": other_user_id,
        "user": {
            "user_id": user_id
        },
    }
    $.ajax({
        url: base_url + "/user/follow?user_id=" + user_id + "&other_user_id=" + other_user_id,
        method: "post",
        data: JSON.stringify(following),
        contentType: "application/json",
        async: false,
        success: function (resp) {
            $(`#${other_user_id}`).text("Following");
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}


function getUserDetails() {
    $.ajax({
        url: base_url + "/user/details?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data[0]);
            user_profile_photo = resp.data[0].profile_photo;
            user_cover_photo = resp.data[0].cover_photo;
            user_name = resp.data[0].name;
            user_headline = truncateParagraph(resp.data[0].headline, 62);
            setDetailsForProfile(resp.data[0]);
            setDetailsForHomePage(resp.data[0]);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function setDetailsForHomePage(user) {
    if (user.cover_photo !== null) {
        $("#profile-summary-cover-photo").css("background", `url(${user.cover_photo})`);
        $("#profile-summary-cover-photo").css("backgroundSize", `cover`);
        $("#profile-summary-cover-photo").css("backgroundPosition", `center`);
    }

    if (user.profile_photo !== null) {
        $("#profile-photo,#profile-photo-of-create-post-section").css("background", `url(${user.profile_photo})`);
        $("#profile-photo,#profile-photo-of-create-post-section").css("backgroundSize", `cover`);
        $("#profile-photo,#profile-photo-of-create-post-section").css("backgroundPosition", `center`);
    }

    if (user.name !== null) {
        $("#user-name").text(`${user.name}`);
    }

    if (user.headline !== null) {
        $("#about").text(truncateParagraph(`${user.headline}`, 101));
    }
}

function truncateParagraph(paragraph, maxLength) {
    if (paragraph.length > maxLength) {
        return paragraph.substring(0, maxLength) + '...';
    }
    return paragraph;
}

function setDetailsForProfile(user) {
    if (user.cover_photo !== null) {
        $("#cover-img").css("background", `url(${user.cover_photo})`);
        $("#cover-img").css("backgroundSize", `cover`);
        $("#cover-img").css("backgroundPosition", `center`);
    }

    if (user.profile_photo !== null) {
        $("#dp-img").css("background", `url(${user.profile_photo})`);
        $("#dp-img").css("backgroundSize", `cover`);
        $("#dp-img").css("backgroundPosition", `center`);
    }

    /*==================================================================*/
    if (user.page_id !== null) {
        $("#page-btn>button").attr("id", "create-page");
    } else {
        $("#page-btn>button").remove();
        let btn = `
            <button id="${user.page_id}" class="flex f-col" data-bs-toggle="modal" data-bs-target="#exampleModal">
                 <div id="page-btn-img" style="background: url(${user.page_profile_photo}); background-size: cover; background-position: center"></div>
                 ${user.page_name}
            </button>`
        $("#page-btn").append(btn);

    }
    /*==================================================================*/
    if (user.name !== null) {
        $("#name").text(`${user.name}` + " ");
    }
    if (user.verified_or_not !== "verified") {
        $("#verify-img").css("display", "none");
    } else {
        $("#verify-img").css("display", "block");
    }
    if (user.username !== null) {
        $("#username").text("(" + `${user.username}` + ")");
    }

    /*==================================================================*/
    if (user.address !== null) {
        $("#location").text(`${user.address}`);
    }
    if (user.country !== null) {
        $("#location").text(`${user.country}`);
    }
    if (user.country !== null && user.address !== null) {
        $("#location").text(`${user.country}, ${user.address}`);
    }
    if (user.country === null && user.address === null) {
        $("#location-img").css("display", "none");
    } else {
        $("#location-img").css("display", "block");
    }

    /*==================================================================*/
    if (user.headline !== null) {
        $("#headline").text(`${user.headline}`);
    }
    /*==================================================================*/
    if (user.youtube_channel !== null) {
        $("#youtube-link").append(`<a href="${user.youtube_channel}">youtube channel <img src="assets/images/youtube_.png"></a>`);
    }


}


/*=============================================== sign-in ================================================*/
function searchPassword(email, password) {
    $.ajax({
        url: base_url + "/login?email=" + email + "&password=" + password,
        method: "get",
        success: function (resp) {
            getUserId(email);
            if (resp.data) {
                getUserDetails();
                $("#login-main").css("display", "none");
                $("#nav-bar, #home-main").css("display", "flex");
            } else {
                $("#sign-in-email").val("");
                $("#sign-in-password").val("");
            }
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function getUserId(email) {
    $.ajax({
        url: base_url + "/user?email=" + email,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data);
            user_id = resp.data;
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
}


/*=================================== load all counties for sign-up form =================================*/
let countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "CAR", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "DRC",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "Salvador", "Equatorial",
    "Eritrea", "Estonia", "Swaziland", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New-Zealand", "Nicaragua", "Niger", "Nigeria", "North-Korea", "North-Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine-State", "Panama", "Papua-New-Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint-Lucia", "Samoa", "San Marino", "Saudi-Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra-Leone", "Singapore", "Slovakia", "Slovenia", "Solomon-Islands", "Somalia",
    "South-Africa", "South-Korea", "South-Sudan", "Spain", "Sri-Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "UAE", "UK", "USA", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe",
];

function loadAllCountries() {
    for (let i = 0; i < countries.length; i++) {
        $("#signup-get-details-country").append(`<option value=${countries[i]}>${countries[i]}</option>`);
    }
}


/*=============================================== sign-up ================================================*/
function saveUser(name, country, contact, gender) {
    let email = $("#sign-up-email").val();
    let password = $("#sign-up-password").val();
    let userid = getLastUserId();
    let data;
    if (name !== null) {
        data = {
            "user_id": userid,
            "name": name,
            "country": country,
            "contact": contact,
            "gender": gender,
            "login": {
                "email": email,
                "password": password,
            },
        }
    } else {
        data = {
            "user_id": userid,
            "login": {
                "email": email,
                "password": password,
            },
        }
    }
    console.log(JSON.stringify(data));

    $.ajax({
        url: base_url + "/user",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (resp) {
            user_id = userid;
            getUserDetails();
            $("#login-main").css("display", "none");
            $("#nav-bar, #home-main").css("display", "flex");
            // alert(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}


/*================================== get last id's and generate next id ==================================*/
function getLastPositionId() {
    $.ajax({
        url: base_url + "/user/last/position/id",
        method: "get",
        async: false,
        success: function (resp) {
            generateNextPositionId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function getLastFollowingId() {
    let last_following_id;
    $.ajax({
        url: base_url + "/user/last/following/id",
        method: "get",
        async: false,
        success: function (resp) {
            last_following_id = generateNextFollowingId(resp.data);
        },
        error: function (resp) {

        }
    })
    return last_following_id;
}

function getLastFollowerId() {
    $.ajax({
        url: base_url + "/user/last/follower/id",
        method: "get",
        async: false,
        success: function (resp) {
            generateNextFollowerId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function getLastUserId() {
    let userID;
    $.ajax({
        url: base_url + "/user/last/user/id",
        method: "get",
        async: false,
        success: function (resp) {
            userID = generateNextUserId(resp.data);
        },
        error: function (resp) {

        }
    });
    return userID;
}

function generateNextPositionId(currentId) {
    if (currentId === null) {
        return "POSN-1";
    } else {
        return "POSN-" + (Number(currentId.slice(5)) + 1);
    }
}

function generateNextFollowingId(currentId) {
    if (currentId === null) {
        return "FWNG-1";
    } else {
        return "FWNG-" + (Number(currentId.slice(5)) + 1);
    }
}

function generateNextFollowerId(currentId) {
    if (currentId === null) {
        return "FWER-1";
    } else {
        return "FWER-" + (Number(currentId.slice(5)) + 1);
    }
}

function generateNextUserId(currentId) {
    if (currentId === null) {
        return "USER-1";
    } else {
        return "USER-" + (Number(currentId.slice(5)) + 1);
    }
}