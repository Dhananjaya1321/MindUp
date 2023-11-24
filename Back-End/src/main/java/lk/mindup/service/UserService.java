package lk.mindup.service;

import lk.mindup.dto.UserDTO;

public interface UserService {
    void saveUser(UserDTO dto);

    String getLastUserId();

    String getUserId(String email);

    String getLastFollowerId();

    String getLastFollowingId();

    String getLastPositionId();
}
