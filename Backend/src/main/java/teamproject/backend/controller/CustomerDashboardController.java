package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.Role;
import teamproject.backend.security.RequireRole;
import teamproject.backend.service.CustomerDashboardService;

/**
 * Controller used to perform CRUD operations on customer dashboard.
 */
@RestController
@RequestMapping("/dashboard")
public class CustomerDashboardController {
  private final CustomerDashboardService customerDashboardService;

  /**
   * Providing the service logic class for business logic handling.
   *
   * @param cdService instance of the service class which has business logic for dashboard
   */
  public CustomerDashboardController(CustomerDashboardService cdService) {
    this.customerDashboardService = cdService;
  }

  /**
   * Handles GET request regarding orders, only returns the ones that are related
   * to the user logged in.
   *
   * @param request provides the session so that user can be identified.
   * @return dto of the customer orders.
   */
  @GetMapping
  @RequireRole({Role.ADMIN, Role.WAITER, Role.CUSTOMER, Role.KITCHEN})
  public ResponseEntity<List<CustomerOrderDTO>> displayCurrentOrders(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    List<CustomerOrderDTO> currentOrders = customerDashboardService.getCurrentOrders(session);
    return ResponseEntity.ok(currentOrders);
  }
}
