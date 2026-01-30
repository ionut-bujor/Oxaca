package teamproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamproject.backend.model.User;

/**
 * A JPA Repository mapping User objects.
 */
public interface UserRepository extends JpaRepository<User, Long> {
  User findByEmail(String email);
}
