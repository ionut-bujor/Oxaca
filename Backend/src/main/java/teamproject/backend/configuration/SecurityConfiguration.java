package teamproject.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Class used to configure settings for spring security.
 */
@Configuration
public class SecurityConfiguration {

  /**
   * Configures the application's security rules.
   * disables CSRF, HTTP Basic, and form login.
   * requires authentication for all other endpoints.
   * everyone add their own endpoints in here.
   *
   * @param http the HttpSecurity configuration object
   * @return the configured security settings.
   * @throws Exception if something goes wrong while building the security setup
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .httpBasic(httpBasic -> httpBasic.disable())
        .formLogin(form -> form.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/menu/**").permitAll()
            //add all other endpoints here so
            .anyRequest().authenticated()
        );
    return http.build();
  }
}
