package lk.mindup.controller;

import lk.mindup.dto.UserDTO;
import lk.mindup.util.ResponseUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @PostMapping
    public ResponseUtil saveUser(@RequestBody UserDTO userDTO){
        return new ResponseUtil("Ok","Successfully Added...!",userDTO.getLogin().getEmail());
    }
}
