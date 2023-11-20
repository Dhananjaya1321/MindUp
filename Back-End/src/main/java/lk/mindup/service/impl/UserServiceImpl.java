package lk.mindup.service.impl;

import lk.mindup.dto.UserDTO;
import lk.mindup.entity.User;
import lk.mindup.repo.UserRepo;
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

    @Override
    public void saveUser(UserDTO dto) {
        userRepo.save(modelMapper.map(dto, User.class));
    }
}
