package teamproject.backend.service;

import static java.util.stream.Collectors.toList;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.OrderStatus;
import teamproject.backend.model.User;
import teamproject.backend.repository.CustomerOrderRepository;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;

/**
 * Service class used to handle business logic for customer dashboard.
 */
@Service
public class CustomerDashboardService {
  private final MenuItemRepository menuItemRepo;
  private final ItemGroupRepository itemGroupRepo;
  private final CustomerOrderRepository customerOrderRepo;
  private final OrderMapper orderMapper;

  /**
   * Constructor used to inject the repositories.
   *
   * @param menuItemRepo menu item repo
   * @param itemGroupRepo item group repo
   * @param customerOrderRepo customer order repo
   * @param mapper order mapper used to convert order to dto
   */
  public CustomerDashboardService(MenuItemRepository menuItemRepo,
      ItemGroupRepository itemGroupRepo, CustomerOrderRepository customerOrderRepo,
      OrderMapper mapper) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.customerOrderRepo = customerOrderRepo;
    this.orderMapper = mapper;
  }

  /**
   * Used to retrieve current orders (!paid and !delivered).
   * It returns the ones related to the user that is logged in.
   *
   * @param session session used to determine user logged in
   * @return all the orders related to the user
   */
  public List<CustomerOrderDTO> getCurrentOrders(HttpSession session) {

    //filter orders here, not delivered and not paid.
    //status = !delivered, paid = false
    //return those orders.
    if (session == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in");
    }

    Long id = (Long) session.getAttribute("USER_ID");

    if (id == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID not found");
    }

    List<CustomerOrder> matchingOrders = customerOrderRepo.findByUserId(id);

    return matchingOrders.stream()
        .filter(order -> !order.getStatus().equals(OrderStatus.DELIVERED))
        .filter(order -> !order.isPaid())
        .map(orderMapper::orderToDto)
        .toList();
  }


}




