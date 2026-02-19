package teamproject.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents an order made by a customer.
 */
@Entity
@Table(name = "customer_order")
public class CustomerOrder {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "table_number")
  private int tableNumber;

  private String status = "PLACED";

  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CustomerOrderItem> items;

  /**
   * Constructs an order.
   *
   * @param id This is the order id.
   * @param tableNumber This is the tableNumber the order comes from.
   */
  public CustomerOrder(Long id, int tableNumber) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.items = new ArrayList<>();
  }

  /** 
   * Constructor for JPA sake.
  */
  public CustomerOrder() {
    //JPA only.
  }

  /**
   * Adds a CustomerOrderItem to the list of customer order items.
   *
   * @param item The item being added.
   * @param quantity The amount of times the item is added.
   */
  public void addItem(CustomerOrderItem item, int quantity) {
    items.add(item);
    item.setOrder(this);
    item.setQuantity(quantity + item.getQuantity());
  }

  /**
   * Removes a CustomerOrderItem from the list of customer order items.
   *
   * @param item The item being removed.
   */
  public void removeItem(CustomerOrderItem item) {
    items.remove(item);
    item.setOrder(null);
  }

  /**
   * Increases the quantity of a provided CustomerOrderItem.
   *
   * @param item The item that is having its quantity increased.
   * @param quantity The amount the quantity is changing to.
   */
  public void increase(CustomerOrderItem item, int quantity) {
    item.setQuantity(quantity);
  }

  /**
   * Decreases the quantity of a provided CustomerOrderItem.
   *
   * @param item The item being decreased.
   * @param quantity The amount the quantity is changing to.
   */
  public void decrease(CustomerOrderItem item, int quantity) {
    item.setQuantity(quantity);
  }

  /**
   * Calculates the entire price of the order.
   *
   * @param items The list of items involved in the order.
   * @return The total price. 
   */
  public BigDecimal totalPrice(List<CustomerOrderItem> items) {
    BigDecimal total = new BigDecimal(0);
    for (CustomerOrderItem item : items) {
      total = total.add(item.linePrice());
    }
    return total;
  }
  
  public Long getId() {
    return id;
  }

  public Integer getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(Integer tableNumber) {
    this.tableNumber = tableNumber;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public List<CustomerOrderItem> getItems() {
    return items;
  }

  
}
