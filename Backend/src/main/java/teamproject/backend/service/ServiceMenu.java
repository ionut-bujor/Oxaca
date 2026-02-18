package teamproject.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import teamproject.backend.dto.MenuItemDTO;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;
import teamproject.backend.repository.MenuTypeRepository;

/**
 * Contains business logic for the MenuController.
 */
@Service
public class ServiceMenu {
  private final MenuItemRepository menuItemRepo;
  private final ItemGroupRepository itemGroupRepo;
  private final MenuTypeRepository menuTypeRepo;

  /**
   * Constructor for a ServiceMenu object which initialises the menu repositories.
   *
   * @param menuItemRepo - The menu item repository to initialise.
   * @param itemGroupRepo - The item group repository to initialise.
   * @param menuTypeRepo - The menu type repository to initialise.
   */
  public ServiceMenu(MenuItemRepository menuItemRepo, ItemGroupRepository itemGroupRepo,
      MenuTypeRepository menuTypeRepo) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.menuTypeRepo = menuTypeRepo;
  }

  /**
   * Gets all menu items that are currently available (whose quantity > 0).
   *
   * @return - A list of all menu items that are currently available.
   */
  public List<MenuItemDTO> fetchAllAvailableItems() {
    List<MenuItem> allItems = menuItemRepo.findAll();
    return parseForAvailable(allItems);
  }

  /**
   * Helper method to find all menu items which are available.
   *
   * @param allItems - A list of all menu items.
   * @return - A list of all menu items that are currently available.
   */
  public List<MenuItemDTO> parseForAvailable(List<MenuItem> allItems) {
    List<MenuItemDTO> availableItems = new ArrayList<>();
    for (MenuItem item : allItems) {
      if (item.getQuantity() > 0) {
        availableItems.add(mapToDto(item));
      }
    }
    return availableItems;
  }


  /**
   * Maps from a MenuItem entity to a DTO formatted for the frontend.
   *
   * @return - The MenuItem DTO.
   */
  public MenuItemDTO mapToDto(MenuItem menuItem) {
    MenuItemDTO dto = new MenuItemDTO();
    dto.setId(menuItem.getId());
    dto.setTitle(menuItem.getName());
    dto.setDesc(menuItem.getDescription());
    dto.setPrice_usd(menuItem.getPrice());
    dto.setImg(menuItem.getImageUrl());
    dto.setKcal(menuItem.getCalories());
    dto.setAllergen_list(menuItem.getAllergens());
    dto.setDietary_flags(menuItem.getTags());
    dto.setCat(menuItem.getItemGroup().getName());

    return dto;
  }

  public MenuItem createMenuItemInstance(Map<String, String>) {

  }


}

