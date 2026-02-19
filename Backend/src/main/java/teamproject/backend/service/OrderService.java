package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.CustomerOrderItem;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.CustomerOrderRepository;
import teamproject.backend.repository.MenuItemRepository;

/**
 * This class handles the service layer for orders.
 */
@Service
@Transactional
public class OrderService {

  private final CustomerOrderRepository orderRepository;
  private final MenuItemRepository menuItemRepository;
  private final OrderMapper orderMapper;

  /**
  * Constructor for Order service.
  *
  * @param orderRepository calls the CustomerOrderRepository.
  *
  * @param orderMapper uses the orderMapper class.
  */
  public OrderService(CustomerOrderRepository orderRepository, OrderMapper orderMapper, 
      MenuItemRepository menuItemRepository) {
    this.orderMapper = orderMapper;
    this.orderRepository = orderRepository;
    this.menuItemRepository = menuItemRepository;
  }


  /**
  * This fetches all orders.
  *
  * @return this returns all of the orders from the order repository.
  */
  @Transactional(readOnly = true)
  public List<CustomerOrderDTO> getAllOrders() {
    return orderRepository.findAll().stream()
        .map(orderMapper::toDto)
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
    return orderMapper.toDto(order);
  }

  /**
  * This creates an order for a table number.
  *
  * @param tableNumber This is the table number for the customer.
  * @return This returns the order for the customer.
  */
  @Transactional
  public CustomerOrderDTO createOrder(Long id, int tableNumber) {
    CustomerOrder order = new CustomerOrder(id, tableNumber);
    CustomerOrder saved = orderRepository.save(order);
    return orderMapper.toDto(saved);
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
    CustomerOrder order = orderRepository.findById(orderId)
        .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
      
    MenuItem menuItem = menuItemRepository.findById(menuItemid)
        .orElseThrow(() -> new IllegalArgumentException("Menu Item not found: " + menuItemid));

    CustomerOrderItem orderItem = new CustomerOrderItem(order, menuItem, quantity);
    order.addItem(orderItem, quantity);
    return orderMapper.toDto(order);
  }
}
