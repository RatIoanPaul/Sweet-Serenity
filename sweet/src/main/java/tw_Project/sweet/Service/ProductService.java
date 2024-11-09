package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tw_Project.sweet.Dto.ProductDto;
import tw_Project.sweet.Model.Product;

import java.util.List;

@Service
public interface ProductService {

    public Product addNewProduct(@RequestBody ProductDto productDto);
    public void deleteProduct(Long id);
    public void updateProduct(Long id, ProductDto productDto);
    public Product getProduct(Long id);
    public List<Product> getProducts();

    public void activateProduct(Long productId);
    public void archiveProduct(Long productId);
    public void changeProductType(Long productId, String newType);
}
