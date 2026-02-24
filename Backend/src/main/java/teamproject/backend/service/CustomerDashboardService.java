package teamproject.backend.service;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.User;
import teamproject.backend.repository.CustomerOrderRepository;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;

@Service
public class CustomerDashboardService {
  private final MenuItemRepository menuItemRepo;
  private final ItemGroupRepository itemGroupRepo;
  private final CustomerOrderRepository customerOrderRepo;

  public CustomerDashboardService(MenuItemRepository menuItemRepo,
      ItemGroupRepository itemGroupRepo, CustomerOrderRepository customerOrderRepo) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.customerOrderRepo = customerOrderRepo;
  }

  public List<CustomerOrderDTO> getCurrentOrders(HttpSession session) {
    // pull the id of the user that is logged in to find the matching orders.
    Long id = (Long) session.getAttribute("USER_ID");
    List<CustomerOrder> matchingOrders = customerOrderRepo.findByCustomerId(id);


    //filter orders here, not delivered and not paid.
    //return those orders.
  }

  public boolean validateOrdersNotNull(List<CustomerOrder> orders) {
    if (orders.isEmpty()){
      return true;
    }
  }
}



