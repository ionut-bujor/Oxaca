package teamproject.backend.dto;

import java.math.BigDecimal;

/**
 * Data Transfer Object representing each item in a customer order.
 */
public class CustomerOrderItemDTO {
  private Long id;
  private Long menuItemid;
  private int quantity;
  private BigDecimal unitPrice;
  private BigDecimal linePrice;

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

  public BigDecimal getUnitPrice() {
    return unitPrice;
  }

  public void setUnitPrice(BigDecimal unitPrice) {
    this.unitPrice = unitPrice;
  }

  public BigDecimal getLinePrice() {
    return linePrice;
  }

  public void setLinePrice(BigDecimal linePrice) {
    this.linePrice = linePrice;
  }
}
