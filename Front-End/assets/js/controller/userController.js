function getLastFollowingId() {
    $.ajax({
        url: base_url + "/user/last/following/id",
        method: "get",
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
        success: function (resp) {
            generateNextFollowerId(resp.data);
        },
        error: function (resp) {

        }
    })
}
function getLastUserId() {
    $.ajax({
        url: base_url + "/user/last/user/id",
        method: "get",
        success: function (resp) {
            generateNextUserId(resp.data);
        },
        error: function (resp) {

        }
    })
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