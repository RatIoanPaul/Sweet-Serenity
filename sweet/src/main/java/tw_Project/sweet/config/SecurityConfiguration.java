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

                            .requestMatchers("/api/in/products/addProduct").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/getProducts").permitAll()
                            .requestMatchers("/api/in/products/getProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/deleteProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/updateProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/archiveProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/activateProduct/**").hasAuthority("ADMIN")
                            .requestMatchers("/api/in/products/changeProductType/**").hasAuthority("ADMIN")

                            .requestMatchers("/api/in/user/cart/addProductToCart").permitAll()
                            .requestMatchers("/api/in/user/cart/deleteProductFromCart/**").permitAll()
                            .requestMatchers("/api/in/user/cart/updateProductQuantity/**").permitAll()
                            .requestMatchers("/api/in/user/cart/get_user_cart_products/**").permitAll()
                            .requestMatchers("/api/in/user/cart/verifyCartItemStatus/**").permitAll()

                            .requestMatchers("/api/in/user/preorder_item/updateProductQuantity/**").permitAll()
                            .requestMatchers("/api/in/user/preorder_item/add_item_to_preorder_list").permitAll()
                            .requestMatchers("/api/in/user/preorder_item/deleteProductFromPreorderList/**").permitAll()
                            .requestMatchers("/api/in/user/preorder_item/get_user_preorder_products/**").permitAll()

                            .requestMatchers("/api/in/address/addNewAddress").permitAll()
                            .requestMatchers("/api/in/address/deleteAddress/**").permitAll()
                            .requestMatchers("/api/in/address/getAddressById/**").permitAll()
                            .requestMatchers("/api/in/address/getAllClientAddresses/**").permitAll()

                            .requestMatchers("/api/in/user/preorder/addPreorder").permitAll()
                            .requestMatchers("/api/in/user/preorder/addPreorder/**").permitAll()

                            .requestMatchers("/api/in/user/order/addOrder/**").permitAll()
                            .requestMatchers("/api/in/user/order/change_order_status/**").permitAll()

                            .requestMatchers("/api/in/user/cart/addProductToCart/**").permitAll()
                            .requestMatchers("/api/in/user/cart/updateProductQuantity/**").permitAll()
                            .requestMatchers("/api/in/user/cart/deleteProductFromCart/**").permitAll()
                            .requestMatchers("/api/in/user/cart/get_user_cart_products/**").permitAll()
                            .requestMatchers("/api/in/user/cart/verifyCartItemStatus/**").permitAll()


                            .requestMatchers("/api/in/stock_products/changeProductStock/**").permitAll()
                            .requestMatchers("/api/in/stock_products/gelAllStockProducts").permitAll()

                            .requestMatchers("/api/in/tastingRequest/addNewRequest").permitAll()
                            .requestMatchers("/api/in/tastingRequest/getAllRequests").permitAll()
                            .requestMatchers("/api/in/tastingRequest/getAllClientRequest/**").permitAll()
                            .requestMatchers("/api/in/user/favourite/addNewProductToFavourite").permitAll()
                            .requestMatchers("/api/in/user/favourite/getAllUserFavourite/**").permitAll()
                            .anyRequest().authenticated()
                    )
                    .sessionManagement(sessionManagement ->
                            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }
    }
