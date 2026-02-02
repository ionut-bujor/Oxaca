package teamproject.backend.dto;

/**
 * Data Transfer Object representing each item in a customer order.
 */
public class CustomerOrderItemDTO {
  private Long id;
  private Long menuItemid;
  private int quantity;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getMenuItemid() {
    return menuItemid;
  }

  public void setMenuItemid(Long menuItemid) {
    this.menuItemid = menuItemid;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
