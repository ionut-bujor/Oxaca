package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
