package tw_Project.sweet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tw_Project.sweet.Model.PreorderDetails;

@Repository
public interface PreorderDetailsRepository extends JpaRepository<PreorderDetails, Long> {

}
