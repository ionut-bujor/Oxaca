package teamproject.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import teamproject.backend.model.OrderStatus;

/**
 * Data Transfer Object representing a customer's order.
 */
public class CustomerOrderDTO {
  private Long id;
  private int tableNumber;
  private OrderStatus status;
  private LocalDateTime createdAt;
  private List<ItemDTOHelper> items;
  private BigDecimal totalPrice;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(int tableNumber) {
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

  public List<ItemDTOHelper> getItems() {
    return items;
  }

  public void setItems(List<ItemDTOHelper> items) {
    this.items = items;
  }

  public BigDecimal getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(BigDecimal totalPrice) {
    this.totalPrice = totalPrice;
  }
}
