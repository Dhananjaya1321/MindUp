package lk.mindup.repo;

import lk.mindup.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User,String> {
    @Query(value = "SELECT user_id FROM user ORDER BY user_id DESC LIMIT 1",nativeQuery = true)
    String getLastUserId();
}
