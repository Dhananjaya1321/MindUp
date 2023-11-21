package lk.mindup.service.impl;

import lk.mindup.dto.LoginDTO;
import lk.mindup.repo.LoginRepo;
import lk.mindup.service.LoginService;
import lk.mindup.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    LoginRepo loginRepo;

    /*The method use check whether a user has created an account with this email and if there is an account,
     check whether the email and password match*/
    @Override
    public boolean checkUser(String email, String password){
        LoginDTO userLogin = findUserLogin(email);
        if (userLogin != null) {
            if (userLogin.getPassword().equals(password)) {
                return true;
            }else {
                return false;
            }
        }else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    @Override
    public LoginDTO findUserLogin(String email){
        return modelMapper.map(loginRepo.findById(email).get(),LoginDTO.class);
    }
}
