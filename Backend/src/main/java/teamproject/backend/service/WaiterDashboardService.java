package teamproject.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
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
   * @param id The id we will confirm orders for.
   * @return A list of orders with their orders confirmed.
   */
  @Transactional(readOnly = true)
  public CustomerOrderDTO confirmOrder(Long id) {
    CustomerOrder order = orderRepository.findById(id).orElseThrow(
      () -> new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "The Order number: " + id + " cannot be found."
      ));
    order.setStatus(OrderStatus.PREPARING);
    CustomerOrder confirmedOrder = orderRepository.save(order);
    return orderMapper.orderToDto(confirmedOrder);
  }
}
