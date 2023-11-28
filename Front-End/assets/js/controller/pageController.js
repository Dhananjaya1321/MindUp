function getLastPageId() {
    $.ajax({
        url: base_url + "/page/last/page/id",
        method: "get",
        success: function (resp) {
            generateNextPageId(resp.data);
        },
        error: function (resp) {

        }
    })
}

function generateNextPageId(currentId) {
    if (currentId === null) {
        return "PAGE-1";
    } else {
        return "PAGE-" + (Number(currentId.slice(5)) + 1);
    }
}