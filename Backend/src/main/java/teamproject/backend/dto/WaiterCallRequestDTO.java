package teamproject.backend.dto;

/**
 * Request DTO for creating a waiter call.
 */
public class WaiterCallRequestDTO {

  private int tableNumber;
  private String note;

  public WaiterCallRequestDTO() {}

  public int getTableNumber() {
    return tableNumber;
  }

  public void setTableNumber(int tableNumber) {
    this.tableNumber = tableNumber;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }
}