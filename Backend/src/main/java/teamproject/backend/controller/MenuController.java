package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.MenuItemDTO;
import teamproject.backend.model.MenuItem;
import teamproject.backend.model.Role;
import teamproject.backend.security.RequireRole;
import teamproject.backend.service.ServiceMenu;

/**
 * Controller used to send data to the specified endpoint relating to menu items.
 */
@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {
  private final ServiceMenu serviceMenu;

  /**
   * Constructor used to inject the service class within the MenuController.
   *
   * @param serviceMenu instance of the service class which handles logic.
   *
   */
  public MenuController(ServiceMenu serviceMenu) {
    this.serviceMenu = serviceMenu;
  }

  /**
   * Function used to send all available items to the endpoint.
   *
   * @return json file which includes all menu items.
   *
   */

  @GetMapping
  public ResponseEntity<List<MenuItemDTO>> displayMenu() {
    List<MenuItemDTO> menuItems = serviceMenu.fetchAllAvailableItems();
    return ResponseEntity.ok(menuItems);
  }

  /**
   * This function is used to add a MenuItem to the database.
   *
   * @param menuDto json file containing the information about the menu item converted to DTO
   *
   * @return status code if the menu item was stored succesfully or not
   */
  @RequireRole({Role.ADMIN, Role.WAITER, Role.KITCHEN})
  @PostMapping("/addItem")
  public ResponseEntity<MenuItem> addMenuItem(@Valid @RequestBody MenuItemDTO menuDto,
      HttpServletRequest request) {
    return serviceMenu.mapToItem(menuDto);
  }
}
