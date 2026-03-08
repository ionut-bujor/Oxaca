package teamproject.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * This Table represents an each item that is being ordered.
 */
@Entity
@Table(name = "order_item")
public class OrderItem {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name = "quantity")
  private int quantity;

  @ManyToOne
  @JoinColumn(name = "customer_order_id")
  private CustomerOrder order;

  @ManyToOne
  @JoinColumn(name = "menu_item_id")
  private MenuItem menuItem;

  @Column(name = "item_name")
  private String name;

  /**
   * This Constructs an order item to be attached to an order, menuitem and its quantity.
   *
   * @param order The order it is attached to.
   * @param menuItem The menuitem it represents.
   * @param quantity The quantity of the chosen menuitem.
   */
  public OrderItem(CustomerOrder order, MenuItem menuItem, int quantity) {
    this.order = order;
    this.menuItem = menuItem;
    this.quantity = quantity;
  }

  /**
   * This calculates the price of the orderitem.
   */
  public BigDecimal getLinePrice() {
    return menuItem.getPrice().multiply(BigDecimal.valueOf(quantity));
  }

  /**
   * This Makes the name of each orderitem match its menuitem name.
   */
  public void syncFromMenuItem() {
    this.name = menuItem.getName();
  }

  /**
   * Constructor for JPA.
   */
  public OrderItem() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public CustomerOrder getOrder() {
    return order;
  }

  public void setOrder(CustomerOrder order) {
    this.order = order;
  }

  public MenuItem getMenuItem() {
    return menuItem;
  }

  public void setMenuItem(MenuItem menuItem) {
    this.menuItem = menuItem;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}