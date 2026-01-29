package teamproject.backend.Model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MenuItem {

  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "name", nullable = false, length = 30)
  private String name;

  @Column (name ="description",nullable = false, length = 100)
  private String description;

  @Column (name = "quantity", nullable = false)
  private int quantity;

  @Column (name = "price", nullable = false, precision =10, scale =2)
  private BigDecimal price;

  @Column (name = "image_url",nullable = false)
  private String imageURL;

  @Column (name = "calories")
  private int calories;

  //this means that this is stored in a different table to not break normalisation principles
  // one-many relationship between the menu item and the allergies
  @ElementCollection
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "menu_item_allergens", joinColumns = @JoinColumn(name = "menu_item_id"))
  @Column(name="allergens")
  private List<Allergens> allergens = new ArrayList<>();

  @ElementCollection
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "menu_item_tags", joinColumns = @JoinColumn(name = "menu_item_id"))
  @Column(name = "tag")
  private List<DietaryTag> tags = new ArrayList<>();

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

  public int getCalories() {
    return calories;
  }

  public void setCalories(int calories) {
    this.calories = calories;
  }

  public List<Allergens> getAllergens() {
    return allergens;
  }

  public void setAllergens(List<Allergens> allergens) {
    this.allergens = allergens;
  }

  public List<DietaryTag> getTags() {
    return tags;
  }

  public void setTags(List<DietaryTag> tags) {
    this.tags = tags;
  }
}

