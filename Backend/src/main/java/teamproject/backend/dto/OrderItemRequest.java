package teamproject.backend.dto;

public class OrderItemRequest {
  private Long id;
  private int quantity;

  public Long getID() {
    return id;
  }

  public void setID(Long id) {
    this.id = id;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
