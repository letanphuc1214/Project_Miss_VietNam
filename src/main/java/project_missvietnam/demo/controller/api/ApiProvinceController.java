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
import project_missvietnam.demo.model.Blog;
import project_missvietnam.demo.model.Province;
import project_missvietnam.demo.model.message.MessageNotification;
import project_missvietnam.demo.service.ProvinceService;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiProvinceController {
    @Autowired
    public ProvinceService provinceService;

    @GetMapping(value = "/provinces/")
    public ResponseEntity<List<Province>> listProvinces(){
        List<Province> provinces = provinceService.findAll();
        return new ResponseEntity<List<Province>>(provinces, HttpStatus.OK);
    }

    @RequestMapping(value = "/province/{id}", method = RequestMethod.GET)
    public ResponseEntity<Province> listProvinces(@PathVariable("id") Long id){
        try {
            Province province = provinceService.findbyId(id);
            return new ResponseEntity<Province>(province, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Province>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping(value = "/province/")
    @ResponseBody
    public ResponseEntity<Object> getProvinceById(@Validated Province province, BindingResult bindingResult, Errors errors) {
        return validate(province,bindingResult,errors);
    }

    @RequestMapping(value = "/province/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Province province, BindingResult bindingResult, Errors errors) {
        return validate(province,bindingResult,errors);
    }

    @RequestMapping(value = "/province/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Province province, BindingResult bindingResult, Errors errors) throws SQLException {
        return validate(province,bindingResult,errors);
    }

    public ResponseEntity<Object> validate(Province province , BindingResult bindingResult, Errors errors){
        String provinceName = province.getProvinceName();
        List<Province> list = provinceService.findAll();
        int size = list.size();
        if (size > 0){
            if (province.getId() == null){
                for (Province item:list){
                    if (item.getProvinceName().equals(provinceName)) {
                        errors.rejectValue("provinceName", "provinceName.equal","Tên tỉnh thành đã có");
                        break;
                    }

                }
            }
            else {
                for (Province item:list){
                    if (item.getId() != province.getId()){
                        if (item.getProvinceName().equals(provinceName)) {
                            errors.rejectValue("provinceName", "provinceName.equal", "Tên tỉnh thành đã có");
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
                provinceService.save(province);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(province);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/province/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") Long id){
        boolean isProvince = false;
        try {
            isProvince = provinceService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProvince;
    }

    //Province Delete
    @RequestMapping(value = "/provincesDeleted/", method = RequestMethod.GET)
    public ResponseEntity<List<Province>> listProvinceDelete(){
        List<Province> provinceList = provinceService.findAllProvinceDeleted();
        return new ResponseEntity<List<Province>>(provinceList, HttpStatus.OK);
    }

    @RequestMapping(value = "/provinceDeleted/{id}", method = RequestMethod.GET)
    public ResponseEntity<Province> listProvinceDelete (@PathVariable("id") Long id){
        Province province = provinceService.findProvinceDeleted(id);
        return new ResponseEntity<Province>(province, HttpStatus.OK);
    }

    @RequestMapping(value = "/provinceDeleted/{id}", method = RequestMethod.DELETE)
    public boolean deleteProvince (@PathVariable("id") Long id){
        boolean isProvince = false;
        try {
            isProvince = provinceService.deleteProvince(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProvince;
    }

    @RequestMapping(value = "/provinceUndo/{id}", method = RequestMethod.PUT)
    public boolean undoProvince (@PathVariable("id") Long id){
        boolean isProvince = false;
        try {
            isProvince = provinceService.undoProvince(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProvince;
    }
}
