package teamproject.backend.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.model.Role;
import teamproject.backend.model.User;
import teamproject.backend.repository.UserRepository;

/**
 * Contains business logic for the UserController.
 */
@Service
public class ServiceUser {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  /**
   * Constructor for a ServiceUser object which initialises the user repository.
   *
   * @param userRepository - The user repository to initialise.
   */
  public ServiceUser(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Authenticates a user by checking the repository for the credentials provided.
   *
   * @param email - The email the user is logging in with.
   * @param password - The password the user is logging in with.
   *
   * @return - The authenticated user.
   */
  public User authenticateUser(String email, String password) {
    User user = userRepository.findByEmail(email);

    // If the user cannot be found or has given the wrong password then for now it will just return
    // an unauthorised exception.
    if (user == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  /**
   * Stores a User's ID and role in the current session (once they have been authenticated).
   *
   * @param session - The session provided by Spring.
   * @param user - The user whose attributes will be assigned to the session.
   */
  public void storeSession(HttpSession session, User user) {
    session.setAttribute("USER_ID", user.getId());
    session.setAttribute("ROLE", user.getRole());
  }

  /**
   * Helper method to check whether a user is logged in.
   *
   * @param session - The session provided by Spring.
   * @return - A boolean representing whether the user is logged in.
   */
  public boolean isLoggedIn(HttpSession session) {
    if (session == null || (session.getAttribute("USER_ID") == null)) {
      return false;
    }

    return true;
  }

  /**
   * Helper method to permit access to certain endpoint's by setting a required role.
   *
   * @param session - The session provided by Spring.
   * @param role - The role required to grant permission.
   */
  public void requireRole(HttpSession session, Role role) {
    if (!isLoggedIn(session)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    if (session.getAttribute("ROLE") != role) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
  }
}
