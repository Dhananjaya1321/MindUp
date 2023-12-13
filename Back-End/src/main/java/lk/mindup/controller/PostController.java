package lk.mindup.controller;

import lk.mindup.dto.PostDTO;
import lk.mindup.dto.ReactionsDTO;
import lk.mindup.service.PostService;
import lk.mindup.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @PostMapping(path = "/reaction")
    public ResponseUtil saveReaction(@RequestBody ReactionsDTO dto) {
        System.out.println(dto.toString());
        postService.saveReaction(dto);
        return new ResponseUtil("Ok", "Successfully Added...!", dto.getReaction_id());
    }

    @PostMapping
    public ResponseUtil saveUserPost(@RequestPart("media") MultipartFile media, @RequestPart("dto") PostDTO dto) throws IOException {
        dto.setMedia(media);
        postService.saveUserPost(dto);
        return new ResponseUtil("Ok", "Successfully Added...!", dto.getPost_id());
    }

    @PostMapping(path = "/without/media")
    public ResponseUtil saveUserPost(@RequestBody PostDTO dto) throws IOException {
        postService.saveUserPost(dto);
        return new ResponseUtil("Ok", "Successfully Added...!", dto.getPost_id());
    }

    @GetMapping(path = "/check/reaction", params = {"user_id","post_id"})
    public ResponseUtil checkReaction(String user_id,String post_id) {
        boolean b = postService.checkReaction(user_id, post_id);
        System.out.println(b);
        return new ResponseUtil("Ok", "Successfully Loaded...!", b);
    }

    @GetMapping(path = "/reacted/users", params = {"post_id"})
    public ResponseUtil getReactionsOfPost(String post_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", postService.getReactionsOfPost(post_id));
    }

    @GetMapping(path = "/posts", params = {"user_id", "post_count"})
    public ResponseUtil getUserPosts(String user_id, int post_count) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", postService.getUserPosts(user_id, post_count));
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
