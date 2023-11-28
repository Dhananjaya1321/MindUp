package lk.mindup.repo;

import lk.mindup.entity.Reactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReactionsRepo extends JpaRepository<Reactions,String> {
    @Query(value = "SELECT reaction_id FROM reactions ORDER BY reaction_id DESC LIMIT 1",nativeQuery = true)
    String getLastReactionId();
}
