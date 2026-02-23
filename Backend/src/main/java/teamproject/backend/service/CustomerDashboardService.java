package teamproject.backend.service;

import teamproject.backend.repository.CustomerOrderRepository;
import teamproject.backend.repository.ItemGroupRepository;
import teamproject.backend.repository.MenuItemRepository;

public class CustomerDashboardService {
  private final MenuItemRepository menuItemRepo;
  private final ItemGroupRepository itemGroupRepo;
  private final CustomerOrderRepository customerOrderRepo;

  public CustomerDashboardService(MenuItemRepository menuItemRepo,
      ItemGroupRepository itemGroupRepo, CustomerOrderRepository customerOrderRepo) {
    this.menuItemRepo = menuItemRepo;
    this.itemGroupRepo = itemGroupRepo;
    this.customerOrderRepo = customerOrderRepo;
  }
}
