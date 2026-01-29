package teamproject.backend.DTO;


import java.math.BigDecimal;
import java.util.List;

public class MenuItemDTO {

  private Long id;
  private String title;
  private BigDecimal price_usd;
  private String desc;
  private String img;
  private String cat;
  private List<String> dietary_flags;
  private int kcal;
  private List<String> allergen_list;

  //getters and setters

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getPrice_usd() {
    return price_usd;
  }

  public String getDesc() {
    return desc;
  }

  public String getImg() {
    return img;
  }

  public String getCat() {
    return cat;
  }

  public List<String> getDietary_flags() {
    return dietary_flags;
  }

  public void setDietary_flags(List<String> dietary_flags) {
    this.dietary_flags = dietary_flags;
  }

  public void setCat(String cat) {
    this.cat = cat;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }

  public void setPrice_usd(BigDecimal price_usd) {
    this.price_usd = price_usd;
  }

  public int getKcal() {
    return kcal;
  }

  public void setKcal(int kcal) {
    this.kcal = kcal;
  }

  public List<String> getAllergen_list() {
    return allergen_list;
  }

  public void setAllergen_list(List<String> allergen_list) {
    this.allergen_list = allergen_list;
  }
}
