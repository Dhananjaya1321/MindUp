package lk.mindup.repo;

import lk.mindup.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FollowingRepo extends JpaRepository<Following,String> {
    @Query(value = "SELECT following_id FROM `following` ORDER BY following_id DESC LIMIT 1",nativeQuery = true)
    String getLastFollowingId();

    @Query(value = "SELECT following_id FROM following  WHERE user_user_id=?1 AND other_user_id=?2",nativeQuery = true)
    String getFollowingId(String user_id, String other_user_id);
}
