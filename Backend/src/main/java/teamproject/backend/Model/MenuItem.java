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
  private float price;

  @Column (nullable = false)
  private String imageURL;

  @ManyToOne
  @JoinColumn(name = "item_group_id")
  private ItemGroup itemGroup;

}

