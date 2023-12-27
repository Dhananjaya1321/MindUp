package lk.mindup.service.impl;

import lk.mindup.dto.*;
import lk.mindup.entity.*;
import lk.mindup.repo.*;
import lk.mindup.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
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

    String dir = "C:\\Users\\ACER\\Documents\\WorkZone\\MindUp\\Back-End\\src\\main\\resources\\media";

    @Override
    public void saveUser(UserDTO dto) {
        if (loginRepo.existsById(dto.getLogin().getEmail())) {
            throw new RuntimeException(dto.getLogin().getEmail() + " Already exists");
        }
        userRepo.save(modelMapper.map(dto, User.class));
    }

    @Override
    public void updateProfile(UserDTO dto) {
        dto.setLogin(modelMapper.map(loginRepo.getById(dto.getLogin().getEmail()), LoginDTO.class));
        userRepo.save(modelMapper.map(dto, User.class));
    }

    @Override
    public void updateProfileCoverPhoto(MultipartFile media, String user_id) throws IOException {

        CustomEntity user = userRepo.getUserAndLoginDetails(user_id);
        media.transferTo(new File(new File(dir, media.getOriginalFilename()).getAbsolutePath()));

        userRepo.save(
                new User(
                        user_id,
                        user.getName(),
                        user.getAddress(),
                        user.getCountry(),
                        user.getContact(),
                        user.getGender(),
                        user.getHeadline(),
                        user.getYoutube_channel(),
                        user.getVerified_or_not(),
                        user.getProfile_photo(),
                        media.getOriginalFilename(),
                        new Login(
                                user.getEmail(),
                                user.getUsername(),
                                user.getPassword()
                        )

                )
        );
    }

    @Override
    public void updateProfilePhoto(MultipartFile media, String user_id) throws IOException {
        System.out.println(user_id);
        CustomEntity user = userRepo.getUserAndLoginDetails(user_id);
        System.out.println(user);
        media.transferTo(new File(new File(dir, media.getOriginalFilename()).getAbsolutePath()));

        userRepo.save(
                new User(
                        user_id,
                        user.getName(),
                        user.getAddress(),
                        user.getCountry(),
                        user.getContact(),
                        user.getGender(),
                        user.getHeadline(),
                        user.getYoutube_channel(),
                        user.getVerified_or_not(),
                        media.getOriginalFilename(),
                        user.getCover_photo(),
                        new Login(
                                user.getEmail(),
                                user.getUsername(),
                                user.getPassword()
                        )
                )
        );
    }

    @Override
    public void saveFollow(FollowingDTO dto, String follower_id) {
        FollowerDTO followerDTO = new FollowerDTO(follower_id, dto.getUser().getUser_id(), new UserDTO(dto.getOther_user_id()));
        FollowingDTO followingDTO = new FollowingDTO(dto.getFollowing_id(), dto.getOther_user_id(), new UserDTO(dto.getUser().getUser_id()));
        followerRepo.save(modelMapper.map(followerDTO, Follower.class));
        followingRepo.save(modelMapper.map(followingDTO, Following.class));
    }

    @Override
    public void unfollow(String user_id, String other_user_id) {
        followingRepo.deleteById(followingRepo.getFollowingId(user_id, other_user_id));
        followerRepo.deleteById(followerRepo.getFollowerId(other_user_id, user_id));

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
