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

@RestController
@RequestMapping("/dashboard")
public class CustomerDashboardController {
  private final CustomerDashboardService customerDashboardService;

  public CustomerDashboardController(CustomerDashboardService cdService) {
    this.customerDashboardService= cdService;
  }

  @GetMapping
  @RequireRole({Role.ADMIN, Role.WAITER, Role.CUSTOMER, Role.KITCHEN})
  public ResponseEntity<List<CustomerOrderDTO>> displayCurrentOrders(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    List<CustomerOrderDTO> currentOrders = customerDashboardService.getCurrentOrders(session);
    return ResponseEntity.ok(currentOrders);
  }
}
