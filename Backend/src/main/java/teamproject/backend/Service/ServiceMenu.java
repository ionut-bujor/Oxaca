package teamproject.backend.Service;

import org.springframework.stereotype.Service;
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
}

