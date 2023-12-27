package lk.mindup.repo;

import lk.mindup.entity.CustomEntity;
import lk.mindup.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, String> {
    @Query(value = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1", nativeQuery = true)
    String getLastPostId();

    @Query(value = "SELECT NEW lk.mindup.entity.CustomEntity(p.post_id, p.dateTime, p.post_text, p.who_can_view, p.media, p.user.user_id, p.page.page_id) FROM Post p WHERE p.user.user_id = ?1 ORDER BY p.dateTime DESC")
    List<CustomEntity> getUserPosts(String user_id, Pageable pageable);

    @Query(value =
            "SELECT NEW lk.mindup.entity.CustomEntity(" +
            "p.post_id, p.dateTime, p.post_text, p.who_can_view, p.media, p.user.user_id, p.page.page_id)" +
            "FROM Post p WHERE p.user.user_id = ?1" +
            "OR p.user.user_id IN (SELECT f.other_user_id FROM Following f WHERE f.user.user_id = ?1)" +
            "ORDER BY p.dateTime DESC")
    List<CustomEntity> getPostsForHome(String user_id, Pageable pageable);
}
