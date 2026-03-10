package teamproject.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.Role;
import teamproject.backend.security.RequireRole;
import teamproject.backend.service.WaiterDashboardService;

/**
 * This class handles REST APIs for the waiter dashboard.
 */
@RestController
@RequestMapping("/api/v1/waiterDashboard")
public class WaiterDashboardController {

  private final WaiterDashboardService waiterDashboardService;

  /**
   * Constructor for the waiter dashboard.
   *
   * @param waiterDashboardService This attaches the service layer for waiterDashboard.
   */
  public WaiterDashboardController(WaiterDashboardService waiterDashboardService) {
    this.waiterDashboardService = waiterDashboardService;
  }

  /**
   * This returns orders based on their table number.
   *
   * @param tableNumber The table number we are using to get orders.
   * @return a response entity containing a list of orders.
   */
  @GetMapping("/table/{tableNumber}")
  @RequireRole({Role.MANAGER, Role.WAITER})
  public ResponseEntity<List<CustomerOrderDTO>> getOrderByTable(@PathVariable int tableNumber) {
    List<CustomerOrderDTO> orders = waiterDashboardService.getOrderByTable(tableNumber);
    return ResponseEntity.ok(orders);
  }

  /**
   * This changes the status of an order to preparing.
   */
  @PostMapping("/confirmOrder/{id}")
  @RequireRole({Role.MANAGER, Role.WAITER})
  public ResponseEntity<CustomerOrderDTO> confirmOrder(@PathVariable Long id) {
    CustomerOrderDTO updated = waiterDashboardService.confirmOrder(id);
    return ResponseEntity.ok(updated);
  }
}
