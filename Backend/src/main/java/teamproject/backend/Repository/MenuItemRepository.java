package teamproject.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.Model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
