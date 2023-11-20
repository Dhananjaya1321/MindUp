package lk.mindup.repo;

import lk.mindup.entity.Follower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepo extends JpaRepository<Follower,String> {
}
