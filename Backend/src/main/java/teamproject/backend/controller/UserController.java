package teamproject.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.UserDTO;
import teamproject.backend.service.ServiceUser;

/**
 * Controller for endpoints relating to user CRUD.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  private final ServiceUser serviceUser;

  /**
   * Constructor used to inject the service class within the UserController.
   *
   * @param serviceUser - Instance of the service class which handles user logic.
   */
  public UserController(ServiceUser serviceUser) {
    this.serviceUser = serviceUser;
  }

  @GetMapping
  public ResponseEntity<List<UserDTO>> displayUsers() {
    List<UserDTO> allUsers = serviceUser.getAllUsers();
    return ResponseEntity.ok(allUsers);
  }
}
