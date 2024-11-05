package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    public Optional<CartItem> getCartByIdProductCart(Long productCartId);
    public List<CartItem> getAllByUser(User user);

    public Optional<CartItem> getCartByProductAndUser(Product product, User user);
}