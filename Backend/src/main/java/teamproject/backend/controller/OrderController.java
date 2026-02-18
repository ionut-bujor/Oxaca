package teamproject.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.service.OrderService;

/**
 * This class handles POST requests.
 */
@RestController
@RequestMapping("/v1")
public class OrderController {

  private final OrderService orderService;

  /**
   * This is the constructor for the controller.
   *
   * @param orderService This uses the Order Service class.
   */
  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  /**
  * This gets the order based on their id.
  *
  * @param id this is the given id.
  * @return this returns the order in JSON.
  */
  @GetMapping("/orders/{id}")
  public ResponseEntity<CustomerOrderDTO> getOrder(@PathVariable Long id) {
    CustomerOrderDTO order = orderService.getOrderById(id);
    return ResponseEntity.ok(order);
  }

  /**
  * This gets all orders.
  *
  * @return all orders.
  */
  @GetMapping("/orders")
  public ResponseEntity<List<CustomerOrderDTO>> getAllOrders() {
    List<CustomerOrderDTO> orders = orderService.getAllOrders();
    return ResponseEntity.ok(orders);
  }

  /**
   * This allows customers to create an order.
   *
   * @param request This is used to get the customer's table number and id.
   * @return This returns the created order.
   */
  @PostMapping("/orders")
  public ResponseEntity<CustomerOrderDTO> createOrder(
      @RequestBody CustomerOrderDTO request) {
    CustomerOrderDTO createdOrder = orderService.createOrder(request.getId(),
        request.getTableNumber());
    return ResponseEntity.ok(createdOrder);  
  }
  
}
