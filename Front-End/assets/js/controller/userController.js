$(window).ready(function () {
    loadAllCountries();
});

/*============================================= user account =============================================*/
let user_post_count=[];
function getUserPosts() {
    $.ajax({
        url: base_url + "/user/posts?user_id=" + user_id+"&post_count="+user_post_count.length,
        method: "get",
        async: false,
        success: function (resp) {
            user_post_count=resp.data;
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
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

function getUserDetails() {
    $.ajax({
        url: base_url + "/user/details?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data[0]);
            setDetailsForProfile(resp.data[0]);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function setDetailsForProfile(user) {
    $("#cover-img").css("background", `url(${user.cover_photo})`);
    $("#cover-img").css("backgroundSize", `cover`);
    $("#cover-img").css("backgroundPosition", `center`);

    $("#dp-img").css("background", `url(${user.profile_photo})`);
    $("#dp-img").css("backgroundSize", `cover`);
    $("#dp-img").css("backgroundPosition", `center`);

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
$("#signin-btn").click(function () {
    let email = $("#sign-in-email").val();
    let password = $("#sign-in-password").val();
    searchPassword(email, password);
});

function searchPassword(email, password) {
    $.ajax({
        url: base_url + "/login?email=" + email + "&password=" + password,
        method: "get",
        success: function (resp) {
            getUserId(email);
            if (resp.data) {
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
    $.ajax({
        url: base_url + "/user/last/following/id",
        method: "get",
        async: false,
        success: function (resp) {
            generateNextFollowingId(resp.data);
        },
        error: function (resp) {

        }
    })
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