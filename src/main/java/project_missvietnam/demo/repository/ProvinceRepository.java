package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project_missvietnam.demo.model.Province;

import java.util.List;

public interface ProvinceRepository extends JpaRepository<Province, Long> {
    @Query(
            value = "select * from provinces u where u.delete=true",
            nativeQuery = true
    )
    List<Province> findAllProvinceDeleted();

    @Query(
            value = "select * from provinces where id=?1",
            nativeQuery = true
    )
    Province findProvinceDeleted(long id);

}
