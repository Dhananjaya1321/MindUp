package lk.mindup.service;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.FollowingDTO;
import lk.mindup.dto.PositionsDTO;
import lk.mindup.dto.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);

    void updateProfile(UserDTO dto);

    void saveFollow(FollowingDTO dto, String follower_id);

    void unfollow(String user_id, String other_user_id);

    boolean checkBeforeToFollowUser(String user_id, String other_user_id);

    List<CustomDTO> getUserDetails(String user_id);

    String getLastUserId();

    int getPostCount(String user_id);

    int getFollowersCount(String user_id);

    List<UserDTO> getNotFollowers(String user_id);

    List<PositionsDTO> getPositions(String user_id);

    int getFollowingCount(String user_id);

    String getUserId(String email);

    String getLastFollowerId();

    String getLastFollowingId();

    String getLastPositionId();
}
