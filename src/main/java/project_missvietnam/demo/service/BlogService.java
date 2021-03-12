package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Blog;

import java.util.List;

public interface BlogService extends BaseService<Blog>{

    //admin blog deleted
    List<Blog> findAllBlogDeleted();

    Blog findBlogDeleted(long id);

    boolean deleteBlog(long id);

    boolean undoBlog(long id);

    //home
    List<Blog> listLastestBlogCarousel();

    List<Blog> listAllBlog();

    Blog blogView(long id);
}
