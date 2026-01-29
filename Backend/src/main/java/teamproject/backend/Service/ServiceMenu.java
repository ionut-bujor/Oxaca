package teamproject.backend.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import teamproject.backend.DTO.MenuItemDTO;
import teamproject.backend.Model.MenuItem;
import teamproject.backend.Repository.ItemGroupRepository;
import teamproject.backend.Repository.MenuItemRepository;
import teamproject.backend.Repository.MenuTypeRepository;

@Service
public class ServiceMenu {
    private final MenuItemRepository menuItemRepo;
    private final ItemGroupRepository itemGroupRepo;
    private final MenuTypeRepository menuTypeRepo;

    //Constructor used to initialise all the repositories.
    public ServiceMenu(
       MenuItemRepository menuItemRepo,
      ItemGroupRepository itemGroupRepo,
      MenuTypeRepository menuTypeRepo) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.menuTypeRepo = menuTypeRepo;
   }

   //function used to get all the menu items that are available (quantity >0)
   public List<MenuItemDTO> fetchAllAvailableItems() {
     List<MenuItem> allItems = menuItemRepo.findAll();
     return parseForAvailable(allItems);
   }

   //helper function to find all available items
   public List<MenuItemDTO> parseForAvailable(List<MenuItem> allItems) {
     List<MenuItemDTO> availableItems = new ArrayList<>();
      for (MenuItem item : allItems) {
        if (item.getQuantity() > 0) {
         availableItems.add(mapToDTO(item));
       }
     }
      return availableItems;
   }


  //this function is used to change the menuitems into the dto to match the format

  public MenuItemDTO mapToDTO(MenuItem menuItem) {
      MenuItemDTO dto = new MenuItemDTO();
      dto.setId(menuItem.getId());
      dto.setTitle(menuItem.getName());
      dto.setDesc(menuItem.getDescription());
      dto.setPrice_usd(menuItem.getPrice());
      dto.setImg(menuItem.getImageURL());
      dto.setKcal(menuItem.getCalories());
      dto.setAllergen_list(menuItem.getAllergens());
      dto.setDietary_flags(menuItem.getTags());
      dto.setCat(menuItem.getItemGroup().getName());

      return dto;
  }
}

