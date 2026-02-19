package teamproject.backend.dto;

import java.util.List;

public class CreateOrderRequest {
  private int tableNumber;
  private List<CreateOrderItemRequest> items;

  public CreateOrderRequest() {}

  public int getTableNumber() { return tableNumber; }
  public void setTableNumber(int tableNumber) { this.tableNumber = tableNumber; }

  public List<CreateOrderItemRequest> getItems() { return items; }
  public void setItems(List<CreateOrderItemRequest> items) { this.items = items; }
}

