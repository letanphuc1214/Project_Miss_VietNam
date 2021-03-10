package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project_missvietnam.demo.model.Ethnicity;

import java.util.List;

public interface EthnicityRepository extends JpaRepository<Ethnicity, Long> {
    @Query(
            value = "select * from ethnicities u where u.delete=true",
            nativeQuery = true
    )
    List<Ethnicity> findAllEthnicityDeleted();

    @Query(
            value = "select * from ethnicities where id=?1",
            nativeQuery = true
    )
    Ethnicity findEthnicityDeleted(long id);
}
