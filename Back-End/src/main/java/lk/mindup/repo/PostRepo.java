package lk.mindup.repo;

import lk.mindup.dto.PostDTO;
import lk.mindup.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, String> {
    @Query(value = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1", nativeQuery = true)
    String getLastPostId();

    @Query(value = "SELECT * FROM post ORDER BY date_time ASC LIMIT ?2 WHERE user_user_id=?1", nativeQuery = true)
    List<PostDTO> getUserPosts(String user_id, int post_count);

}
