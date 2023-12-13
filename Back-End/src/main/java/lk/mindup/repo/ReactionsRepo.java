package lk.mindup.repo;

import lk.mindup.entity.CustomEntity;
import lk.mindup.entity.Reactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReactionsRepo extends JpaRepository<Reactions,String> {
    @Query(value = "SELECT reaction_id FROM reactions ORDER BY reaction_id DESC LIMIT 1",nativeQuery = true)
    String getLastReactionId();

    @Query(value = "SELECT NEW lk.mindup.entity.CustomEntity(r.reaction_id,r.user.user_id,r.user.profile_photo,r.user.name) FROM Reactions r WHERE r.post.post_id = ?1")
    List<CustomEntity> getReactionsOfPost(String post_id);

    @Query(value = "SELECT reaction_id FROM reactions WHERE user_user_id=?1 AND post_post_id=?2", nativeQuery = true)
    String checkReaction(String user_id, String post_id);
}
