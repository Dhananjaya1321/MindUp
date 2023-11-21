package lk.mindup.service.impl;

import lk.mindup.dto.UserDTO;
import lk.mindup.entity.Login;
import lk.mindup.entity.User;
import lk.mindup.repo.*;
import lk.mindup.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepo userRepo;

    @Autowired
    LoginRepo loginRepo;

    @Autowired
    FollowerRepo followerRepo;

    @Autowired
    FollowingRepo followingRepo;

    @Autowired
    PositionsRepo positionsRepo;

    @Override
    public void saveUser(UserDTO dto) {
        if (loginRepo.existsById(dto.getLogin().getEmail())) {
            throw new RuntimeException(dto.getLogin().getEmail() + " Already exists");
        }
        userRepo.save(modelMapper.map(dto, User.class));
    }

    @Override
    public String getLastUserId() {
        return userRepo.getLastUserId();
    }

    @Override
    public String getLastFollowerId() {
        return followerRepo.getLastFollowerId();
    }

    @Override
    public String getLastFollowingId() {
        return followingRepo.getLastFollowingId();
    }

    @Override
    public String getLastPositionId() {
        return positionsRepo.getLastPositionId();
    }


}
