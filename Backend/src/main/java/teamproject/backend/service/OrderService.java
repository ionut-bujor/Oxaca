package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.repository.CustomerOrderRepository;

/**
 * This class handles the service layer for orders.
 */
@Service
@Transactional
public class OrderService {

  private final CustomerOrderRepository orderRepository;
  private final OrderMapper orderMapper;

  /**
  * Constructor for Order service.
  *
  * @param orderRepository calls the CustomerOrderRepository.
  *
  * @param orderMapper uses the orderMapper class.
  */
  public OrderService(CustomerOrderRepository orderRepository, OrderMapper orderMapper) {
    this.orderMapper = orderMapper;
    this.orderRepository = orderRepository;
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
}
