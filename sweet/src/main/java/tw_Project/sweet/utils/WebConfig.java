package tw_Project.sweet.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**") // Permite toate rutele
                    .allowedOrigins("http://localhost:5173") // Permite cereri din frontend (localhost:5173)
                    .allowedOrigins("http://localhost:5174") // Permite cereri din frontend (localhost:5174)
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Metode HTTP permise
                    .allowedHeaders("*") // Permite toate headerele
                    .allowCredentials(true); // Permite autentificare cu cookie-uri
        }
    }

