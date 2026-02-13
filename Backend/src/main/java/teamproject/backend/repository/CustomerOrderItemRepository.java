package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.CustomerOrderItem;

/**
 * A JPA repository for storing CustomerOrderItem objects.
 */
public interface CustomerOrderItemRepository extends JpaRepository<CustomerOrderItem, Long> {
  
}