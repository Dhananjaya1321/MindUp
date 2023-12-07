package lk.mindup.repo;

import lk.mindup.dto.UserDTO;
import lk.mindup.entity.CustomEntity;
import lk.mindup.entity.Positions;
import lk.mindup.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User, String> {
    @Query(value = "SELECT user_id FROM user ORDER BY user_id DESC LIMIT 1", nativeQuery = true)
    String getLastUserId();

    @Query(value = "SELECT user_id FROM user JOIN login l ON l.email = user.login_email WHERE email=?1", nativeQuery = true)
    String getUserId(String email);

    @Query(value = "SELECT NEW lk.mindup.entity.User(u.user_id, u.name, u.headline, u.verified_or_not, u.profile_photo, u.cover_photo) " +
            "FROM User u " +
            "WHERE NOT EXISTS (" +
            "    SELECT 1 " +
            "    FROM Follower f " +
            "    JOIN User u2 ON u2.user_id = f.user.user_id " +
            "    WHERE u2.user_id = ?1 AND f.other_user_id = u.user_id" +
            ") AND u.user_id <> ?1")
    List<User> getNotFollowers(String user_id);

    @Query(value = "SELECT NEW lk.mindup.entity.CustomEntity(u.name,u.address,u.country,u.contact,u.gender,u.headline,u.youtube_channel,u.verified_or_not,u.profile_photo,u.cover_photo,p.page_id) FROM User u LEFT JOIN Page p ON p.page_id = u.page.page_id  WHERE u.user_id=?1")
    CustomEntity getUserDetails(String user_id);

    @Query(value = "SELECT COUNT(post_id) FROM user JOIN post p ON user.user_id = p.user_user_id WHERE user_id=?1", nativeQuery = true)
    int getPostCount(String user_id);

    @Query(value = "SELECT COUNT(follower_id) FROM user JOIN follower f ON user.user_id = f.user_user_id WHERE user_id=?1", nativeQuery = true)
    int getFollowersCount(String user_id);

    @Query(value = "SELECT COUNT(following_id) FROM user JOIN following f ON user.user_id = f.user_user_id WHERE user_id=?1", nativeQuery = true)
    int getFollowingCount(String user_id);

    @Query(value = "SELECT * FROM positions p WHERE p.user_user_id=?1", nativeQuery = true)
    List<Positions> getPositions(String user_id);
}
