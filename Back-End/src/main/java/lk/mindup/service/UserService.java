package lk.mindup.service;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.PositionsDTO;
import lk.mindup.dto.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);

    List<CustomDTO> getUserDetails(String user_id);

    String getLastUserId();

    int getPostCount(String user_id);

    int getFollowersCount(String user_id);

    List<PositionsDTO> getPositions(String user_id);

    int getFollowingCount(String user_id);

    String getUserId(String email);

    String getLastFollowerId();

    String getLastFollowingId();

    String getLastPositionId();
}
