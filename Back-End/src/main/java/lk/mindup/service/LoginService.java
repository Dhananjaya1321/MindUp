package lk.mindup.service;

import lk.mindup.dto.LoginDTO;

public interface LoginService {
    /*The method use check whether a user has created an account with this email and if there is an account,
         check whether the email and password match*/
    boolean checkUser(String email, String password);

}
