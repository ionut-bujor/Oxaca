package teamproject.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  private Role role;

  // Default constructor for JPA mapping
  public User() {}


  // Setters + Getters
  public Long getId() {
    return this.id;
  }

  public String getEmail() {
    return this.email;
  }

  public String passwordHash() {
    return this.passwordHash;
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

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}