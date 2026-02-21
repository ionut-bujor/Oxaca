package teamproject.backend.service;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import teamproject.backend.dto.UserDTO;
import teamproject.backend.model.Role;
import teamproject.backend.model.User;
import teamproject.backend.repository.UserRepository;

/**
 * Contains business logic for the UserController and AuthController.
 */
@Service
public class ServiceUser {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  /**
   * Constructor for a ServiceUser object which initialises the user repository.
   *
   * @param userRepository - The user repository to initialise.
   */
  public ServiceUser(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
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

  /**
   * Finds the current user by getting the current ID stored in the session and searching the
   * repository for it.
   *
   * @param session - The session provided by Spring.
   * @return - The User object of the user that is currently logged in.
   */
  public User getCurrentUser(HttpSession session) {
    if (!isLoggedIn(session)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    Long userId = (Long) session.getAttribute("USER_ID");

    return userRepository.findById(userId).orElseThrow();
  }

  /**
   * Gets all users in the DB and returns them in DTO format.
   *
   * @return - A list of all users in DTO format.
   */
  public List<UserDTO> getAllUsers() {
    List<User> allUsers = userRepository.findAll();
    List<UserDTO> allUsersDto = new ArrayList<>();

    for (User user : allUsers) {
      allUsersDto.add(mapToDto(user));
    }

    return allUsersDto;
  }

  /**
   * Maps from a User entity to a DTO formatted for the frontend.
   *
   * @return - The User DTO.
   */
  public UserDTO mapToDto(User user) {
    UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setEmail(user.getEmail());
    dto.setRole(user.getRole());
    dto.setFirstName(user.getFirstName());
    dto.setlastName(user.getlastName());

    return dto;
  }

  /**
   * Adds a user to the database from parameters passed on from the frontend.
   *
   * @param user - The user object created from given attributes.
   */
  public void addUser(User user) {
    if (user != null) {
      userRepository.save(user);
    } else {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a user from the database - first checking if the email provided matches.
   *
   * @param email - The email of the user to be deleted.
   */
  public void removeUserByEmail(String email) {
    User userToDelete = userRepository.findByEmail(email);
    if (userToDelete == null) {
      throw new IllegalArgumentException("Could not find user with provided email.");
    }

    userRepository.delete(userToDelete);
  }

  /**
   * Deletes a user from the database - first checking if the id provided matches.
   *
   * @param id - The id of the user who is to be deleted.
   */
  public void removeUserById(Long id) {
    if (!userRepository.existsById(id)) {
      throw new IllegalArgumentException("Could not find user with provided ID.");
    }
    userRepository.deleteById(id);
  }

}
