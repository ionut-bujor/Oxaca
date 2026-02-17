package teamproject.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.UserDTO;
import teamproject.backend.model.User;
import teamproject.backend.service.ServiceUser;

/**
 * Controller for endpoints relating to user CRUD.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  private final ServiceUser serviceUser;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  /**
   * Constructor used to inject the service class within the UserController.
   *
   * @param serviceUser - Instance of the service class which handles user logic.
   */
  public UserController(ServiceUser serviceUser) {
    this.serviceUser = serviceUser;
  }

  @GetMapping("/getAllUsers")
  public ResponseEntity<List<UserDTO>> displayUsers() {
    List<UserDTO> allUsers = serviceUser.getAllUsers();
    return ResponseEntity.ok(allUsers);
  }

  @PostMapping("/addUser")
  public ResponseEntity<User> addUser(@RequestParam String email, @RequestParam String password) {
    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));

    // add in call to new method in serviceuser (addUser) that adds this user to the database.

    return ResponseEntity.ok().build();
  }
}
