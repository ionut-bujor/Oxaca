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

}
