package lk.mindup.repo;

import lk.mindup.entity.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PageRepo extends JpaRepository<Page,String> {
    @Query(value = "SELECT page_id FROM page ORDER BY page_id DESC LIMIT 1",nativeQuery = true)
    String getLastPageId();
}
