package lk.mindup.repo;

import lk.mindup.entity.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FollowerRepo extends JpaRepository<Follower,String> {
    @Query(value = "SELECT follower_id FROM follower ORDER BY follower_id DESC LIMIT 1",nativeQuery = true)
    String getLastFollowerId();
}
