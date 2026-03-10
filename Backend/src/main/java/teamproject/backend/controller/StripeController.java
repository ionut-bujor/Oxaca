package teamproject.backend.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.CustomerOrderDTO;
import teamproject.backend.service.OrderMapper;
import teamproject.backend.service.StripeService;

/**
 * REST controller for Stripe checkout operations. Provides endpoints for creating a Stripe checkout
 * session and retrieving the order associated with the checkout.
 */
@RestController
@RequestMapping("/api/stripe")
public class StripeController {
  private final StripeService stripeService;
  private final OrderMapper orderMapper;

  /**
   * Used to inject the service and mapper classes.
   *
   * @param stripeService logic for the stripe endpoint
   * @param orderMapper mapper of the customer order
   */
  public StripeController(StripeService stripeService, OrderMapper orderMapper) {
    this.stripeService = stripeService;
    this.orderMapper = orderMapper;
  }

  /**
   * Creates a Stripe checkout session for the given order.
   *
   * @param req request containing the ID of the order being checked out
   * @return a map containing the Stripe checkout URL
   */

  @PostMapping("/create-checkout-session")
  public Map<String, String> createCheckoutSession(@RequestBody CheckoutSessionRequest req) {
    try {
      return stripeService.createCheckoutSession(req.orderId());
    } catch (Exception e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not create checkout session",
          e);
    }
  }

  /**
   * Request body used when creating a Stripe checkout session.
   *
   * @param orderId the ID of the order being paid for
   */
  public record CheckoutSessionRequest(Long orderId) {
  }

  /**
   * Endpoint used to fetch the id of the order being checked out.
   *
   * @param id of the order being checked out
   * @return the customer order dto that id matches to
   */
  @GetMapping("/order/{id}")
  public CustomerOrderDTO getCurrentOrderId(@PathVariable Long id) {
    return orderMapper.orderToDto(stripeService.findCustomerOrder(id));
  }
  @RestController
  @RequestMapping("/api/stripe")
  public class StripeWebhookController {
    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String sigHeader) {
      try {
        stripeService.handleWebhook(payload, sigHeader);
        return ResponseEntity.ok("OK");
      } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
      }

    }
  }
}
