package teamproject.backend.service;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CreateOrderRequest;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.dto.OrderItemRequest;
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
        .orElseThrow(() -> new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "The Order number: " + id + " cannot be found"));
    return orderMapper.orderToDto(order);
  }

  /**
  * This creates an order for a table number.
  *
  * @param body This holds the items the customer orders.
  * @param session This checks for the user in the session.
  * @return This returns the order for the customer.
  */
  @Transactional
  public CustomerOrderDTO createOrder(CreateOrderRequest body, HttpSession session) {
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

    
    CustomerOrder order = new CustomerOrder(body.getTableNumber());
    order.setUser(user);
    order.setStatus(OrderStatus.PLACED);
    order.setPaid(false);
    if (body.getItems() != null) {
      for (OrderItemRequest itemReq : body.getItems()) {
        MenuItem item = getValidMenuItem(itemReq.getID());
        order.addItem(item, itemReq.getQuantity());
      }
    }
    CustomerOrder saved = orderRepository.save(order);
    return orderMapper.orderToDto(saved);
  }

  /**
   * This allows items to be added to a customer's order.
   *
   * @param orderId This is the id of the order.
   * @param menuItemid This is the id of the menuitem.
   * @param quantity This is the quantity of items being added.
   * @param session This checks and identifies the user in the session.
   * @return This returns the request in a DTO form.
   */
  @Transactional
  public CustomerOrderDTO addItemToOrder(Long orderId, Long menuItemid, int quantity,
      HttpSession session) {

    if (session == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in");
    }

    Long userId = (Long) session.getAttribute("USER_ID");

    if (userId == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID not found");
    }

    CustomerOrder order = getValidCustomerOrder(orderId);

    if (!order.getUser().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "You can only modify your own orders");
    }

    if (order.getStatus() != OrderStatus.PLACED) {
      throw new ResponseStatusException(HttpStatus.CONFLICT,
          "Food is already being prepared. You cannot change this order now.");
    }

    MenuItem menuItem = getValidMenuItem(menuItemid);

    order.addItem(menuItem, quantity);
    return orderMapper.orderToDto(order);
  }

  /**
   * This allows items to be removed from a customer's order.
   * Only orders with status PLACED can be modified and only by their owner.
   *
   * @param orderId This is the id of the order.
   * @param menuItemid This is the id of the menu item to remove.
   * @param session This checks and identifies the user in the session.
   * @return This returns the updated order in DTO form.
   */
  @Transactional
  public CustomerOrderDTO removeItemFromOrder(Long orderId, Long menuItemid,
      HttpSession session) {

    if (session == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in");
    }

    Long userId = (Long) session.getAttribute("USER_ID");

    if (userId == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User ID not found");
    }

    CustomerOrder order = getValidCustomerOrder(orderId);

    if (!order.getUser().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "You can only modify your own orders");
    }

    if (order.getStatus() != OrderStatus.PLACED) {
      throw new ResponseStatusException(HttpStatus.CONFLICT,
          "Food is already being prepared. You cannot change this order now.");
    }

    // Remove all entries for this menu item from the order
    order.getItems().removeIf(oi -> oi.getMenuItem().getId().equals(menuItemid));

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
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "The Order number: " + orderid + " cannot be found"));
  }

  /**
   * This handles the validation logic for each Menu Item.
   *
   * @param menuItemid The id of the menu item.
   * @return This returns whether the Menu Item is valid.
   */
  private MenuItem getValidMenuItem(Long menuItemid) {
    return menuItemRepository.findById(menuItemid).orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "The MenuItem with this id: " + menuItemid + " cannot be found"));
  }
}
