package teamproject.backend.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.service.OrderMapper;
import teamproject.backend.service.StripeService;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "http://localhost:3000")
public class StripeController {
  private final StripeService stripeService;
  private final OrderMapper orderMapper;

  public StripeController(StripeService stripeService, OrderMapper orderMapper) {
    this.stripeService = stripeService;
    this.orderMapper = orderMapper;
  }

  @PostMapping("/create-checkout-session")
  public Map<String, String> createCheckoutSession(@RequestBody CheckoutSessionRequest req) throws Exception {
    return stripeService.createCheckoutSession(req.orderId());
  }

  public record CheckoutSessionRequest(Long orderId) {}

  @GetMapping("/order/{id}")
  public CustomerOrderDTO getCurrentOrderId(@PathVariable Long id) {
    return orderMapper.orderToDto(stripeService.findCustomerOrder(id));
}
}
