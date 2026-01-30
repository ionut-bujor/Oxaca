package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.MenuType;

public interface MenuTypeRepository extends JpaRepository<MenuType, Long> {
}
