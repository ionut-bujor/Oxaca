package teamproject.backend.security;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import teamproject.backend.model.Role;

@Component
public class RoleInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

    if (!(handler instanceof HandlerMethod method)) {
      return true;
    }

    RequireRole requireRole = method.getMethodAnnotation(RequireRole.class);

    if (requireRole == null) {
      return true; // no role required
    }

    HttpSession session = request.getSession(false);

    if (session == null || session.getAttribute("USER_ID") == null) {
      response.sendError(HttpStatus.UNAUTHORIZED.value());
      return false;
    }

    Role userRole = (Role) session.getAttribute("ROLE");

    if (userRole != requireRole.value()) {
      response.sendError(HttpStatus.FORBIDDEN.value());
      return false;
    }

    return true;
  }
}

