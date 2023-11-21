package lk.mindup.repo;

import lk.mindup.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FollowingRepo extends JpaRepository<Following,String> {
    @Query(value = "SELECT following_id FROM `following` ORDER BY following_id DESC LIMIT 1",nativeQuery = true)
    String getLastFollowingId();
}
