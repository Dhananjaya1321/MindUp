package lk.mindup.service;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.PostDTO;

import java.io.IOException;
import java.util.List;

public interface PostService {
    void saveUserPost(PostDTO dto) throws IOException;

    String getLastPostId();

    String getLastReactionId();

    List<CustomDTO> getUserPosts(String user_id, int post_count);
}
