package teamproject.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import teamproject.backend.model.User;
import teamproject.backend.service.ServiceUser;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
  private final ServiceUser serviceUser;

  public UserController(ServiceUser serviceUser) {
    this.serviceUser = serviceUser;
  }

  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestParam String email, @RequestParam String password,
      HttpServletRequest request) {

    User user = serviceUser.authenticateUser(email, password);

    HttpSession session = request.getSession(true);
    serviceUser.storeSession(session, user);

    return ResponseEntity.ok().build();
  }

  @PostMapping("/logout")
  public void logout(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }
  }

}
