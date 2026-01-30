package teamproject.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import teamproject.backend.DTO.MenuItemDTO;
import teamproject.backend.Service.ServiceMenu;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {
  private final ServiceMenu serviceMenu;

  //injecting the service class (handles the logic behind data handling) within the menuController
  public MenuController(ServiceMenu serviceMenu) {
    this.serviceMenu = serviceMenu;
  }

  //sends the data in json format to specified endpoint
  @GetMapping
  public ResponseEntity<List<MenuItemDTO>> displayMenu() {
    List<MenuItemDTO> menuItems = serviceMenu.fetchAllAvailableItems();
    return ResponseEntity.ok(menuItems);
  }
}
