package teamproject.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Represents an item in an order made by a customer.
 */
@Entity
@Table(name = "customer_order_item")
public class CustomerOrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "menu_item_id")
  private MenuItem menuItem;

  private int quantity;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id")
  private CustomerOrder order;

  /**
   * Constructs the item the customer is ordering.
   *
   * @param order the order the orderItem is attached to.
   * @param menuItem the item being ordered.
   * @param quantity the amount of times an item is ordered.
   */
  public CustomerOrderItem(CustomerOrder order, MenuItem menuItem, int quantity) {
    this.order = order;
    this.menuItem = menuItem;
    this.quantity = quantity;
  }

  /**
   * Constructor for JPA sake.
   */
  protected CustomerOrderItem() {
    //JPA only.
  }

  /**
   * This returns the price of each CustomerOrderItem.
   *
   * @return The price of each item.
   */
  public BigDecimal price() {
    return menuItem.getPrice().multiply(BigDecimal.valueOf(quantity));
  }
    

  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public void setMenuItem(MenuItem menuItem) {
    this.menuItem = menuItem;
  }

  public MenuItem getMenuItem() {
    return menuItem;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setOrder(CustomerOrder order) {
    this.order = order;
  }

  public CustomerOrder getOrder() {
    return order;
  }


}
