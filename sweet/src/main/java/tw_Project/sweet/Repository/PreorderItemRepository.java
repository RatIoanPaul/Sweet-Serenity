package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.CartItem;
import tw_Project.sweet.Model.PreorderItemList;
import tw_Project.sweet.Model.Product;
import tw_Project.sweet.Model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface PreorderItemRepository extends JpaRepository<PreorderItemList, Long> {
    public Optional<PreorderItemList> getPreorderItemListByIdPreorder(Long preorderId);
    public List<PreorderItemList> getAllByUser(User user);

    public Optional<PreorderItemList> getPreorderItemListByProductAndUser(Product product, User user);
}
