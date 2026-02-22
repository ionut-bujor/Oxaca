package teamproject.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.MenuItemDTO;
import teamproject.backend.model.ItemGroup;
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
   * @param menuItemRepo  - The menu item repository to initialise.
   * @param itemGroupRepo - The item group repository to initialise.
   * @param menuTypeRepo  - The menu type repository to initialise.
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

  /**
   * This maps a dto into a menu item based on the values given by waiter.
   *
   * @param dto the dto objects made by jpa based on json values
   * @return status code if the menu item has been successfully stored or not
   */

  public MenuItem mapToItem(MenuItemDTO dto) {
    MenuItem menuItem = new MenuItem();
    menuItem.setName(dto.getTitle());
    menuItem.setDescription(dto.getDesc());
    menuItem.setPrice(dto.getPrice_usd());
    menuItem.setImageUrl(dto.getImg());
    menuItem.setCalories(dto.getKcal());
    menuItem.setAllergens(dto.getAllergen_list());
    menuItem.setTags(dto.getDietary_flags());
    menuItem.setQuantity(10);
    ItemGroup group = validateDto(dto);
    if (group != null) {
      menuItem.setItemGroup(group);
    } else {
      //category doesn't exist in the repository, ideally frontend should ask for new category
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category");
    }
    return menuItem;
  }
  /**
   * This checks if the category of the item exists.
   *
   * @param menuItemDto the dto which includes the data sent from the frontend.
   *
   * @return the itemGroup instance that the menu item belongs to.
   */

  public ItemGroup validateDto(MenuItemDTO menuItemDto) {
    String category = menuItemDto.getCat();
    // if category exists ... valid in that case add it to the DTO because its a string in the DTO
    for (ItemGroup itemGroup : itemGroupRepo.findAll()) {
      if (itemGroup.getName().equals(category)) {
        return itemGroup;
      }
    }
    return null;
  }

  /**
   * Function used to add a menuItem to database.
   * It maps dto into an item to be able to store it
   * Saves the entity into the repository
   *
   * @param menuItemDto The dto which is sent from the frontend.
   * @return DTO which represents the entity stored in the database.
   */
  public MenuItemDTO addMenuItem(MenuItemDTO menuItemDto) {
    MenuItem menuItem = mapToItem(menuItemDto);
    MenuItem savedEntity = menuItemRepo.save(menuItem);
    return mapToDto(savedEntity);
  }

  public MenuItemDTO updateItem(Long id, MenuItemDTO menuDto) {
    // find which item the id related to
    MenuItem menuItem = findItemById(id);
    // find which fields are being changed via menuDto


  }

  public MenuItem findItemById(Long id) {
    MenuItem menuItem = menuItemRepo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "I'd doesnt match any record. "
        ));
    return menuItem;
  }

  public void updateFields(MenuItemDTO menuDto) {
    // function here to find which fields are null
  }
}

