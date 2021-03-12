package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project_missvietnam.demo.model.Blog;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query(
            value = "select * from blogs u where u.delete = true ",
            nativeQuery = true
    )
    List<Blog> findAllBlogDeleted();

    @Query(
            value = "select * from blogs where id=?1",
            nativeQuery = true
    )
    Blog findBlogDelete(long id);

    @Query(
            value = "select * from blogs where delete = false order by date_add desc limit 10",
            nativeQuery = true
    )
    List<Blog> listLastestBlogCarousel();

    @Query(
            value = "select * from blogs where delete = false order by date_add",
            nativeQuery = true
    )
    List<Blog> listAllBlog();

    @Query(
            value = "select * from blogs where id=?1 and delete = false",
            nativeQuery = true
    )
    Blog blogView(long id);
}
