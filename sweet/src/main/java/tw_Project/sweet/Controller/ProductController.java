package tw_Project.sweet.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.NeqTypeDto;
import tw_Project.sweet.Dto.ProductDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.StockProducts;
import tw_Project.sweet.Service.ProductService;
import tw_Project.sweet.Service.StockProductsService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(path ="/api/in/products")
public class ProductController {

    private final ProductService productService;
    private final StockProductsService stockProductsService;

    @Autowired
    public ProductController(ProductService productService, StockProductsService stockProductsService) {
        this.productService = productService;
        this.stockProductsService = stockProductsService;
    }

    @PostMapping("/addProduct")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> addNewProduct(@RequestBody ProductDto productDto){
        Product product = productService.addNewProduct(productDto);
        if(productDto.getType().equals("STOCK")|| productDto.getType().equals("MIX")){
            stockProductsService.addNewStockProduct(product);
        }
        return ResponseEntity.ok(ApiResponse.success("New Product Added successfully", null));
    }

    @PostMapping("/updateProduct/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long productId, @RequestBody ProductDto productDto){
        productService.updateProduct(productId, productDto);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", null));
    }

    @DeleteMapping("/deleteProduct/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId, @RequestBody ProductDto productDto){
        productService.deleteProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @GetMapping("/getProduct/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")

    public ResponseEntity<ApiResponse> getProduct(@PathVariable Long productId){
        try{
        Product product = productService.getProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Get product successfully", product));}
        catch(BadRequestException e){
            return ResponseEntity.badRequest().body(ApiResponse.error(400,e.getMessage()));
        }
    }

    @GetMapping("/getProducts")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> getProducts(){
        List<Product> products = productService.getProducts();
        return ResponseEntity.ok(ApiResponse.success("Get all products successfully", products));
    }

    @PutMapping("/archiveProduct/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> archiveProduct(@PathVariable Long productId){
        productService.archiveProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product archived successfully", null));
    }

    @PutMapping("/activateProduct/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> activateProduct(@PathVariable Long productId){
        productService.activateProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Product activated successfully", null));
    }

    @PutMapping("/changeProductType/{productId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<ApiResponse> changeProductType(@PathVariable Long productId, @RequestBody NeqTypeDto newType){
        productService.changeProductType(productId, newType.getNewType());
        return ResponseEntity.ok(ApiResponse.success("Product type changed successfully", null));
    }
}
