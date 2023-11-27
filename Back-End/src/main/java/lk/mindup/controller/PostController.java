package lk.mindup.controller;

import lk.mindup.service.PostService;
import lk.mindup.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping(path = "/posts", params = {"user_id","post_count"})
    public ResponseUtil getUserPosts(String user_id,int post_count) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", postService.getUserPosts(user_id,post_count+10));
    }

    @GetMapping(path = "/last/post/id")
    public ResponseUtil getLastPostId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", postService.getLastPostId());
    }

    @GetMapping(path = "/last/reaction/id")
    public ResponseUtil getLastReactionId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", postService.getLastReactionId());
    }
}
