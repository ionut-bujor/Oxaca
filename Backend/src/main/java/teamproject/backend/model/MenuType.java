package teamproject.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

/**
 * Represents a type of menu.
 */
@Entity
public class MenuType {
  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false, unique = true, length = 30)
  private String name;

  /**
   * Default constructor so that JPA can map it.
   */
  public MenuType() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
