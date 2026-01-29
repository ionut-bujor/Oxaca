package teamproject.backend.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import teamproject.backend.Repository.UserRepository;

@Service
public class ServiceUser {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public ServiceUser(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
}
