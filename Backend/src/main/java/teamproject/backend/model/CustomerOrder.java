package teamproject.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private OrderStatus status;

  @Column(name = "paid", nullable = false)
  private boolean paid;

  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL,
             orphanRemoval = true, fetch = FetchType.EAGER)
  private List<OrderItem> items = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;


  /**
   * Constructs an order.
   *
   * @param tableNumber This is the tableNumber the order comes from.
   */
  public CustomerOrder(int tableNumber) {
    this.tableNumber = tableNumber;
    this.items = new ArrayList<>();
  }

  /**
   * Constructor for JPA sake.
   */
  public CustomerOrder() {
    // JPA only.
  }

  /**
   * Adds a CustomerOrderItem to the list of customer order items.
   *
   * @param menuItem The item being added.
   * @param quantity The amount of times the item is added.
   */
  public void addItem(MenuItem menuItem, int quantity) {
    OrderItem item = new OrderItem(this, menuItem, quantity);
    items.add(item);
  }

  /**
   * Removes a CustomerOrderItem from the list of customer order items.
   *
   * @param menuItem The item being removed.
   */
  public void removeItem(MenuItem menuItem) {
    OrderItem item = new OrderItem(this, menuItem, menuItem.getQuantity());
    items.remove(item);
  }

  /**
   * Increases the quantity of a provided CustomerOrderItem.
   *
   * @param menuItem The item that is having its quantity increased.
   * @param quantity The amount the quantity is changing to.
   */
  public void increase(MenuItem menuItem, int quantity) {
    OrderItem item = new OrderItem(this, menuItem, menuItem.getQuantity());
    item.setQuantity(quantity);
  }

  /**
   * Decreases the quantity of a provided CustomerOrderItem.
   *
   * @param menuItem The item being decreased.
   * @param quantity The amount the quantity is changing to.
   */
  public void decrease(MenuItem menuItem, int quantity) {
    OrderItem item = new OrderItem(this, menuItem, menuItem.getQuantity());
    item.setQuantity(quantity);
  }

  /**
   * Calculates the entire price of the order.
   *
   * @param items The list of items involved in the order.
   * @return The total price.
   */
  public BigDecimal totalPrice(List<OrderItem> items) {
    BigDecimal total = BigDecimal.ZERO;
    for (OrderItem item : items) {
      total = total.add(item.getLinePrice());
    }
    return total;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(Integer tableNumber) {
    this.tableNumber = tableNumber;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public List<OrderItem> getItems() {
    return items;
  }

  public void setItems(List<OrderItem> items) {
    this.items = items;
  }

  public boolean isPaid() {
    return paid;
  }

  public void setPaid(boolean paid) {
    this.paid = paid;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
