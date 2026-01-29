package teamproject.backend.Repository;

import org.springframework.data.repository.CrudRepository;
import teamproject.backend.Model.MenuItem;

public interface MenuItemRepository extends CrudRepository<MenuItem, Long> {
}
