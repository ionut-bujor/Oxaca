package teamproject.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import teamproject.backend.dto.CreateOrderRequest;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.service.OrderService;

@RestController
@RequestMapping("/api/v1")

public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping("/orders/{id}")
  public ResponseEntity<CustomerOrderDTO> getOrder(@PathVariable Long id) {
    CustomerOrderDTO order = orderService.getOrderById(id);
    return ResponseEntity.ok(order);
  }

  @GetMapping("/orders")
  public ResponseEntity<List<CustomerOrderDTO>> getAllOrders() {
    List<CustomerOrderDTO> orders = orderService.getAllOrders();
    return ResponseEntity.ok(orders);
  }

  @PostMapping("/orders")
  public ResponseEntity<CustomerOrderDTO> createOrder(@RequestBody CreateOrderRequest request) {
    CustomerOrderDTO created = orderService.createOrder(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
}
