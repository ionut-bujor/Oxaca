package teamproject.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.OrderStatus;
import teamproject.backend.repository.CustomerOrderRepository;

/**
 * This class handles the business logic for the kitchen staff.
 */
@Service
public class KitchenDashboardService {
  private final CustomerOrderRepository orderRepository;
  private final OrderMapper orderMapper;

  /**
   * This constructs the kitchen dashboard.
   *
   * @param orderRepository The repository where orders are saved.
   * @param orderMapper This maps order objects to orderDTOs.
   */
  public KitchenDashboardService(CustomerOrderRepository orderRepository,
      OrderMapper orderMapper) {
    this.orderRepository = orderRepository;
    this.orderMapper = orderMapper;
  }

  /**
   * This changes the status of an order from preparing to ready.
   *
   * @param id The id of the order.
   * @return The order with its status change.
   */
  @Transactional
  public CustomerOrderDTO readyOrder(Long id) {
    CustomerOrder order = orderRepository.findById(id).orElseThrow(
        () -> new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "The Order number: " + id + " cannot be found."
      ));
    order.setStatus(OrderStatus.READY);
    CustomerOrder confirmedOrder = orderRepository.save(order);
    return orderMapper.orderToDto(confirmedOrder);
  }
}
