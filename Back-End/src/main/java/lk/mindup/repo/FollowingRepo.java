package lk.mindup.repo;

import lk.mindup.entity.Following;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowingRepo extends JpaRepository<Following,String> {
}
