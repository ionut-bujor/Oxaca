package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.service.StripeService;

// StripeWebhookController.java
@RestController
@RequestMapping("/api/stripe")
public class StripeWebhookController {

  private final StripeService stripeService;

  public StripeWebhookController(StripeService stripeService) {
    this.stripeService = stripeService;
  }

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
