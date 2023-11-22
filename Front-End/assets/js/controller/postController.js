function getLastPostId() {
    $.ajax({
        url: base_url + "/post/last/post/id",
        method: "get",
        success: function (resp) {
            generateNextUserId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function generateNextPostId(currentId) {
    if (currentId === null) {
        return "POST-1";
    } else {
        return "POST-" + (Number(currentId.slice(5)) + 1);
    }
}