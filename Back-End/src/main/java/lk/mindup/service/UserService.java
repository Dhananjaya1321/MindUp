package lk.mindup.service;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);

    List<CustomDTO> getUserDetails(String user_id);

    String getLastUserId();

    String getUserId(String email);

    String getLastFollowerId();

    String getLastFollowingId();

    String getLastPositionId();
}
