package lk.mindup.service;

import lk.mindup.dto.UserDTO;

public interface UserService {
    void saveUser(UserDTO dto);

    String getLastUserId();

    String getLastFollowerId();

    String getLastFollowingId();
}
