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
}
