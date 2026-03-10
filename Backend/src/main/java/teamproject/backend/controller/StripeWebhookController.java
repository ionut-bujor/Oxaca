package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.service.StripeService;

/**
 * Used to receive the POST object from Stripe API.
 */
@RestController
@RequestMapping("/api/stripe")
public class StripeWebhookController {

  private final StripeService stripeService;

  public StripeWebhookController(StripeService stripeService) {
    this.stripeService = stripeService;
  }

  /**
   * Handles incoming Stripe webhook POST requests by reading the raw request body
   * and forwarding it to the service layer for signature verification and processing.
   *
   * @param request the raw HTTP request used to extract the unmodified payload body
   * @param sigHeader the Stripe-Signature header used to verify the webhook authenticity
   * @return HTTP 200 with "OK" if the event was processed successfully,
   *         HTTP 400 with the error message if verification or processing fails
   */

  @PostMapping("/webhook")
  public ResponseEntity<String> handleWebhook(
      HttpServletRequest request,
      @RequestHeader("Stripe-Signature") String sigHeader) {
    try {
      String payload = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
      stripeService.handleWebhook(payload, sigHeader);
      return ResponseEntity.ok("OK");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
