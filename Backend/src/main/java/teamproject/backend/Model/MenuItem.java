package teamproject.backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity
public class MenuItem {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false, length = 30)
  private String name;

  @Column (nullable = false, length = 100)
  private String description;

  @Column (nullable = false)
  private int quantity;

  @Column (nullable = false, precision =10, scale =2)
  private BigDecimal price;

  @Column (nullable = false)
  private String imageURL;

  @ManyToOne
  @JoinColumn(name = "item_group_id")
  private ItemGroup itemGroup;

  //Default constructor for the JPA mapping.
  public MenuItem(){
  }

  //getters and setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public int getQuantity() {
    return quantity;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public String getImageURL() {
    return imageURL;
  }

  public ItemGroup getItemGroup() {
    return itemGroup;
  }

  public void setItemGroup(ItemGroup itemGroup) {
    this.itemGroup = itemGroup;
  }

  public void setImageURL(String imageURL) {
    this.imageURL = imageURL;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setName(String name) {
    this.name = name;
  }
}

