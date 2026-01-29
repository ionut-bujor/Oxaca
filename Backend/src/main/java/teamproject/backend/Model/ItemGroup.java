package teamproject.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemGroup {
  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JoinColumn(name = "menu_type_id", nullable = false)
  private MenuType menuType;

  @Column(nullable = false, unique = false, length = 30 )
  private String name;

  //Default constructor so that JPA can map it .
  public ItemGroup(){
  }

  //getters and setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public MenuType getMenuType() {
    return menuType;
  }

  public void setMenu_type_id(MenuType menuType) {
    this.menuType= menuType;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
