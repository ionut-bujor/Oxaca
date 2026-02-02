package teamproject.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.MenuItemDTO;
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
   * @param serviceMenu instance of the service class which handles logic.
   *
   */
  public MenuController(ServiceMenu serviceMenu) {
    this.serviceMenu = serviceMenu;
  }

  /**
   * Function used to send all available items to the endpoint.
   * @return json file which includes all menu items.
   *
   */
  @GetMapping
  public ResponseEntity<List<MenuItemDTO>> displayMenu() {
    List<MenuItemDTO> menuItems = serviceMenu.fetchAllAvailableItems();
    return ResponseEntity.ok(menuItems);
  }
}
