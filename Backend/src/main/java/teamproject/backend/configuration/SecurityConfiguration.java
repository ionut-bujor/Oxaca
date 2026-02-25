package teamproject.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Class used to configure settings for spring security.
 */
@Configuration
public class SecurityConfiguration {

  /**
   * Configures the application's security rules. disables CSRF, HTTP Basic, and form login.
   * requires authentication for all other endpoints. everyone add their own endpoints in here.
   *
   * @param http the HttpSecurity configuration object
   * @return the configured security settings.
   * @throws Exception if something goes wrong while building the security setup
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable()).httpBasic(httpBasic -> httpBasic.disable())
        .formLogin(form -> form.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/menu/**").permitAll()
            .requestMatchers("/api/v1/users/**").permitAll()
            .requestMatchers("/api/v1/auth/**").permitAll()
            .requestMatchers("/api/v1/menu/addItem").permitAll()
            .requestMatchers("/**").permitAll()
            // add all other endpoints here so
            .anyRequest().authenticated()
    );
    return http.build();
  }

  /**
   * Bean for injecting the password encoder.
   *
   * @return - a BCryptPasswordEncoder that can be used for validating/creating password hashes.
   */
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
