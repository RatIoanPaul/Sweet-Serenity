package tw_Project.sweet.Dto;

import com.azure.core.annotation.Get;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDto {
    private String name;
    private String ingredients;
    private String descriptions;
    private String calories;
    private Double price;
    private String productImgUrl;
    private String category;
    private String type;
}
