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
import project_missvietnam.demo.model.Ethnicity;
import project_missvietnam.demo.model.message.MessageNotification;
import project_missvietnam.demo.service.EthnicityService;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/")
public class ApiEthnicityController {
    @Autowired
    public EthnicityService ethnicityService;

    @RequestMapping(value = "/ethnicities/", method = RequestMethod.GET)
    public ResponseEntity<List<Ethnicity>> listEthnicities(){
        List<Ethnicity> ethnicities = ethnicityService.findAll();
        return new ResponseEntity<List<Ethnicity>>(ethnicities, HttpStatus.OK);
    }

    @RequestMapping(value = "/ethnicity/{id}", method = RequestMethod.GET)
    public ResponseEntity<Ethnicity> listEthnicities(@PathVariable("id") Long id){
        try {
            Ethnicity ethnicity = ethnicityService.findbyId(id);
            return new ResponseEntity<Ethnicity>(ethnicity, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Ethnicity>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/ethnicity/{id}", method = RequestMethod.DELETE)
    public boolean delete (@PathVariable("id") Long id){
        boolean isEthnicity = false;
        try {
            isEthnicity = ethnicityService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEthnicity;
    }

    @PutMapping(value = "/ethnicity/")
    @ResponseBody
    public ResponseEntity<Object> getEthnicityById(@Validated Ethnicity ethnicity, BindingResult bindingResult, Errors errors) {
        return validate(ethnicity,bindingResult,errors);
    }

    @RequestMapping(value = "/ethnicity/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Ethnicity ethnicity, BindingResult bindingResult, Errors errors) {
        return validate(ethnicity,bindingResult,errors);
    }

    @RequestMapping(value = "/ethnicity/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Ethnicity ethnicity, BindingResult bindingResult, Errors errors) throws SQLException {
        return validate(ethnicity,bindingResult,errors);
    }

    public ResponseEntity<Object> validate(Ethnicity ethnicity , BindingResult bindingResult, Errors errors){
        String ethnicityName = ethnicity.getEthnicityName();
        List<Ethnicity> list = ethnicityService.findAll();
        int size = list.size();
        if (size > 0){
            if (ethnicity.getId() == null) {
                for (Ethnicity item : list) {
                    if (item.getEthnicityName().equals(ethnicityName)){
                        errors.rejectValue("ethnicityName", "ethnicityName.equal", "Tên dân tộc đã có");
                        break;
                    }

                }
            }
            else {
                for (Ethnicity item:list){
                    if (!item.getId().equals(ethnicity.getId())){
                        if (item.getEthnicityName().equals(ethnicityName)) {
                            errors.rejectValue("ethnicityName", "ethnicityName.equal", "Tên dân tộc đã có");
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
                ethnicityService.save(ethnicity);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(ethnicity);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //ethnicity delete

    @RequestMapping(value = "/ethnicitiesDeleted", method = RequestMethod.GET)
    public ResponseEntity<List<Ethnicity>> listEthnicityDelete (){
        List<Ethnicity> ethnicityList = ethnicityService.findAllEthnicityDeleted();
        return new ResponseEntity<List<Ethnicity>>(ethnicityList, HttpStatus.OK);
    }

    @RequestMapping(value = "/ethnicityDeleted/{id}", method = RequestMethod.GET)
    public ResponseEntity<Ethnicity> listEthnicityDelete(@PathVariable("id") Long id){
        Ethnicity ethnicity = ethnicityService.findEthnicityDeleted(id);
        return new ResponseEntity<Ethnicity>(ethnicity, HttpStatus.OK);
    }

    @RequestMapping(value = "/ethnicityDeleted/{id}", method = RequestMethod.DELETE)
    public boolean deleteEthnicity (@PathVariable("id") Long id){
        boolean isEthnicity = false;
        try {
            isEthnicity = ethnicityService.deleteEthnicity(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEthnicity;
    }

    @RequestMapping(value = "/ethnicityUndo/{id}", method = RequestMethod.PUT)
    public boolean undoEthnicity (@PathVariable("id") Long id){
        boolean isEthnicity = false;
        try{
            isEthnicity = ethnicityService.undoEthnicity(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEthnicity;
    }
}
