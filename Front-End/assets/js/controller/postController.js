function getLastReactionId() {
    $.ajax({
        url: base_url + "/post/last/reaction/id",
        method: "get",
        success: function (resp) {
            generateNextReactionId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function getLastPostId() {
    $.ajax({
        url: base_url + "/post/last/post/id",
        method: "get",
        success: function (resp) {
            generateNextPostId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function generateNextReactionId(currentId) {
    if (currentId === null) {
        return "RECT-1";
    } else {
        return "RECT-" + (Number(currentId.slice(5)) + 1);
    }
}

function generateNextPostId(currentId) {
    if (currentId === null) {
        return "POST-1";
    } else {
        return "POST-" + (Number(currentId.slice(5)) + 1);
    }
}