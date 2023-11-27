package lk.mindup.service;

import lk.mindup.dto.PostDTO;

import java.util.List;

public interface PostService {
    String getLastPostId();

    String getLastReactionId();

    List<PostDTO> getUserPosts(String user_id, int post_count);
}
