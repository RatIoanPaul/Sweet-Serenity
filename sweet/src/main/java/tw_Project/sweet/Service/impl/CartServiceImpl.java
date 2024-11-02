package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.CartDto;
import tw_Project.sweet.Dto.UserCartProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.enums.ProductCartStatus;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Repository.CartRepository;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.CartService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public void addProductToCart(CartDto cartDto){
        CartItem cart = new CartItem();
        User user;
        Product product;
        Optional<User> userOptional = userRepository.getUserByEmail(cartDto.getUserEmail());
        if(userOptional.isPresent()){
            user = userOptional.get();
            Optional<Product> optionalProduct = productRepository.getProductById(cartDto.getProductId());
            if(optionalProduct.isPresent()){
                product = optionalProduct.get();

                //now wee need to check if the product is already in cart
                Optional<CartItem> optionalExistingProductInCart = cartRepository.getCartByProductAndUser(product, user);
                CartItem existingProductInCart;
                if(optionalExistingProductInCart.isPresent()){
                    existingProductInCart = optionalExistingProductInCart.get();
                    existingProductInCart.setQuantity(existingProductInCart.getQuantity()+1);
                    cartRepository.save(existingProductInCart);
                }
                else{
                    cart.setProduct(product);
                    cart.setUser(user);
                    cart.setQuantity(1);
                    cart.setProductCartStatus(ProductCartStatus.AVAILABLE);
                    cartRepository.save(cart);
                }


            }
            else{
                throw new BadRequestException("There is no product with this id");
            }
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    public void deleteProductFromCart(Long productCartId){
        CartItem cart;
        Optional<CartItem> optionalCart = cartRepository.getCartByIdProductCart(productCartId);
        if(optionalCart.isPresent()){
            cart = optionalCart.get();
            cartRepository.delete(cart);
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }

    public void changeProductQuantityInCart(Long productCartId, CartDto cartDto){
        CartItem cart;
        Optional<CartItem> optionalCart = cartRepository.getCartByIdProductCart(productCartId);
        if(optionalCart.isPresent()){
            cart = optionalCart.get();
            //aici trebuie sa verificam cantitate din stoc a produsului respectiv, si doar in momentul in care produsul mai estein stoc, doar atunci putem sa crestem cantitiatea
            // presupunem ca avem destul stoc acum
            cart.setQuantity(cartDto.getQuantity());
            cartRepository.save(cart);
        }else{
            throw new BadRequestException("There is no product cart with this id");
        }
    }

    @Override
    public List<CartItem> getUserProductsCart(String userEmail) {
        User user;
        List<CartItem> cartProducts;
        Optional<User> userOptional = userRepository.getUserByEmail(userEmail);
        if(userOptional.isPresent()){
            user = userOptional.get();
            cartProducts = cartRepository.getAllByUser(user);
            return cartProducts;
        }
        else{
            throw new BadRequestException("There is no account associated with this email");
        }
    }

    public List<UserCartProductDto> createListCartProducts(List<CartItem> cartProducts){
        List<UserCartProductDto> userCartProductDtoList = new ArrayList<>();

        for(CartItem cart: cartProducts)
        {
            UserCartProductDto userCartProductDto = new UserCartProductDto();
            Product product = cart.getProduct();
            Double productPrice = product.getPrice();

            userCartProductDto.setQuantity(cart.getQuantity());
            userCartProductDto.setPrice(productPrice*cart.getQuantity());
            userCartProductDto.setProductId(product.getId());
            userCartProductDto.setProductCartId(cart.getIdProductCart());
            userCartProductDto.setProductName(product.getName());
            userCartProductDto.setPhotoFilePath("inca nu avem");

            userCartProductDtoList.add(userCartProductDto);
        }

        return userCartProductDtoList;
    }
}
