package lk.mindup.service.impl;

import lk.mindup.dto.*;
import lk.mindup.entity.CustomEntity;
import lk.mindup.entity.Follower;
import lk.mindup.entity.Following;
import lk.mindup.entity.User;
import lk.mindup.repo.*;
import lk.mindup.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
    public void saveFollow(FollowingDTO dto,String follower_id) {
        FollowerDTO followerDTO = new FollowerDTO(follower_id, dto.getUser().getUser_id(), new UserDTO(dto.getOther_user_id()));
        FollowingDTO followingDTO = new FollowingDTO(dto.getFollowing_id(), dto.getOther_user_id(), new UserDTO(dto.getUser().getUser_id()));
        followerRepo.save(modelMapper.map(followerDTO, Follower.class));
        followingRepo.save(modelMapper.map(followingDTO, Following.class));
    }

    @Override
    public boolean checkBeforeToFollowUser(String user_id, String other_user_id) {
        return followerRepo.checkBeforeToFollowUser(user_id, other_user_id) == null;
    }

    @Override
    public List<CustomDTO> getUserDetails(String user_id) {
        ArrayList<CustomEntity> customEntities = new ArrayList<>();
        customEntities.add(userRepo.getUserDetails(user_id));
        return modelMapper.map(customEntities, new TypeToken<ArrayList<CustomEntity>>() {
        }.getType());
    }

    @Override
    public String getLastUserId() {
        return userRepo.getLastUserId();
    }

    @Override
    public int getPostCount(String user_id) {
        return userRepo.getPostCount(user_id);
    }

    @Override
    public int getFollowersCount(String user_id) {
        return userRepo.getFollowersCount(user_id);
    }

    @Override
    public List<UserDTO> getNotFollowers(String user_id) {
        return modelMapper.map(userRepo.getNotFollowers(user_id), new TypeToken<ArrayList<User>>() {
        }.getType());
    }

    @Override
    public List<PositionsDTO> getPositions(String user_id) {
        return modelMapper.map(userRepo.getPositions(user_id), new TypeToken<ArrayList<PositionsDTO>>() {
        }.getType());
    }

    @Override
    public int getFollowingCount(String user_id) {
        return userRepo.getFollowingCount(user_id);
    }

    @Override
    public String getUserId(String email) {
        return userRepo.getUserId(email);
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
