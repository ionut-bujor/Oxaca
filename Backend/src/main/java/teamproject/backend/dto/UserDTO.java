package teamproject.backend.dto;

import teamproject.backend.model.Role;

/**
 * Data Transfer Object representing a user entity.
 */
public class UserDTO {

  // Same as user entity except without passwordHash for better security.
  private Long id;
  private String email;
  private Role role;

  // Getters + Setters

  public Long getId() {
    return this.id;
  }

  public String getEmail() {
    return this.email;
  }

  public Role getRole() {
    return this.role;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
