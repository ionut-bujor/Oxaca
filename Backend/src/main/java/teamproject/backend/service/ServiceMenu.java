package teamproject.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.ItemDTOHelper;
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
        availableItems.add(itemToDto(item));
      }
    }
    return availableItems;
  }  

  public ItemGroupRepository getItemGroupRepo() {
    return itemGroupRepo;
  }

  public MenuTypeRepository getMenuTypeRepo() {
    return menuTypeRepo;
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
   * Maps from a MenuItem entity to a DTO formatted for the frontend.
   *
   * @return - The MenuItem DTO.
   */
  public MenuItemDTO itemToDto(MenuItem menuItem) {
    MenuItemDTO dto = new MenuItemDTO();
    dto.setId(menuItem.getId());
    dto.setTitle(menuItem.getName());
    dto.setDesc(menuItem.getDescription());
    dto.setQuantity(menuItem.getQuantity());
    dto.setPrice_usd(menuItem.getPrice());
    dto.setImg(menuItem.getImageUrl());
    dto.setKcal(menuItem.getCalories());
    dto.setAllergen_list(menuItem.getAllergens());
    dto.setDietary_flags(menuItem.getTags());
    dto.setCat(menuItem.getItemGroup().getName());

    return dto;
  }

  /**
   * This uses a menuItem dto and returns the items name and quantity in a list.
   *
   * @param menuItemDto This is the provided menuitem dto.
   * @return This returns the dto of a menuItem's name and quantity.
   */
  public ItemDTOHelper dtoToHelper(MenuItemDTO menuItemDto) {
    ItemDTOHelper dto = new ItemDTOHelper();
    dto.setMenuItemName(menuItemDto.getTitle());
    dto.setMenuItemQuantity(menuItemDto.getQuantity());
    return dto;
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
    return itemToDto(savedEntity);
  }

  /**
   * Function used to update an existing record of a menuItem.
   *
   * @param id id of the item being modified
   * @param menuDto dto which has the fields that need to be changed.
   * @return DTO of the item which is saved back in the repo
   */

  public MenuItemDTO updateItem(Long id, MenuItemDTO menuDto) {
    // find which item the id related to
    MenuItem originalMenuItem = findItemById(id);
    // find which fields are being changed via menuDto
    updateFields(originalMenuItem, menuDto); // passed by reference fields are changed.
    MenuItem saved = menuItemRepo.save(originalMenuItem);
    return itemToDto(saved);
  }

  /**
   * Checks and finds the menuItem in the repo which corresponds to the id specified.
   *
   * @param id id of the menuItem being searched for
   * @return the menu item
   * @throws ResponseStatusException if the item doesnt exist.
   */

  public MenuItem findItemById(Long id) {
    MenuItem menuItem = menuItemRepo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND, "Id doesnt match any record. "
        ));
    return menuItem;
  }

  /**
   * Updates the fields of a menuitem entity based on if they're not null.
   *
   * @param menuItem existing menuitem in repository which needs updating
   * @param menuDto dto which contains the fields which need to be updated.
   */

  public void updateFields(MenuItem menuItem, MenuItemDTO menuDto) {
    updateIfNotNull(menuDto.getTitle(), menuItem::setName);
    updateIfNotNull(menuDto.getDesc(), menuItem::setDescription);
    updateIfNotNull(menuDto.getPrice_usd(), menuItem::setPrice);
    updateIfNotNull(menuDto.getImg(), menuItem::setImageUrl);
    updateIfNotNull(menuDto.getKcal(), menuItem::setCalories);
    updateIfNotNull(menuDto.getAllergen_list(), menuItem::setAllergens);
    updateIfNotNull(menuDto.getDietary_flags(), menuItem::setTags);

    if (menuDto.getCat() != null) {
      menuItem.setItemGroup(validateDto(menuDto));
    }
  }

  /** helper function (lambda) which is used to check if a value of an attribute is not null
   * if it is then it calls the lambda function.
   *
   * @param newValue value which you are checking to match criteria
   * @param setter function which is called if the criteria matches
   * @param <T>  generic( works on every data type)
   */

  private <T> void updateIfNotNull(T newValue, Consumer<T> setter) {
    if (newValue != null) {
      setter.accept(newValue);
    }
  }

  /**
   * Used to delete an item from the repo.
   * Not actually deleting it as this will affect orders that contain the menuitem previously.
   * Sets the quantity to 0 so that it doesn't get displayed and can't be updated only added.
   *
   * @param id of the menu item which is being deleted.
   * @return the dto which contains the info about the item deleted.
   */

  public MenuItemDTO deleteItem(Long id) {
    MenuItem menuItem = findItemById(id);
    menuItem.setQuantity(0); // this means it doesn't get displayed but stays in database
    MenuItem saved = menuItemRepo.save(menuItem);
    return itemToDto(saved);
  }

}

