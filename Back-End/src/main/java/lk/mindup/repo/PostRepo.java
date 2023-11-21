package lk.mindup.repo;

import lk.mindup.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepo extends JpaRepository<Post,String> {
    @Query(value = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1",nativeQuery = true)
    String getLastPostId();
}
