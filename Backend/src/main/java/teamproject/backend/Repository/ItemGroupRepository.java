package teamproject.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.Model.ItemGroup;

public interface ItemGroupRepository extends JpaRepository<ItemGroup, Long> {
}
