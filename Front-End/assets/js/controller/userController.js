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

function generateNextUserId(currentId) {
    if (currentId === null) {
        return "USER-1";
    } else {
        return "USER-" + (Number(currentId.slice(5)) + 1);
    }
}