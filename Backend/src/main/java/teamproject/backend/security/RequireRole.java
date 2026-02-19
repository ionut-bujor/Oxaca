package teamproject.backend.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import teamproject.backend.model.Role;

/**
 * Annotation for RequireRole that can take an array of Roles.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequireRole {
  /**
   * For creating an array of type Role enum.
   *
   * @return the value of the Role.
   */
  Role[] value();
}
