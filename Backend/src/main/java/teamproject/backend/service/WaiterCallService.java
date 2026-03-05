package teamproject.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.model.WaiterCall;
import teamproject.backend.repository.WaiterCallRepository;

/**
 * Service layer for waiter calls.
 */
@Service
@Transactional
public class WaiterCallService {

  private final WaiterCallRepository waiterCallRepository;

  /**
   * Constructor for WaiterCallService.
   *
   * @param waiterCallRepository repository for waiter calls.
   */
  public WaiterCallService(WaiterCallRepository waiterCallRepository) {
    this.waiterCallRepository = waiterCallRepository;
  }

  /**
   * Creates a new waiter call.
   *
   * @param tableNumber the table number making the call.
   * @param note optional note for the call.
   * @return the created waiter call.
   */
  public WaiterCall createCall(int tableNumber, String note) {
    WaiterCall call = new WaiterCall(tableNumber, note);
    return waiterCallRepository.save(call);
  }

  /**
   * Lists all open calls ordered by creation time.
   *
   * @return list of open calls.
   */
  @Transactional(readOnly = true)
  public List<WaiterCall> listOpenCalls() {
    return waiterCallRepository.findByStatusOrderByCreatedAtAsc("OPEN");
  }

  /**
   * Resolves a call by id.
   *
   * @param id call id.
   * @return updated call.
   */
  public WaiterCall resolveCall(Long id) {
    WaiterCall call = waiterCallRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Waiter call not found: " + id));
    call.resolve();
    return waiterCallRepository.save(call);
  }


  /**
   * Lists calls by status ordered by creation time.
   *
   * @param status waiter call status
   * @return list of calls
   */
  @Transactional(readOnly = true)
  public List<WaiterCall> listByStatus(String status) {
    return waiterCallRepository.findByStatusOrderByCreatedAtAsc(status);
  }
}


