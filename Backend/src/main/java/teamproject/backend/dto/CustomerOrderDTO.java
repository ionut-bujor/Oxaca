package teamproject.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object representing a customer's order.
 */
public class CustomerOrderDTO {
  private Long id;
  private int tableNumber;
  private String status;
  private LocalDateTime createdAt;
  private List<CustomerOrderItemDTO> items;

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

  public List<CustomerOrderItemDTO> getItems() {
    return items;
  }

  public void setItems(List<CustomerOrderItemDTO> items) {
    this.items = items;
  }
}
