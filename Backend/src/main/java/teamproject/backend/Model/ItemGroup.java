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
  @JoinColumn(name = 'menu_type_id', nullable = false)
  private MenuType menu_type_id;

  @Column(nullable = false, unique = false, length = 30 )
  private String name;
  public ItemGroup(){
  }

  //gettters and setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public MenuType getMenu_type_id() {
    return menu_type_id;
  }

  public void setMenu_type_id(MenuType menu_type_id) {
    this.menu_type_id = menu_type_id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
