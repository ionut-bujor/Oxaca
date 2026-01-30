package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.ItemGroup;

public interface ItemGroupRepository extends JpaRepository<ItemGroup, Long> {
}
