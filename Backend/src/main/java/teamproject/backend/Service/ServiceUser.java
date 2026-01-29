package teamproject.backend.Service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpSession;
import teamproject.backend.Model.Role;
import teamproject.backend.Model.User;
import teamproject.backend.Repository.UserRepository;

@Service
public class ServiceUser {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public ServiceUser(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // Authenticates a user, will be used in the login end-point.
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

  // Stores in a session the users ID (to check identity) and role (to check permissions).
  public void storeSession(HttpSession session, User user) {
    session.setAttribute("USER_ID", user.getId());
    session.setAttribute("ROLE", user.getRole());
  }

  // Helper method - checks if the user is logged in.
  public boolean isLoggedIn(HttpSession session) {
    if (session == null || (session.getAttribute("USER_ID") == null)) {
      return false;
    }

    return true;
  }

  // Checks if the user is logged in and has the specified role.
  public void requireRole(HttpSession session, Role role) {
    if (!isLoggedIn(session)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    if (session.getAttribute("ROLE") != role) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }
  }
}
