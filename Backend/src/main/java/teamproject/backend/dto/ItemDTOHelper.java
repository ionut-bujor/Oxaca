package teamproject.backend.dto;

public class ItemDTOHelper {
  private String menuItemName;
  private int menuItemQuantity;
  private Long menuItemId;

  public String getMenuItemName() {
    return menuItemName;
  }

  public void setMenuItemName(String menuItemName) {
    this.menuItemName = menuItemName;
  }

  public int getMenuItemQuantity() {
    return menuItemQuantity;
  }

  public void setMenuItemQuantity(int menuItemQuanity) {
    this.menuItemQuantity = menuItemQuanity;
  }

  public Long getMenuItemId() {
    return menuItemId;
  }

  public void setMenuItemId(Long menuItemId) {
    this.menuItemId = menuItemId;
  }
}
