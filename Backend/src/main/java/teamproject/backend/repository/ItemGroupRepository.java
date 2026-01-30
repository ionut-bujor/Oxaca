package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.ItemGroup;

/**
 * A JPA repository mapping ItemGroup objects.
 */
public interface ItemGroupRepository extends JpaRepository<ItemGroup, Long> {
}
