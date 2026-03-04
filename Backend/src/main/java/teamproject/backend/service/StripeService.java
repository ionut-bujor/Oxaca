package teamproject.backend.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.Builder;
import java.math.BigDecimal;
import java.math.RoundingMode;
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
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "This order doesn't exist"));
  }

  public Map<String, String> createCheckoutSession(Long orderId) throws Exception {
    CustomerOrder order = findCustomerOrder(orderId);
    validateOrder(order);
    Stripe.apiKey = stripeSecretKey;
    Builder builder = createResponseRedirect(orderId);
    populateBuilderObject(builder, order);
    Session session = Session.create(builder.build());
    return Map.of("url", session.getUrl());
  }

  public Builder createResponseRedirect(Long orderId) {
    SessionCreateParams.Builder
        builder = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl("http://localhost:3000/cancel")
        .putMetadata("orderId", String.valueOf(orderId));
    return builder;
  }

  public long convertPriceIntoFormat(BigDecimal price) {
    return price
        .setScale(2, RoundingMode.HALF_UP)
        .movePointRight(2)
        .longValueExact();
  }

  public void validateOrder(CustomerOrder order) {
    if (order.getItems() == null || order.getItems().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order has no items");
    }
  }

  public void validateOrderItems(MenuItem item) {
    if (item.getName() == null || item.getName().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item name is missing");
    }
    if (item.getPrice() == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item price is missing");
    }
    if (item.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Invalid item price, price can't be negative");
    }
    if (item.getQuantity() <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Invalid item quantity, cant have negative or 0 products");
    }
  }

  public void assignValuesToCheckoutObject(Builder builder, long price, MenuItem item) {
    builder.addLineItem(
        SessionCreateParams.LineItem.builder()
            .setQuantity((long) item.getQuantity())
            .setPriceData(
                SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency("gbp")
                    .setUnitAmount(price)
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

  public void populateBuilderObject(Builder builder, CustomerOrder order) {
    for (MenuItem item : order.getItems()) {
      validateOrderItems(item);
      long price = convertPriceIntoFormat(item.getPrice());
      assignValuesToCheckoutObject(builder, price, item);
    }
  }
}
