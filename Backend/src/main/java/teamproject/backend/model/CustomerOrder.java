package teamproject.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<MenuItem> items = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;


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
    // JPA only.
  }

  /**
   * Adds a CustomerOrderItem to the list of customer order items.
   *
   * @param item The item being added.
   * @param quantity The amount of times the item is added.
   */
  public void addItem(MenuItem item, int quantity) {
    items.add(item);
    item.setQuantity(quantity + item.getQuantity());
  }

  /**
   * Removes a CustomerOrderItem from the list of customer order items.
   *
   * @param item The item being removed.
   */
  public void removeItem(MenuItem item) {
    items.remove(item);
  }

  /**
   * Increases the quantity of a provided CustomerOrderItem.
   *
   * @param item The item that is having its quantity increased.
   * @param quantity The amount the quantity is changing to.
   */
  public void increase(MenuItem item, int quantity) {
    item.setQuantity(quantity);
  }

  /**
   * Decreases the quantity of a provided CustomerOrderItem.
   *
   * @param item The item being decreased.
   * @param quantity The amount the quantity is changing to.
   */
  public void decrease(MenuItem item, int quantity) {
    item.setQuantity(quantity);
  }

  /**
   * Calculates the entire price of the order.
   *
   * @param items The list of items involved in the order.
   * @return The total price.
   */
  public BigDecimal totalPrice(List<MenuItem> items) {
    BigDecimal total = new BigDecimal(0);
    for (MenuItem item : items) {
      total.add(item.getPrice());
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

  public List<MenuItem> getItems() {
    return items;
  }

  public boolean isPaid() {
    return paid;
  }

  public void setPaid(boolean paid) {
    this.paid = paid;
  }
}
