package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.UserDTO;
import teamproject.backend.model.Role;
import teamproject.backend.model.User;
import teamproject.backend.service.ServiceUser;

/**
 * Controller for endpoints relating to user CRUD.
 */
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
  private final ServiceUser serviceUser;
  private final BCryptPasswordEncoder passwordEncoder;

  /**
   * Constructor used to inject the service class within the UserController.
   *
   * @param serviceUser - Instance of the service class which handles user logic.
   * @param passwordEncoder - The BCrypt password encoder which handles encrypting and decrypting
   *        passwords.
   */
  public UserController(ServiceUser serviceUser, BCryptPasswordEncoder passwordEncoder) {
    this.serviceUser = serviceUser;
    this.passwordEncoder = passwordEncoder;
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
   * @param firstName - The users first name.
   * @param lastName - The users last name.
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   * @return - HTTP CREATED if user is successfully added, else 400 BAD_REQUEST if an error occured.
   */
  @PostMapping("/addUser")
  public ResponseEntity<Void> addUser(@RequestParam String firstName, @RequestParam String lastName,
      @RequestParam String email, @RequestParam String password) {
    User user = new User();
    user.setFirstName(firstName);
    user.setlastName(lastName);
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setRole(Role.CUSTOMER);

    serviceUser.addUser(user);

    return ResponseEntity.status(HttpStatus.CREATED).build(); // HTTP 201 - user creation success
  }

  /**
   * API endpoint for removing a customer's account from the DB (a customer can delete their account
   * only).
   *
   * @param request - The POST request from the frontend.
   * @return - HTTP ACCEPTED if user is successfully removed, else an UNAUTHORISED status code if
   *         user is not logged in.
   */
  @PostMapping("/removeUser")
  public ResponseEntity<Void> removeUser(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    if (!serviceUser.isLoggedIn(session)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    Long userId = (Long) session.getAttribute("userId");
    serviceUser.removeUserById(userId);
    session.invalidate();

    return ResponseEntity.status(HttpStatus.ACCEPTED).build();
  }

  /**
   * API endpoint for adding a new user into the DB as an admin user.
   *
   * @param firstName - The users first name.
   * @param lastName - The users last name.
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   * @param role - The role of the new user.
   * @param request - The POST request from the frontend.
   * @return - HTTP CREATED if user is successfully added, else 400 BAD_REQUEST if an error occured.
   */
  @PostMapping("/adminAddUser")
  public ResponseEntity<Void> adminAddUser(@RequestParam String firstName,
      @RequestParam String lastName, @RequestParam String email, @RequestParam String password,
      @RequestParam String role, HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    serviceUser.requireRole(session, Role.ADMIN);

    User user = new User();
    user.setFirstName(firstName);
    user.setlastName(lastName);
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setRole(Role.valueOf(role));

    serviceUser.addUser(user);

    return ResponseEntity.status(HttpStatus.CREATED).build(); // HTTP 201 - user creation success
  }

  /**
   * API endpoint for deleting a user from the DB as an admin.
   *
   * @param email - The email of the user you want to delete.
   * @param request - The POST request from the frontend.
   * @return - HTTP ACCEPTED if the user is successfully deleted, else 400 BAD_REQUEST if an error
   *         occured.
   */
  @PostMapping("/adminRemoveUser")
  public ResponseEntity<Void> adminRemoveUser(@RequestParam String email,
      HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    serviceUser.requireRole(session, Role.ADMIN);

    serviceUser.removeUserByEmail(email);

    return ResponseEntity.status(HttpStatus.ACCEPTED).build(); // HTTP 202 - user deletion success

  }
}
