package project_missvietnam.demo.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project_missvietnam.demo.model.Education;
import project_missvietnam.demo.model.message.MessageNotification;
import project_missvietnam.demo.service.EducationService;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/")
public class ApiEducationController {
    @Autowired
    public EducationService educationService;

    //danh sách trình độ văn hóa
    @RequestMapping(value = "/educations/", method = RequestMethod.GET)
    public ResponseEntity<List<Education>> listEducation(){
        List<Education> educations = educationService.findAll();
        return new ResponseEntity<List<Education>>(educations, HttpStatus.OK);
    }

    @RequestMapping(value = "/education/{id}", method = RequestMethod.GET)
    public ResponseEntity<Education> listEducation(@PathVariable("id") Long id){
        try {
            Education education = educationService.findbyId(id);
            return new ResponseEntity<Education>(education, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Education>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/education/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") Long id){
        boolean isEducation = false;
        try {
            isEducation = educationService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEducation;
    }

    @PutMapping(value = "/education/")
    @ResponseBody
    public ResponseEntity<Object> getProvinceById(@Validated Education education, BindingResult bindingResult, Errors errors) {
        return validate(education,bindingResult,errors);
    }

    @RequestMapping(value = "/education/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Education education, BindingResult bindingResult, Errors errors) {
        return validate(education,bindingResult,errors);
    }

    @RequestMapping(value = "/education/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Education education, BindingResult bindingResult, Errors errors) throws SQLException {
        return validate(education,bindingResult,errors);
    }

    public ResponseEntity<Object> validate(Education education , BindingResult bindingResult, Errors errors){
        String educationName = education.getEducationName();
        List<Education> list = educationService.findAll();
        int size = list.size();
        if (size > 0){
            if (education.getId() == null){
                for (Education item:list){
                    if (item.getEducationName().equals(educationName)) {
                        errors.rejectValue("educationName", "educationName.equal","Tên trình độ văn hóa đã có");
                        break;
                    }

                }
            }
            else {
                for (Education item:list){
                    if (item.getId() != education.getId()){
                        if (item.getEducationName().equals(educationName)) {
                            errors.rejectValue("educationName", "educationName.equal", "Tên trình độ văn hóa đã có");
                            break;
                        }

                    }
                }
            }
        }
        if(bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            List<String> fieldString = new ArrayList<>();
            for (FieldError e: fieldErrors) {
                fieldString.add(e.getField()+": " +e.getDefaultMessage());
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(-2);
            messageNotification.setStringListMessage(fieldString);
            return new ResponseEntity<Object>(messageNotification,HttpStatus.OK);
        }else {
            try {
                educationService.save(education);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(education);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //danh sách trình độ văn hóa đã xóa

    @RequestMapping(value = "/educationsDeleted/", method = RequestMethod.GET)
    public ResponseEntity<List<Education>> listEducationDelete(){
        List<Education> educationList = educationService.findAllEducationDeleted();
        return new ResponseEntity<List<Education>>(educationList, HttpStatus.OK);
    }

    @RequestMapping(value = "/educationDeleted/{id}", method = RequestMethod.GET)
    public ResponseEntity<Education> listEducationDelete(@PathVariable("id") Long id){
        Education education = educationService.findEducationDeleted(id);
        return new ResponseEntity<Education>(education, HttpStatus.OK);
    }

    @RequestMapping(value = "/educationDeleted/{id}", method = RequestMethod.DELETE)
    public boolean educationDelete (@PathVariable("id") Long id){
        boolean isEducation = false;
        try {
            isEducation = educationService.deleteEducation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEducation;
    }

    @RequestMapping(value = "/educationUndo/{id}", method = RequestMethod.PUT)
    public boolean educationUndo (@PathVariable("id") Long id){
        boolean isEducations = false;
        try {
            isEducations = educationService.undoEducation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEducations;
    }

}
