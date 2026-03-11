package teamproject.backend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import teamproject.backend.security.RoleInterceptor;

/**
 * Configuration class that registers interceptors for Spring-boot to use.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

  private final RoleInterceptor roleInterceptor;

  public WebConfig(RoleInterceptor roleInterceptor) {
    this.roleInterceptor = roleInterceptor;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(roleInterceptor)
        .addPathPatterns("/api/**")
        .excludePathPatterns("/api/stripe/webhook"); // add this
  }
}

