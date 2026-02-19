package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import teamproject.backend.dto.CreateOrderItemRequest;
import teamproject.backend.dto.CreateOrderRequest;
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
  private final OrderMapper orderMapper;
  private final MenuItemRepository menuItemRepository;

  /**
   * Constructor for Order service.
   *
   * @param orderRepository calls the CustomerOrderRepository.
   * @param orderMapper uses the orderMapper class.
   * @param menuItemRepository calls the MenuItemRepository.
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
  public CustomerOrderDTO createOrder(int tableNumber) {
    CustomerOrder order = new CustomerOrder(null, tableNumber);
    CustomerOrder saved = orderRepository.save(order);
    return orderMapper.toDto(saved);
  }

  /**
   * This creates an order with items.
   *
   * @param request the request containing tableNumber and items.
   * @return the created order.
   */
  @Transactional
  public CustomerOrderDTO createOrder(CreateOrderRequest request) {
    if (request == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body required");
    }
    if (request.getTableNumber() <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "tableNumber must be > 0");
    }
    if (request.getItems() == null || request.getItems().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order must contain at least one item");
    }

    CustomerOrder order = new CustomerOrder(null, request.getTableNumber());

    for (CreateOrderItemRequest itemReq : request.getItems()) {
      if (itemReq.getMenuItemId() == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "menuItemId is required");
      }
      if (itemReq.getQuantity() <= 0) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "quantity must be > 0");
      }

      MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
          .orElseThrow(() -> new ResponseStatusException(
              HttpStatus.NOT_FOUND, "Menu item not found: " + itemReq.getMenuItemId()));

      // Create item with quantity 0, then add requested quantity using existing logic
      CustomerOrderItem orderItem = new CustomerOrderItem(order, menuItem, 0);
      order.addItem(orderItem, itemReq.getQuantity());
    }

    CustomerOrder saved = orderRepository.save(order);
    return orderMapper.toDto(saved);
  }
}

