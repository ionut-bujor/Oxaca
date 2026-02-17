package teamproject.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;
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

  /**
   * API endpoint for getting all users currently stored in the DB - created initially to test
   * frontend-backend communication.
   *
   * @return - The list of all users in the DB in DTO format.
   */
  @GetMapping("/getAllUsers")
  public ResponseEntity<List<UserDTO>> displayUsers() {
    List<UserDTO> allUsers = serviceUser.getAllUsers();
    return ResponseEntity.ok(allUsers);
  }

  /**
   * API endpoint for adding a new user into the DB.
   *
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   * @param session - The session provided by Spring.
   * @return - HTTP OK if user is successfully added, else 400 BAD_REQUEST if an error occured.
   */
  @PostMapping("/addUser")
  public ResponseEntity<User> addUser(@RequestParam String email, @RequestParam String password,
      HttpSession session) {
    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));

    serviceUser.addUser(user, session);

    return ResponseEntity.ok().build();
  }
}
