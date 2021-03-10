package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project_missvietnam.demo.model.Education;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {
    @Query(
            value = "select * from educations u where u.delete=true",
            nativeQuery = true
    )
    List<Education> findAllEducationDeleted();

    @Query(
            value = "select * from educations where id=?1",
            nativeQuery = true
    )
    Education findEducationDeleted(long id);
}
