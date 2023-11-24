$("#signin-btn").click(function () {
    let email = $("#sign-in-email").val();
    let password = $("#sign-in-password").val();
    console.log(email, password)
    searchPassword(email, password);
});

function searchPassword(email, password) {
    $.ajax({
        url: base_url + "/login?email=" + email + "&password=" + password,
        method: "get",
        success: function (resp) {
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
    let user_id = getLastUserId();
    let data;
    if (name !== null) {
        data = {
            "user_id": user_id,
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
            "user_id": user_id,
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
            $("#login-main").css("display", "none");
            $("#nav-bar, #home-main").css("display", "flex");
            // alert(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}


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