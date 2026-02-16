package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.dto.UserDTO;
import teamproject.backend.model.User;
import teamproject.backend.service.ServiceUser;

/**
 * Controller for endpoints relating to user authentication.
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final ServiceUser serviceUser;

  /**
   * Constructor used to inject the service class within the UserController.
   *
   * @param serviceUser - Instance of the service class which handles user logic.
   */
  public AuthController(ServiceUser serviceUser) {
    this.serviceUser = serviceUser;
  }

  /**
   * API endpoint for login, parameters are passed from a form and authenticated against the user
   * database. If successful, the user's session is stored.
   *
   * @param email - The parameter from the form with the provided email (parsed from the request)
   * @param password - The parameter from the form with the provided password (parsed from the
   *        request)
   * @param request - The request itself.
   * @return - HTTP 200 if user is successfully authenticated.
   */
  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestParam String email, @RequestParam String password,
      HttpServletRequest request) {

    User user = serviceUser.authenticateUser(email, password);

    HttpSession session = request.getSession(true);
    serviceUser.storeSession(session, user);

    return ResponseEntity.ok().build();
  }

  /**
   * API endpoint for logout, the request is received from the frontend and if a session is found,
   * then it is invalidated and the user is "logged out".
   *
   * @param request - The request from the frontend
   */
  @PostMapping("/logout")
  public void logout(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }
  }

  /**
   * API endpoint for getCurrentUser, finds the currently logged in user and returns it as a DTO.
   *
   * @param session - The session provided by Spring.
   * @return - The current user in DTO format.
   */
  @GetMapping("/getCurrentUser")
  public UserDTO getCurrentUser(HttpSession session) {
    User user = serviceUser.getCurrentUser(session);

    UserDTO userDto = new UserDTO();
    userDto.setId(user.getId());
    userDto.setEmail(user.getEmail());
    userDto.setRole(user.getRole());

    return userDto;
  }

}
