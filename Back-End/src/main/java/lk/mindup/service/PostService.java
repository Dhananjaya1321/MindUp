package lk.mindup.service;

import lk.mindup.dto.CustomDTO;
import lk.mindup.dto.PostDTO;
import lk.mindup.dto.ReactionsDTO;

import java.io.IOException;
import java.util.List;

public interface PostService {
    void saveReaction(ReactionsDTO dto);

    void saveUserPost(PostDTO dto) throws IOException;

    boolean checkReaction(String user_id, String post_id);

    void undoReaction(String user_id, String post_id);

    String getLastPostId();

    String getLastReactionId();

    List<CustomDTO> getReactionsOfPost(String post_id);

    List<CustomDTO> getUserPosts(String user_id, int post_count);
}
