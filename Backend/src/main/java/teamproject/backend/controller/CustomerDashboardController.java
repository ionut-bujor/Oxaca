package teamproject.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.service.CustomerDashboardService;

@RestController
@RequestMapping("/dashboard")
public class CustomerDashboardController {
  private final CustomerDashboardService customerDashboardService;

  public CustomerDashboardController(CustomerDashboardService cdService) {
    this.customerDashboardService= cdService;
  }
}
