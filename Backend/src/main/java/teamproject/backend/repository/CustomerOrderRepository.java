package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.CustomerOrder;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
}
