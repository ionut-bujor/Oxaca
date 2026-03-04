package teamproject.backend.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.service.OrderMapper;
import teamproject.backend.service.StripeService;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {
  private final StripeService stripeService;
  private final OrderMapper orderMapper;

  public StripeController(StripeService stripeService, OrderMapper orderMapper) {
    this.stripeService = stripeService;
    this.orderMapper = orderMapper;
  }

  @PostMapping("/create-checkout-session")
  public Map<String, String> createCheckoutSession(@RequestBody CheckoutSessionRequest req) {
    try {
      return stripeService.createCheckoutSession(req.orderId());
    } catch (Exception e) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Could not create checkout session");
    }
  }

  public record CheckoutSessionRequest(Long orderId) {}

  @GetMapping("/order/{id}")
  public CustomerOrderDTO getCurrentOrderId(@PathVariable Long id) {
    return orderMapper.orderToDto(stripeService.findCustomerOrder(id));
  }
}
