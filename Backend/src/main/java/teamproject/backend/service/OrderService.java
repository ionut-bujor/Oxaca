package teamproject.backend.service;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.MenuItem;
import teamproject.backend.model.OrderStatus;
import teamproject.backend.model.User;
import teamproject.backend.repository.CustomerOrderRepository;
import teamproject.backend.repository.MenuItemRepository;
import teamproject.backend.repository.UserRepository;

/**
 * This class handles the service layer for orders.
 */
@Service
@Transactional
public class OrderService {

  private final CustomerOrderRepository orderRepository;
  private final MenuItemRepository menuItemRepository;
  private final UserRepository userRepository;
  private final OrderMapper orderMapper;

  /**
  * Constructor for Order service.
  *
  * @param orderRepository calls the CustomerOrderRepository.
  *
  * @param orderMapper uses the orderMapper class.
  */
  public OrderService(CustomerOrderRepository orderRepository, OrderMapper orderMapper, 
      MenuItemRepository menuItemRepository,
      UserRepository userRepository) {
    this.orderMapper = orderMapper;
    this.orderRepository = orderRepository;
    this.menuItemRepository = menuItemRepository;
    this.userRepository = userRepository;
  }


  /**
  * This fetches all orders.
  *
  * @return this returns all of the orders from the order repository.
  */
  @Transactional(readOnly = true)
  public List<CustomerOrderDTO> getAllOrders() {
    return orderRepository.findAll().stream()
        .map(orderMapper::orderToDto)
        .collect(Collectors.toList());
  }


  /**
  * This fetches each order by their id.
  *
  * @param id this is the id for an order.
  * @return this returns the order.
  */
  @Transactional
  public CustomerOrderDTO getOrderById(Long id) {
    CustomerOrder order = orderRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
    return orderMapper.orderToDto(order);
  }

  /**
  * This creates an order for a table number.
  *
  * @param tableNumber This is the table number for the customer.
  * @return This returns the order for the customer.
  */
  @Transactional
  public CustomerOrderDTO createOrder(int tableNumber, HttpSession session) {
    if (session == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in");
    }

    Long id = (Long) session.getAttribute("USER_ID");

    if (id == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID not found");
    }
    
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
        HttpStatus.UNAUTHORIZED, "User not found"));

    
    CustomerOrder order = new CustomerOrder(tableNumber);
    order.setUser(user);
    order.setStatus(OrderStatus.PLACED);
    order.setPaid(false);

    CustomerOrder saved = orderRepository.save(order);
    return orderMapper.orderToDto(saved);
  }

  /**
   * This allows items to be added to a customer's order.
   *
   * @param orderId This is the id of the order.
   * @param menuItemid This is the id of the menuitem.
   * @param quantity This is the quantity of items being added.
   * @return This returns the request in a DTO form.
   */
  @Transactional
  public CustomerOrderDTO addItemToOrder(Long orderId, Long menuItemid, int quantity) {
    CustomerOrder order = getValidCustomerOrder(orderId);   
    MenuItem menuItem = getValidMenuItem(menuItemid);

    order.addItem(menuItem, quantity);
    return orderMapper.orderToDto(order);
  }

  /**
   * This handles the validation logic for Customer Orders.
   *
   * @param orderid The id of the customer's order.
   * @return This returns whether the Order is valid.
   */
  private CustomerOrder getValidCustomerOrder(Long orderid) {
    return orderRepository.findById(orderid).orElseThrow(() -> 
        new IllegalArgumentException("Order not found: " + orderid));
  }

  /**
   * This handles the validation logic for each Menu Item.
   *
   * @param menuItemid The id of the menu item.
   * @return This returns whether the Menu Item is valid.
   */
  private MenuItem getValidMenuItem(Long menuItemid) {
    return menuItemRepository.findById(menuItemid).orElseThrow(() ->
        new IllegalArgumentException("MenuItem order found: " + menuItemid));
  }
}
