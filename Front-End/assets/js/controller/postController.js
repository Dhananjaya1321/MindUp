$("#post-post-btn").click(function () {
    saveUserPost();
})
let user_posts = [];

function getUserPosts() {
    $.ajax({
        url: base_url + "/post/posts?user_id=" + user_id + "&post_count=" + user_posts.length,
        method: "get",
        async: false,
        success: function (resp) {
            user_posts = resp.data;
            console.log(user_posts)
            setPostsForUserActivitySection();
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function getReactionsOfPost(post_id) {
    let reactions = [];
    $.ajax({
        url: base_url + "/post/reacted/users?post_id=" + post_id,
        method: "get",
        async: false,
        success: function (resp) {
            reactions = resp.data;
            console.log(resp.data);
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
    return reactions;
}

function saveReaction() {
    $(".heart-react").click(function () {
        let post_id = $(this).attr("id").substring(4);
        if (checkReaction(post_id)){
            let data = {
                "reaction_id": getLastReactionId(),
                "user": {"user_id": user_id},
                "post": {"post_id": post_id}
            }
            $.ajax({
                url: base_url + "/post/reaction",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(data),
                async: false,
                success: function (resp) {
                    $("#btn-" + post_id).css("color", "red")
                },
                error: function (resp) {
                    alert(resp.JSON.data);
                }
            });
        }else {
            undoReaction(post_id);
        }
    });
}

function undoReaction(post_id) {
    $.ajax({
        url: base_url + "/post/undo/reaction?user_id="+user_id+"&post_id="+post_id,
        method: "delete",
        success: function (resp) {
            $("#btn-" + post_id).css("color", "black");
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}
function checkReaction(post_id) {
    let status=true;
    $.ajax({
        url: base_url + "/post/check/reaction?user_id="+user_id+"&post_id="+post_id,
        method: "get",
        success: function (resp) {
            status=false;
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
    return status;
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
    $("#post-txt").css("height", "250px");
    $("#post-media").css("background", `url("")`);
    $("#post-media").css("display", "none");
}

function getLastReactionId() {
    let last_reaction_id;
    $.ajax({
        url: base_url + "/post/last/reaction/id",
        method: "get",
        async:false,
        success: function (resp) {
            last_reaction_id = generateNextReactionId(resp.data);
            console.log(last_reaction_id)
        },
        error: function (resp) {

        }
    });
    return last_reaction_id;
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