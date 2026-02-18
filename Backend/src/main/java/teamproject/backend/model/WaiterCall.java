package teamproject.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Represents a customer request for a waiter at a specific table.
 */
@Entity
@Table(name = "waiter_call")
public class WaiterCall {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "table_number", nullable = false)
  private int tableNumber;

  @Column(name = "note")
  private String note;

  @Column(name = "status", nullable = false)
  private String status = "OPEN";

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "resolved_at")
  private LocalDateTime resolvedAt;

  @PrePersist
  private void prePersist() {
    if (status == null) {
      status = "OPEN";
    }
    if (createdAt == null) {
      createdAt = LocalDateTime.now();
    }
  }

  public WaiterCall() {}

  public WaiterCall(int tableNumber, String note) {
    this.tableNumber = tableNumber;
    this.note = note;
  }

  public void resolve() {
    status = "RESOLVED";
    resolvedAt = LocalDateTime.now();
  }

  public Long getId() {
    return id;
  }

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

  public LocalDateTime getResolvedAt() {
    return resolvedAt;
  }

  public void setResolvedAt(LocalDateTime resolvedAt) {
    this.resolvedAt = resolvedAt;
  }
}
