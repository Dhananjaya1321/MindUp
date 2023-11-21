package lk.mindup.controller;

import lk.mindup.service.LoginService;
import lk.mindup.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {
    @Autowired
    LoginService loginService;


    @GetMapping(params = {"email","password"})
    public ResponseUtil checkUser(String email,String password){
        return new ResponseUtil("Ok","User is alive", loginService.checkUser(email,password));
    }

}
