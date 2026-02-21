package teamproject.backend.service;

import java.util.ArrayList;
import java.util.List;
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
  private final OrderMapper orderMapper;
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
      MenuTypeRepository menuTypeRepo, OrderMapper orderMapper) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.menuTypeRepo = menuTypeRepo;
    this.orderMapper = orderMapper;
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
        availableItems.add(orderMapper.itemToDto(item));
      }
    }
    return availableItems;
  }  

  public OrderMapper getOrderMapper() {
    return orderMapper;
  }

  public ItemGroupRepository getItemGroupRepo() {
    return itemGroupRepo;
  }

  public MenuTypeRepository getMenuTypeRepo() {
    return menuTypeRepo;
  }
}

