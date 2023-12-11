package lk.mindup.controller;

import lk.mindup.dto.FollowingDTO;
import lk.mindup.dto.UserDTO;
import lk.mindup.entity.Following;
import lk.mindup.service.UserService;
import lk.mindup.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping
    public ResponseUtil saveUser(@RequestBody UserDTO userDTO) {
        userService.saveUser(userDTO);
        return new ResponseUtil("Ok", "Successfully Added...!", userDTO.getLogin().getEmail());
    }

    @PostMapping(path = "/follow", params = {"follower_id"})
    public ResponseUtil saveFollow(@RequestBody FollowingDTO dto, String follower_id) {
        userService.saveFollow(dto, follower_id);
        return new ResponseUtil("Ok", "Successfully Added...!", dto.getFollowing_id());
    }

    @DeleteMapping(path = "/unfollow", params = {"user_id", "other_user_id"})
    public ResponseUtil unfollow(String user_id, String other_user_id) {
        System.out.println(user_id+" "+other_user_id);
        userService.unfollow(user_id, other_user_id);
        return new ResponseUtil("Ok", "Successfully Delete...!", user_id);
    }

    @GetMapping(path = "/check/follow", params = {"user_id", "other_user_id"})
    public ResponseUtil checkBeforeToFollowUser(String user_id, String other_user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.checkBeforeToFollowUser(user_id, other_user_id));
    }

    @GetMapping(path = "/not/followers", params = {"user_id"})
    public ResponseUtil getNotFollowers(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getNotFollowers(user_id));
    }

    @GetMapping(path = "/details", params = {"user_id"})
    public ResponseUtil getUserDetails(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getUserDetails(user_id));
    }

    @GetMapping(params = {"email"})
    public ResponseUtil getUserId(String email) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getUserId(email));
    }

    @GetMapping(path = "/post/count", params = {"user_id"})
    public ResponseUtil getPostCount(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getPostCount(user_id));
    }

    @GetMapping(path = "/position", params = {"user_id"})
    public ResponseUtil getPositions(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getPositions(user_id));
    }

    @GetMapping(path = "/followers/count", params = {"user_id"})
    public ResponseUtil getFollowersCount(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getFollowersCount(user_id));
    }

    @GetMapping(path = "/following/count", params = {"user_id"})
    public ResponseUtil getFollowingCount(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getFollowingCount(user_id));
    }

    @GetMapping(path = "/last/user/id")
    public ResponseUtil getLastUserId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getLastUserId());
    }

    @GetMapping(path = "/last/follower/id")
    public ResponseUtil getLastFollowerId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getLastFollowerId());
    }

    @GetMapping(path = "/last/following/id")
    public ResponseUtil getLastFollowingId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getLastFollowingId());
    }

    @GetMapping(path = "/last/position/id")
    public ResponseUtil getLastPositionId() {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getLastPositionId());
    }
}
