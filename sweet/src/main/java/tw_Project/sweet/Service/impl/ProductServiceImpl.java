package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.ProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.ProductCategory;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Service.ProductService;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void addNewProduct(ProductDto productDto) {
        Product product = new Product();
        product.setCalories(productDto.getCalories());
        product.setProductCategory(ProductCategory.valueOf(productDto.getCategory()));
        product.setDescriptions(productDto.getDescriptions());
        product.setPrice(productDto.getPrice());
        product.setName(productDto.getName());
        product.setIngredients(productDto.getIngredients());
        productRepository.save(product);
    }

    public void updateProduct(Long id, ProductDto productDto){
        Optional<Product> optionalProduct = productRepository.getProductById(id);
        Product product;
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
            product.setProductCategory(ProductCategory.valueOf(productDto.getCategory()));
            product.setDescriptions(productDto.getDescriptions());
            product.setPrice(productDto.getPrice());
            product.setName(productDto.getName());
            product.setIngredients(productDto.getIngredients());
            productRepository.save(product);
        }
        else{
            throw new BadRequestException("Product with this id not found");
        }
    }

    @Override
    public Product getProduct(Long id) {
        Optional<Product> optionalProduct = productRepository.getProductById(id);
        Product product = new Product();
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
        }
        else{
            throw new BadRequestException("There is no product with this id");
        }
        return product;
    }

    @Override
    public List<Product> getProducts() {
        List<Product> products = productRepository.findAll();
        return products;
    }

    public void deleteProduct(Long id){
        Optional<Product> optionalProduct = productRepository.getProductById(id);
        Product product;
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
            productRepository.delete(product);
        }
        else{
            throw new BadRequestException("Product with this id not found");
        }
    }

}
