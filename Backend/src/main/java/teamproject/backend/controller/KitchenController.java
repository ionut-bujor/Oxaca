package teamproject.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.Role;
import teamproject.backend.security.RequireRole;
import teamproject.backend.service.KitchenDashboardService;

/**
 *This is the controller for the kitchen Dashboard.
 */
@RestController
@RequestMapping("/api/v1/kitchenDashboard")
public class KitchenController {

  private final KitchenDashboardService kitchenService;
 
  /**
   * This constructs the controller for kitchen service.
   *
   * @param kitchenService This holds the business logic for kitchen controller.
   */
  public KitchenController(KitchenDashboardService kitchenService) {
    this.kitchenService = kitchenService;
  }

  /**
   * This changes the status of an order to ready.
   *
   * @param id The id of the order.
   * @return The updated order DTO
   */
  @PostMapping("/readyOrder/{id}")
  @RequireRole({Role.KITCHEN})
  public ResponseEntity<CustomerOrderDTO> readyOrder(@PathVariable Long id) {
    CustomerOrderDTO updated = kitchenService.readyOrder(id);
    return ResponseEntity.ok(updated);
  }
}
