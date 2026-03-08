package teamproject.backend.dto;

import java.util.List;

public class CreateOrderRequest {
  private List<OrderItemRequest> items;
  private int tableNumber;

  public List<OrderItemRequest> getItems() {
    return items;
  }

  public void setItems(List<OrderItemRequest> items) {
    this.items = items;
  }

  public int getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(int tableNumber) {
    this.tableNumber = tableNumber;
  }
}
