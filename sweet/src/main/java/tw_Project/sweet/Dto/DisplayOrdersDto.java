package tw_Project.sweet.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tw_Project.sweet.Model.Product;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DisplayOrdersDto {
    private Long addressId;
    Double price;
    String deliveryMessage;
    String deliveryMethod;
    String dateAndTime;
    List<Product> products;
}