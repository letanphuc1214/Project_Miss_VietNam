package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Blog;

import java.util.List;

public interface BlogService extends BaseService<Blog>{
    List<Blog> findAllBlogDeleted();
    Blog findBlogDeleted(long id);
    boolean deleteBlog(long id);
    boolean undoBlog(long id);

    List<Blog> listLastestBlogCarousel();

    List<Blog> listAllBlog();
}
