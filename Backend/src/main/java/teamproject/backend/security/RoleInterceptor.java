package teamproject.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import teamproject.backend.model.Role;

/**
 * A HandlerInterceptor which is used for checking the role permissions before a controller's
 * endpoint is executed - enforces that users must be of a specific role to call endpoint
 * successfully.
 */
@Component
public class RoleInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

    if (!(handler instanceof HandlerMethod method)) {
      return true; // if not used in a controller method
    }

    RequireRole requireRole = method.getMethodAnnotation(RequireRole.class);

    if (requireRole == null) {
      return true; // no role restriction
    }

    HttpSession session = request.getSession(false);
    if (session == null || session.getAttribute("USER_ID") == null) {
      response.sendError(HttpStatus.UNAUTHORIZED.value());
      return false;
    }

    Role userRole = (Role) session.getAttribute("ROLE");

    // check if the user's role is in the list of allowed roles
    boolean allowed = false;
    for (Role role : requireRole.value()) {
      if (role == userRole) {
        allowed = true;
        break;
      }
    }

    if (!allowed) {
      response.sendError(HttpStatus.FORBIDDEN.value());
      return false;
    }

    return true;
  }
}


