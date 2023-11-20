package lk.mindup.repo;

import lk.mindup.entity.Positions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionsRepo extends JpaRepository<Positions,String> {
}
