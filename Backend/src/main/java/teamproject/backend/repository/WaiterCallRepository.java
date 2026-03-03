package teamproject.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.WaiterCall;

/**
 * Repository for storing and querying waiter calls.
 */
public interface WaiterCallRepository extends JpaRepository<WaiterCall, Long> {

  /**
   * Finds calls by status ordered by creation time (oldest first).
   *
   * @param status the call status (e.g. OPEN, RESOLVED).
   * @return matching waiter calls.
   */
  List<WaiterCall> findByStatusOrderByCreatedAtAsc(String status);

  /**
   * Finds calls for a specific table number.
   *
   * @param tableNumber the table number.
   * @return matching waiter calls.
   */
  List<WaiterCall> findByTableNumber(int tableNumber);
}
