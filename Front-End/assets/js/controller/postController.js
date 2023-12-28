$("#post-post-btn").click(function () {
    saveUserPost();
})
let user_posts = [];
let posts_home = [];
let images_path = "../Back-End/src/main/resources/media/";

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

function getPostsForHome() {
    $.ajax({
        url: base_url + "/post/posts/home?user_id=" + user_id + "&post_count=" + posts_home.length,
        method: "get",
        async: false,
        success: function (resp) {
            posts_home = resp.data;
            console.log(posts_home)
            setPostsForHomePage();
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function setPostsForHomePage() {
    $("#posts-shared-section>section:last-child").empty();

    for (let i in posts_home) {
        let reactions = getReactionsOfPost(posts_home[i].post_id);
        let reaction = `<small>No reactions</small>`;
        if (reactions.length === 1) {
            reaction = `
                      <div class="first-reacted-user"></div><!--first reacted user-->
                      <div class="other-reacted-users">
                          <small>
                              <span class="first-reacted-user-name">${reactions[0].name}</span>
                          </small>
                      </div>`
        } else if (reactions.length > 1) {
            let otherCount = ``;
            if (reactions.length - 2 > 0) {
                otherCount = `and others <a href="#"><span class="other-reaction-count">${reactions.length - 2}</span></a>`;
            }
            reaction = `
                      <div class="first-reacted-user"></div><!--first reacted user-->
                      <div class="second-reacted-user"></div><!--second reacted user-->
                      <div class="other-reacted-users">
                          <small>
                              <span class="first-reacted-user-name">${reactions[0].name}</span>
                              &
                              <span class="second-reacted-user-name">${reactions[1].name}</span>
                              ${otherCount}
                          </small>
                      </div>`
        }

        let media = '<div></div>';
        if (posts_home[i].media !== null) {
            media = `<img class="post-media" src="">`;
            // media = `<div class="post-media"></div>`;
        }

        let userDetailsForPost = getUserDetailsForPost(posts_home[i].user_id);

        let post = `
            <div id="${posts_home[i].post_id}" style="border: 1px solid #e5e5e5;" class="post flex f-col">
                    <div class="posted-account-details f-row">
                        <div class="user-or-page-dp"></div><!--user or page DP-->
                        <div class="user-or-page-details">
                            <h3>${userDetailsForPost.name}</h3>
                            <p>${userDetailsForPost.headline}</p>
                            <small class="posted-time">${setTimeOrDateForPost(posts_home[i].dateTime)}<i class="fa-solid fa-earth-americas"></i></small>
                        </div><!--user or page details-->
                    </div><!--posted account or page details-->
                    <div class="post-content">
                        <p>${posts_home[i].post_text}</p>
                    </div><!--post content-->
                    ${media}
                    <div class="post-reaction-bar"></div><!--who are the react this post-->
                    <div class="horizontal-line"></div>
                    <div class="post-reaction-bar">
                        <button id="btn-${posts_home[i].post_id}" class="heart-react"><i class="fa-regular fa-heart"></i></button>
                    </div><!--heart reaction button here-->
            </div>`

        $("#posts-shared-section>section:last-child").append(post);
        $(`#${posts_home[i].post_id} > div:nth-child(4)`).empty();
        $(`#${posts_home[i].post_id} > div:nth-child(4)`).append(reaction);

        if (reactions.length === 1) {
             if (reactions[0].profile_photo !== null) {
                 $(`#${posts_home[i].post_id} > div:nth-child(4) > .first-reacted-user`).css({
                     "background": `url("${images_path}${reactions[0].profile_photo}")`,
                     "backgroundSize": "cover",
                     "backgroundPosition": "center"
                 });
             }
        } else if (reactions.length > 1) {
             if (reactions[0].profile_photo !== null) {
                 $(`#${posts_home[i].post_id} > div:nth-child(4) > .first-reacted-user`).css({
                     "background": `url("${images_path}${reactions[0].profile_photo}")`,
                     "backgroundSize": "cover",
                     "backgroundPosition": "center"
                 });
             }
             if (reactions[1].profile_photo !== null) {
                 $(`#${posts_home[i].post_id} > div:nth-child(4) > .second-reacted-user`).css({
                     "background": `url("${images_path}${reactions[1].profile_photo}")`,
                     "backgroundSize": "cover",
                     "backgroundPosition": "center"
                 });
             }
        }
        $(`#${posts_home[i].post_id} > .post-media`).attr("src", `${images_path}${posts_home[i].media}`);
        if (userDetailsForPost.profile_photo!==null){
            $(`#${posts_home[i].post_id} > div:nth-child(1) > .user-or-page-dp`).css({
                "background": `url("${images_path}${userDetailsForPost.profile_photo}")`,
                "backgroundSize": "cover",
                "backgroundPosition": "center"
            })
        }

    }
    checkAndSetUserReactionBtnColorForHomePagePosts();
}

function getUserDetailsForPost(user_id) {
    let user_details = null;
    $.ajax({
        url: base_url + "/user/details?user_id=" + user_id,
        method: "get",
        async: false,
        success: function (resp) {
            console.log(resp.data[0]);
            if (resp.data[0].headline !== null) {
                resp.data[0].headline = truncateParagraph(resp.data[0].headline, 62);
            } else {
                resp.data[0].headline = "---";
            }
            user_details = resp.data[0];
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    });
    return user_details;
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
        console.log("save reactions", post_id)
        if (!checkReaction(post_id)) {
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
                    $("#btn-" + post_id).css("color", "red");
                },
                error: function (resp) {
                    alert(resp.JSON.data);
                }
            });
        } else {
            undoReaction(post_id);
        }
    });
}

function undoReaction(post_id) {
    $.ajax({
        url: base_url + "/post/undo/reaction?user_id=" + user_id + "&post_id=" + post_id,
        method: "delete",
        async: false,
        success: function (resp) {
            $("#btn-" + post_id).css("color", "black");
        },
        error: function (resp) {
            alert(resp.JSON.data);
        }
    })
}

function checkReaction(post_id) {
    let status;
    $.ajax({
        url: base_url + "/post/check/reaction?user_id=" + user_id + "&post_id=" + post_id,
        method: "get",
        async: false,
        success: function (resp) {
            status = resp.data;
            console.log(status)
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
                getPostsForHome();
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
                    getPostsForHome();
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

function setTimeOrDateForPost(date) {
    const currentDate = new Date();
    const postedDate = new Date(date);

    const timeDifference = currentDate - postedDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // console.log(date,timeDifference,`Time difference: ${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`);
   if (days>=1){
       return days+" d";
   }else {
       if (hours>=1){
           return hours+" h";
       }else {
           if (minutes>=1){
               return hours+" m";
           }else {
               if (seconds>=1){
                   return hours+" s";
               }else {
                   return "Just now";
               }
           }
       }
   }
}
function getLastReactionId() {
    let last_reaction_id;
    $.ajax({
        url: base_url + "/post/last/reaction/id",
        method: "get",
        async: false,
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