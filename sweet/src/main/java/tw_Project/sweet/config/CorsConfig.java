import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173"); // Permite accesul de pe frontend
        config.addAllowedHeader("*"); // Permite toate antetele
        config.addAllowedMethod("*"); // Permite toate metodele HTTP (GET, POST, PUT, DELETE etc.)
        config.setAllowCredentials(true); // Permite trimiterea de credențiale (cookie-uri)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Se aplică pentru toate endpoint-urile
        return new CorsFilter(source);
    }
}
