package lk.mindup.repo;

import lk.mindup.entity.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FollowerRepo extends JpaRepository<Follower, String> {
    @Query(value = "SELECT follower_id FROM follower ORDER BY follower_id DESC LIMIT 1", nativeQuery = true)
    String getLastFollowerId();

    @Query(value = "SELECT following_id FROM following WHERE user_user_id=?1 AND other_user_id=?2", nativeQuery = true)
    String checkBeforeToFollowUser(String user_id, String other_user_id);

    @Query(value = "SELECT follower_id FROM follower WHERE user_user_id=?1 AND other_user_id=?2", nativeQuery = true)
    String getFollowerId(String user_id, String other_user_id);
}
