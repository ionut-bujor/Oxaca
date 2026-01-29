package teamproject.backend.Repository;

import org.springframework.data.repository.CrudRepository;
import teamproject.backend.Model.ItemGroup;

public interface ItemGroupRepository extends CrudRepository<ItemGroup, Long> {
}
