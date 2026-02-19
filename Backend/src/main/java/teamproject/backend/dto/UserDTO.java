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
  private String firstName;
  private String lastName;

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

  public String getFirstName() {
    return this.firstName;
  }

  public String getlastName() {
    return this.lastName;
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

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setlastName(String lastName) {
    this.lastName = lastName;
  }

}
