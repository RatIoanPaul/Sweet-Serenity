package tw_Project.sweet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name ="products")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String ingredients;
    private String descriptions;
    private String calories;
    private Double price;
    @Enumerated(EnumType.STRING)
    private ProductCategory productCategory;
}
