package project_missvietnam.demo.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_missvietnam.demo.model.Blog;
import project_missvietnam.demo.repository.BlogRepository;
import project_missvietnam.demo.service.BlogService;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    public BlogRepository blogRepository;

    //admin blog deleted
    @Override
    public List<Blog> findAllBlogDeleted() {
        return blogRepository.findAllBlogDeleted();
    }

    @Override
    public Blog findBlogDeleted(long id) {
        Blog blog = null;
        blog = blogRepository.findBlogDelete(id);
        return blog;
    }

    @Override
    public boolean deleteBlog(long id) {
        Blog blog = this.findBlogDeleted(id);
        if (blog != null){
            blogRepository.delete(blog);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoBlog(long id) {
        Blog blog = this.findBlogDeleted(id);
        if (blog != null){
            blog.setDelete(false);
            blog.setDateDelete(LocalDateTime.now());
            blogRepository.save(blog);
            return true;
        }
        return false;
    }

    //Trang chủ
    @Override
    public List<Blog> listLastestBlogCarousel() {
        return blogRepository.listLastestBlogCarousel();
    }

    @Override
    public List<Blog> listAllBlog() {
        return blogRepository.listAllBlog();
    }

    @Override
    public Blog blogView(long id) {
        return blogRepository.blogView(id);
    }


    //admin blog
    @Override
    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog findbyId(long id) throws SQLException {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public Blog save(Blog element) throws SQLException {
        if (element.getId() != null){
            element.setDateEdit(LocalDateTime.now());
            element.setDateAdd(this.findbyId(element.getId()).getDateAdd());
            blogRepository.save(element);
        }
        return blogRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Blog blog = this.findbyId(id);
        if (blog == null){
            return false;
        }
        blog.setDateDelete(LocalDateTime.now());
        blog.setDelete(true);
        blogRepository.save(blog);
        return true;

    }
}
