package tw_Project.sweet.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    @Configuration
    @EnableWebSecurity
    @RequiredArgsConstructor
    public class SecurityConfiguration {
        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;


        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
            http
                    .csrf(csrf -> csrf.disable())
                    .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers("api/auth/forgot-password/**").permitAll()
                            .requestMatchers("api/in/products/addProduct").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/getProducts").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/getProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/deleteProduct").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/updateProduct").hasAuthority("ADMIN")
                            .anyRequest().authenticated()  // Orice alt request trebuie autentificat
                    )
                    .sessionManagement(sessionManagement ->
                            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }
    }
