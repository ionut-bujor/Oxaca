package teamproject.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.service.StripeService;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "http://localhost:3000")
public class StripeController {

  @Value("${stripe.secret.key}")
  private String stripeSecretKey;
  private final StripeService stripeService;

  public StripeController(StripeService stripeService) {
    this.stripeService = stripeService;
  }

  @GetMapping("/order/{id}")
  public CustomerOrder getCurrentOrderId(@PathVariable Long id) {
    return stripeService.findCustomerOrder(id);
}
}
