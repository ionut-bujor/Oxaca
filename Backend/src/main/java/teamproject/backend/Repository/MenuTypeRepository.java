package teamproject.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.Model.MenuType;

public interface MenuTypeRepository extends JpaRepository<MenuType, Long> {
}
