package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.CustomerOrder;

/**
 * This is the repository that stores each customer order.
 */
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
