package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.Favourite;
import tw_Project.sweet.Model.User;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    public List<Favourite> getAllByUser(User user);
}
