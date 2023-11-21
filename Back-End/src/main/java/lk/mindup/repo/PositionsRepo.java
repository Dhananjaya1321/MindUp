package lk.mindup.repo;

import lk.mindup.entity.Positions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PositionsRepo extends JpaRepository<Positions,String> {
    @Query(value = "SELECT position_id FROM positions ORDER BY position_id DESC LIMIT 1",nativeQuery = true)
    String getLastPositionId();
}
