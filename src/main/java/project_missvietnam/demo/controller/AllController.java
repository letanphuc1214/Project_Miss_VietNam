package project_missvietnam.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import project_missvietnam.demo.model.Blog;
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.service.BlogService;
import project_missvietnam.demo.service.CandidateService;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;

@Controller
@RequestMapping(value = "")
public class AllController {
    @Autowired
    public BlogService blogService;

    @Autowired
    public CandidateService candidateService;

    @GetMapping(value = "/candidates")
    public ModelAndView listCandidate(){
        ModelAndView modelAndView = new ModelAndView("admin/candidate/Candidate");
        return modelAndView;
    }

    @GetMapping(value = "/candidatesDeleted")
    public ModelAndView listCandidatesDeleted(){
        ModelAndView modelAndView = new ModelAndView("admin/candidate/CandidateDelete");
        return modelAndView;
    }

    @GetMapping(value = "/candidateRemoved")
    public ModelAndView listCandidateStatusRemove(){
        ModelAndView modelAndView = new ModelAndView("admin/candidate/CandidateStatusRemove");
        return modelAndView;
    }

    @GetMapping(value = "/candidateSuccess")
    public ModelAndView listCandidateStatusSuccess(){
        ModelAndView modelAndView = new ModelAndView("admin/candidate/CandidateStatusSuccess");
        return modelAndView;
    }

    @GetMapping(value = "/candidatePending")
    public ModelAndView listCandidateStatusPending(){
        ModelAndView modelAndView = new ModelAndView("admin/candidate/CandidateStatusPending");
        return modelAndView;
    }

    @GetMapping(value = "/educations")
    public ModelAndView listEducation(){
        ModelAndView modelAndView = new ModelAndView("admin/education/Education");
        return modelAndView;
    }

    @GetMapping(value = "/educationsDeleted")
    public ModelAndView listEducationsDeleted(){
        ModelAndView modelAndView = new ModelAndView("admin/education/EducationDelete");
        return modelAndView;
    }

    @GetMapping(value = "/ethnicities")
    public ModelAndView listEthnicity(){
        ModelAndView modelAndView = new ModelAndView("admin/ethnicity/Ethnicity");
        return modelAndView;
    }

    @GetMapping(value = "/ethnicitiesDeleted")
    public ModelAndView listEthnicitiesDeleted(){
        ModelAndView modelAndView = new ModelAndView("admin/ethnicity/EthnicityDelete");
        return modelAndView;
    }

    @GetMapping(value = "/provinces")
    public ModelAndView listProvince(){
        ModelAndView modelAndView = new ModelAndView("admin/province/Province");
        return modelAndView;
    }

    @GetMapping(value = "/provincesDeleted")
    public ModelAndView listProvincesDeleted(){
        ModelAndView modelAndView = new ModelAndView("admin/province/ProvinceDelete");
        return modelAndView;
    }

    @GetMapping(value = "/blogs")
    public ModelAndView listBlog(){
        ModelAndView modelAndView = new ModelAndView("admin/blog/Blog");
        return modelAndView;
    }

    @GetMapping(value = "/blogadd")
    public ModelAndView showAddForm(){
        ModelAndView modelAndView = new ModelAndView("admin/blog/BlogCreate");
        return modelAndView;
    }

    @GetMapping(value = "/blogedit/{id}")
    public ModelAndView showEditForm(@PathVariable("id") Long id) throws SQLException {
        ModelAndView modelAndView = new ModelAndView("admin/blog/BlogEdit");
        Blog blog = blogService.findbyId(id);
        if (blog != null){
            modelAndView.addObject("blog", blog);
            return modelAndView;
        }
        return modelAndView;
    }

    @GetMapping(value = "/blogview/{id}")
    public ModelAndView showViewForm(@PathVariable("id") Long id) throws SQLException {
        ModelAndView modelAndView = new ModelAndView("admin/blog/BlogView");
        Blog blog = blogService.findbyId(id);
        if (blog != null){
            modelAndView.addObject("blog", blog);
            return modelAndView;
        }
        return modelAndView;
    }

    @GetMapping(value = "/blogsDeleted")
    public ModelAndView listBlogsDeleted(){
        ModelAndView modelAndView = new ModelAndView("admin/blog/BlogDelete");
        return modelAndView;
    }

    @GetMapping(value = "/login")
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView("login/Login");
        return modelAndView;
    }

    @GetMapping(value = "/default")
    public String defaultAfterLogin(HttpServletRequest request){
        if (request.isUserInRole("ADMIN")){
            return "redirect:/candidates";
        }
        else {
            return "redirect:/";
        }
    }

    //Trang chủ
    @GetMapping(value = "/")
    public ModelAndView home(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/index");
        return modelAndView;
    }

    // Tin tức
    @GetMapping(value = "/news")
    public ModelAndView blogs(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/blog/blog");
        return modelAndView;
    }

    //Trang chủ: Bài viết chi tiết
    @GetMapping(value = "/news/{id}")
    public ModelAndView blogView(@PathVariable("id") Long id) throws SQLException {
        Blog blog = blogService.findbyId(id);
        ModelAndView modelAndView = new ModelAndView("frontEnd/blog/blogView");
        modelAndView.addObject("blog", blog);
        return modelAndView;
    }

    //Trang chủ: Hiển thị danh sách thí sinh đã đăng ký
    @GetMapping(value = "/listCandidates")
    public ModelAndView listCandidates(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/candidate/listCandidates");
        return modelAndView;
    }

    //Trang chủ: Hiển thị danh sách thí sinh đã duyệt
    @GetMapping(value = "/listCandidatesSuccess")
    public ModelAndView listCandidatesSuccess(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/candidate/listCandidateSuccess");
        return modelAndView;
    }

    //Trang chủ: Danh sách thông tin chi tiết thí sinh
    @GetMapping(value = "/listCandidates/{id}")
    public ModelAndView listCandidateView(@PathVariable("id") Long id) throws SQLException {
        Candidate candidate = candidateService.findbyId(id);
        ModelAndView modelAndView = new ModelAndView("frontEnd/candidate/CandidateView");
        modelAndView.addObject("candidate", candidate);
        return modelAndView;
    }

//    @GetMapping(value = "/registers")
//    public ModelAndView register(){
//        ModelAndView modelAndView = new ModelAndView("frontEnd/register");
//        return modelAndView;
//    }

}
