package teamproject.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.CustomerOrder;

/**
 * This is the repository that stores each customer order.
 */
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
  List<CustomerOrder> findByUserId(Long userId);

  List<CustomerOrder> findByTableNumber(int tableNumber);

}
