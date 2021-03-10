package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project_missvietnam.demo.model.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
}
