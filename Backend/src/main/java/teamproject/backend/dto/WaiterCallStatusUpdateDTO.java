package teamproject.backend.dto;

/**
 * Request DTO for updating waiter call status.
 */
public class WaiterCallStatusUpdateDTO {

  private String status;

  public WaiterCallStatusUpdateDTO() {}

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}