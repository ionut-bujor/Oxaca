package teamproject.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a User of the Restaurant Management System.
 */
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  private Role role;

  @Column(name = "first_name", nullable = true)
  private String firstName;

  @Column(name = "last_name", nullable = true)
  private String lastName;

  /**
   * Default constructor for JPA mapping.
   */
  public User() {}


  // Setters + Getters
  public Long getId() {
    return this.id;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPasswordHash() {
    return this.passwordHash;
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

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
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
