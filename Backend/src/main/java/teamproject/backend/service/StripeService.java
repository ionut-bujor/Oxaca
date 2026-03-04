package teamproject.backend.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import java.math.BigDecimal;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.model.CustomerOrder;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.CustomerOrderRepository;

@Service
public class StripeService {

  @Value("${stripe.secret.key}")
  private String stripeSecretKey;

  private final CustomerOrderRepository customerOrders;

  public StripeService(CustomerOrderRepository customerOrders) {
    this.customerOrders = customerOrders;
  }

  public CustomerOrder findCustomerOrder(Long id) {
    return customerOrders.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "This order doesn't exist"));
  }

  public Map<String, String> createCheckoutSession(Long orderId) throws Exception {

    CustomerOrder order = findCustomerOrder(orderId);

    if (order.getItems() == null || order.getItems().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order has no items");
    }

    Stripe.apiKey = stripeSecretKey;

    SessionCreateParams.Builder builder = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl("http://localhost:3000/cancel")
        .putMetadata("orderId", String.valueOf(orderId));

    for (MenuItem item : order.getItems()) {

      long unitAmount = item.getPrice()
          .movePointRight(2)
          .longValueExact(); // converts £12.50 → 1250

      builder.addLineItem(
          SessionCreateParams.LineItem.builder()
              .setQuantity((long) item.getQuantity())
              .setPriceData(
                  SessionCreateParams.LineItem.PriceData.builder()
                      .setCurrency("gbp")
                      .setUnitAmount(unitAmount)
                      .setProductData(
                          SessionCreateParams.LineItem.PriceData.ProductData.builder()
                              .setName(item.getName())
                              .build()
                      )
                      .build()
              )
              .build()
      );
    }

    Session session = Session.create(builder.build());
    return Map.of("url", session.getUrl());
  }
}
