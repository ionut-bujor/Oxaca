package teamproject.backend.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import teamproject.backend.dto.MenuItemDto;
import teamproject.backend.model.MenuItem;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;
import teamproject.backend.repository.MenuTypeRepository;

@Service
public class ServiceMenu {
  private final MenuItemRepository menuItemRepo;
  private final ItemGroupRepository itemGroupRepo;
  private final MenuTypeRepository menuTypeRepo;

  // Constructor used to initialise all the repositories.
  public ServiceMenu(MenuItemRepository menuItemRepo, ItemGroupRepository itemGroupRepo,
      MenuTypeRepository menuTypeRepo) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.menuTypeRepo = menuTypeRepo;
  }

  // function used to get all the menu items that are available (quantity >0)
  public List<MenuItemDto> fetchAllAvailableItems() {
    List<MenuItem> allItems = menuItemRepo.findAll();
    return parseForAvailable(allItems);
  }

  // helper function to find all available items
  public List<MenuItemDto> parseForAvailable(List<MenuItem> allItems) {
    List<MenuItemDto> availableItems = new ArrayList<>();
    for (MenuItem item : allItems) {
      if (item.getQuantity() > 0) {
        availableItems.add(mapToDto(item));
      }
    }
    return availableItems;
  }


  // this function is used to change the menuitems into the dto to match the format
  public MenuItemDto mapToDto(MenuItem menuItem) {
    MenuItemDto dto = new MenuItemDto();
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
}

