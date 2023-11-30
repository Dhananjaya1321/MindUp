$("#post-post-btn").click(function () {
    saveUserPost();
})
let user_posts=[];

function getUserPosts() {
    $.ajax({
        url: base_url + "/post/posts?user_id=" + user_id+"&post_count="+user_posts.length,
        method: "get",
        async: false,
        success: function (resp) {
            user_posts=resp.data;
            console.log(user_posts)
            setPostsForUserActivitySection();
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}
function getReactionsOfPost(post_id) {
    $.ajax({
        url: base_url + "/post/reacted/users?post_id=" + post_id,
        method: "get",
        async: false,
        success: function (resp) {

        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function saveUserPost() {
    const date = new Date();
    let post_text = $("#post-txt").val();
    let who_can_view = "anyone";
    let data = {
        "post_id": getLastPostId(),
        "dateTime": date.toISOString(),
        "post_text": post_text,
        "who_can_view": who_can_view,
        "user": {"user_id": user_id},
    }
    let fileInput = $("#file-input-in-post-module")[0];

    if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append("media", fileInput.files[0]);
        formData.append("dto", new Blob([JSON.stringify(data)], {type: "application/json"}));

        $.ajax({
            url: base_url + "/post",
            method: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (resp) {
                clearPostForm();
            },
            error: function (resp) {
                clearPostForm();
            }
        })
    } else {
        if (post_text !== '') {
            $.ajax({
                url: base_url + "/post/without/media",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (resp) {
                    clearPostForm();
                },
                error: function (resp) {
                    clearPostForm();
                }
            })
        }
    }

}

function clearPostForm() {
    $("#file-input-in-post-module,#post-txt").val('');
    $("#post-txt").css("height","250px");
    $("#post-media").css("background",`url("")`);
    $("#post-media").css("display","none");
}

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
    let lastId;
    $.ajax({
        url: base_url + "/post/last/post/id",
        method: "get",
        async: false,
        success: function (resp) {
            lastId = generateNextPostId(resp.data);
        },
        error: function (resp) {

        }
    });
    return lastId;
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