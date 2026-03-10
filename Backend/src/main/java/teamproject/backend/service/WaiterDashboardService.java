package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.OrderStatus;
import teamproject.backend.repository.CustomerOrderRepository;

/**
 * This class holds the business logic for the waiter dashboard.
 */
@Service
public class WaiterDashboardService {
  private final CustomerOrderRepository orderRepository;
  private final OrderMapper orderMapper;

  /**
   * This constructs the waiter dashboard.
   *
   * @param orderRepository this holds every order that has been stored.
   * @param orderMapper this maps order objects to orderDTOs.
   */
  public WaiterDashboardService(CustomerOrderRepository orderRepository,
      OrderMapper orderMapper) {
    this.orderRepository = orderRepository;
    this.orderMapper = orderMapper;
  }

  /**
   * This method fetches orders by their table.
   *
   * @param tableNumber the table we are getting orders for.
   * @return a list of orders by their table.
   */
  @Transactional(readOnly = true)
  public List<CustomerOrderDTO> getOrderByTable(int tableNumber) {
    return orderRepository.findByTableNumber(tableNumber).stream()
        .map(orderMapper::orderToDto)
        .collect(Collectors.toList());
  }

  /**
   * This is the business logic where the order status changes to preparing.
   *
   * @param tableNumber The table number we will confirm orders for.
   * @return A list of orders with their orders confirmed.
   */
  @Transactional(readOnly = true)
  public List<CustomerOrderDTO> confirmOrder(int tableNumber) {
    return orderRepository.findByTableNumber(tableNumber).stream()
        .peek(order -> order.setStatus(OrderStatus.PREPARING))
        .map(orderRepository::save)
        .map(orderMapper::orderToDto)
        .collect(Collectors.toList());
  }
}
