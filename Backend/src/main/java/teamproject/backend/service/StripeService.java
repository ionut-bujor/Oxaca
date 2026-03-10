package teamproject.backend.service;

import com.stripe.Stripe;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
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
import teamproject.backend.model.OrderItem;
import teamproject.backend.model.OrderStatus;
import teamproject.backend.repository.CustomerOrderRepository;

/**
 * Logic used to create a checkout session using Stripe API.
 */
@Service
public class StripeService {

  @Value("${stripe.secret.key}")
  private String stripeSecretKey;

  @Value("${stripe.webhook.secret}")
  private String webhookSecret;  // add this

  private final CustomerOrderRepository customerOrders;

  /**
   * Injection of the customer order repositories.
   *
   * @param customerOrders repo of customer orders
   */
  public StripeService(CustomerOrderRepository customerOrders) {
    this.customerOrders = customerOrders;
  }

  /**
   * Used to find the order using the id of the order.
   *
   * @param id id of the order being checked out
   * @return the customer order
   */

  public CustomerOrder findCustomerOrder(Long id) {
    return customerOrders.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "This order doesn't exist"));
  }

  /**
   * Used to create the checkout session object.
   *
   * @param orderId of the order being checked out
   *
   * @return map of the items being purchased
   *
   * @throws Exception if the checkout session fails.
   */
  public Map<String, String> createCheckoutSession(Long orderId) throws Exception {
    CustomerOrder order = findCustomerOrder(orderId);
    validateOrder(order);
    Stripe.apiKey = stripeSecretKey;
    Builder builder = createResponseRedirect(orderId);
    populateBuilderObject(builder, order);
    Session session = Session.create(builder.build());
    return Map.of("url", session.getUrl());
  }

  /**
   * Used to redirect the customer after finishing checking out
   * based on if the payment went through or something was wrong.
   *
   * @param orderId order being paid for
   * @return builder object
   */
  public Builder createResponseRedirect(Long orderId) {
    SessionCreateParams.Builder
        builder = SessionCreateParams.builder()
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl("http://localhost:5173/cancel")
        .putMetadata("orderId", String.valueOf(orderId));
    return builder;
  }

  /**
   * Convert price into stripe format.
   *
   * @param price big decimal format
   *
   * @return Stripe format i.e 1225
   */
  public long convertPriceIntoFormat(BigDecimal price) {
    return price
        .setScale(2, RoundingMode.HALF_UP)
        .movePointRight(2)
        .longValueExact();
  }

  /**
   * This is used to validate the order, make sure its not empty.
   *
   * @param order being checked out
   */

  public void validateOrder(CustomerOrder order) {
    if (order.getItems() == null || order.getItems().isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Order has no items");
    }
  }

  /**
   * Validating that the items are valid.
   *
   * @param item individual item from the order
   */
  public void validateOrderItems(OrderItem item) {
    if (item.getName() == null || item.getName().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item name is missing");
    }
    if (item.getLinePrice() == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item price is missing");
    }
    if (item.getLinePrice().compareTo(BigDecimal.ZERO) <= 0) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "Invalid item price, price can't be negative");
    }
    if (item.getQuantity() <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Invalid item quantity, cant have negative or 0 products");
    }
  }

  /**
   * Assigning the item to the Stripe checkout object.
   *
   * @param builder stripe checkout object
   * @param price price of the item
   * @param item that is included in the order
   */

  public void assignValuesToCheckoutObject(Builder builder, long price, OrderItem item) {
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

  /**
   * Function used to add all items from an order to the stripe object.
   *
   * @param builder Stripe checkout object
   * @param order being checked out
   */

  public void populateBuilderObject(Builder builder, CustomerOrder order) {
    for (OrderItem item : order.getItems()) {
      validateOrderItems(item);
      long price = convertPriceIntoFormat(item.getLinePrice());
      assignValuesToCheckoutObject(builder, price, item);
    }
  }

  public void handleWebhook(String payload, String sigHeader) throws Exception {
    Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

    if ("checkout.session.completed".equals(event.getType())) {
      Session session = (Session) event.getDataObjectDeserializer()
          .getObject()
          .orElseThrow();

      Long orderId = Long.parseLong(session.getMetadata().get("orderId"));

      CustomerOrder order = findCustomerOrder(orderId);
      System.out.println("Changing the order status here");
      order.setStatus(OrderStatus.DELIVERED);
      order.setPaid(true);
      customerOrders.save(order);
    }
  }
}
