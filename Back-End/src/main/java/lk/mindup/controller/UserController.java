package lk.mindup.controller;

import lk.mindup.dto.UserDTO;
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

    @GetMapping(path = "/details",params = {"user_id"})
    public ResponseUtil getUserDetails(String user_id) {
        System.out.println("\n\n\n\n"+userService.getUserDetails(user_id));
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getUserDetails(user_id));
    }

    @GetMapping(params = {"email"})
    public ResponseUtil getUserId(String email) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getUserId(email));
    }

    @GetMapping(path = "/post/count",params = {"user_id"})
    public ResponseUtil getPostCount(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getPostCount(user_id));
    }

    @GetMapping(path = "/followers/count",params = {"user_id"})
    public ResponseUtil getFollowersCount(String user_id) {
        return new ResponseUtil("Ok", "Successfully Loaded...!", userService.getFollowersCount(user_id));
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
