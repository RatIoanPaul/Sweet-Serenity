package tw_Project.sweet.Service.impl;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.ProductDto;
import tw_Project.sweet.Dto.StockProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;
import tw_Project.sweet.Model.enums.ProductCategory;
import tw_Project.sweet.Model.enums.ProductStatus;
import tw_Project.sweet.Model.enums.ProductType;
import tw_Project.sweet.Repository.ProductRepository;
import tw_Project.sweet.Repository.StockProductsRepository;
import tw_Project.sweet.Service.ProductService;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StockProductsRepository stockProductsRepository;

    public ProductServiceImpl(ProductRepository productRepository, StockProductsRepository stockProductsRepository) {
        this.productRepository = productRepository;
        this.stockProductsRepository = stockProductsRepository;
    }

    @Override
    public Product addNewProduct(ProductDto productDto) {
        Product product = new Product();
        product.setCalories(productDto.getCalories());
        product.setProductCategory(ProductCategory.valueOf(productDto.getCategory()));
        product.setDescriptions(productDto.getDescriptions());
        product.setPrice(productDto.getPrice());
        product.setName(productDto.getName());
        product.setIngredients(productDto.getIngredients());
        product.setProductStatus(ProductStatus.ACTIVE);
        product.setProductType(ProductType.valueOf(productDto.getType()));
        product.setProductImgUrl(productDto.getProductImgUrl());
        return productRepository.save(product);
    }

    public void updateProduct(Long id, ProductDto productDto){
        Optional<Product> optionalProduct = productRepository.getProductById(id);
        Product product;
        if(optionalProduct.isPresent()){
            product = optionalProduct.get();
            product.setProductCategory(ProductCategory.valueOf(productDto.getCategory()));
            product.setDescriptions(productDto.getDescriptions());
            product.setPrice(productDto.getPrice());
            product.setCalories(productDto.getCalories());
            product.setName(productDto.getName());
            product.setIngredients(productDto.getIngredients());
            product.setProductImgUrl(productDto.getProductImgUrl());
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

    @Override
    public void activateProduct(Long productId) {
        Optional<Product> optionalProduct = productRepository.getProductById(productId);
        if(optionalProduct.isPresent()){
           Product product = optionalProduct.get();
           if(product.getProductStatus().equals(ProductStatus.ARCHIVE)) {
               product.setProductStatus(ProductStatus.ACTIVE);
               productRepository.save(product);
           }
           else{
               throw new BadRequestException("This product is already active");
           }
        }
        else{
            throw new BadRequestException("There is no product with this id");
        }
    }

    @Override
    public void archiveProduct(Long productId) {
        Optional<Product> optionalProduct = productRepository.getProductById(productId);
        if(optionalProduct.isPresent()){
            Product product = optionalProduct.get();
            if(product.getProductStatus().equals(ProductStatus.ACTIVE)) {
                product.setProductStatus(ProductStatus.ARCHIVE);
                productRepository.save(product);
            }
            else{
                throw new BadRequestException("This product is already archived");
            }
        }
        else{
            throw new BadRequestException("There is no product with this id");
        }
    }

    @Override
    public void changeProductType(Long productId, String newType) {
        Optional<Product> optionalProduct = productRepository.getProductById(productId);
        if(optionalProduct.isPresent()){
            Product product = optionalProduct.get();
            if(product.getProductType().equals(ProductType.valueOf(newType))){
                throw new BadRequestException("This product already has this type");
            }
            else{
                ProductType oldProductType= product.getProductType();
                product.setProductType(ProductType.valueOf(newType));
                productRepository.save(product);
                if((newType.equals("STOCK") || newType.equals("MIX") )&& oldProductType.equals(ProductType.PREORDER)){
                    StockProducts stockProducts = new StockProducts();
                    stockProducts.setRealQuantity(0);
                    stockProducts.setProduct(product);
                    stockProductsRepository.save(stockProducts);
                }
                else if(newType.equals("PREORDER")&& (!oldProductType.equals(ProductType.PREORDER))){
                    Optional<StockProducts> stockProducts = stockProductsRepository.getStockProductsByProduct(product);
                    if(stockProducts.isPresent())
                        stockProductsRepository.delete(stockProducts.get());
                }
            }
        }
        else{
            throw new BadRequestException("There is no product with this id");
        }
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
