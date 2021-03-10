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
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.model.message.MessageNotification;
import project_missvietnam.demo.service.CandidateService;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/")
public class ApiCandidateController {
    @Autowired
    public CandidateService candidateService;

    //candidate
    @RequestMapping(value = "/candidates/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listCandidate(){
        List<Candidate> candidates = candidateService.findAll();
        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }

    @RequestMapping(value = "/candidate/{id}", method = RequestMethod.GET)
    public ResponseEntity<Candidate> listCandidate(@PathVariable("id") Long id){
        try {
            Candidate candidate = candidateService.findbyId(id);
            return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Candidate>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/candidate/{id}", method = RequestMethod.DELETE,produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id){
        boolean isCandidate=false;
        try {
            isCandidate = candidateService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isCandidate;
    }

    @RequestMapping(value = "/status/{id}", method = RequestMethod.GET)
    public ResponseEntity<Candidate> changeStatus(@PathVariable("id") Long id) throws SQLException {
        Candidate candidate = candidateService.findbyId(id);
        if (candidate.getStatus().equals("Chờ duyệt")){
            candidate.setStatus("Đã duyệt");
        }else if (candidate.getStatus().equals("Đã duyệt")){
            candidate.setStatus("Bị loại");
        }else if (candidate.getStatus().equals("Bị loại")){
            candidate.setStatus("Chờ duyệt");
        }
        candidate = candidateService.save(candidate);
        return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
    }

    @PutMapping(value = "/candidate/")
    @ResponseBody
    public ResponseEntity<Object> getCandidateById(@Validated Candidate candidate, BindingResult bindingResult, Errors errors) {
        return validate(candidate,bindingResult,errors);
    }

    @RequestMapping(value = "/candidate/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Candidate candidate, BindingResult bindingResult, Errors errors) {
        return validate(candidate,bindingResult,errors);
    }

    @RequestMapping(value = "/candidate/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Candidate candidate, BindingResult bindingResult, Errors errors) throws SQLException {
        return validate(candidate,bindingResult,errors);
    }

    public ResponseEntity<Object> validate(Candidate candidate , BindingResult bindingResult, Errors errors){
        String phone = candidate.getPhone();
        String email = candidate.getEmail();
        String idCard = candidate.getIdCard();
        List<Candidate> list = candidateService.findAllCandidatesByPhoneEmailIdCard(phone, email, idCard);
        int size = list.size();
        if (size > 0){
            if (candidate.getId() == null){
                for (Candidate item:list){
                    if (item.getPhone().equals(phone)) errors.rejectValue("phone", "phone.equal","Số điện thoại đã có người sử dụng");
                    if (item.getEmail().equals(email)) errors.rejectValue("email", "email.equal","Email đã có người sử dụng");
                    if (item.getIdCard().equals(idCard)) errors.rejectValue("idCard", "idCard.equal","Chứng minh thư đã có người sử dụng");
                    break;
                }
            }
            else {
                for (Candidate item:list){
                    if (!item.getId().equals(candidate.getId())){
                        if (item.getPhone().equals(phone)) errors.rejectValue("phone", "phone.equal","Số điện thoại đã có người sử dụng");
                        if (item.getEmail().equals(email)) errors.rejectValue("email", "email.equal","Email đã có người sử dụng");
                        if (item.getIdCard().equals(idCard)) errors.rejectValue("idCard", "idCard.equal","Chứng minh thư đã có người sử dụng");
                        break;
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
                candidateService.save(candidate);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(candidate);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //candidate delete

    @RequestMapping(value = "/candidatesDeleted/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listCandidateDeleted(){
        List<Candidate> candidateList = candidateService.findAllCandidateDeleted();
        return new ResponseEntity<List<Candidate>>(candidateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/candidateDeleted/{id}", method = RequestMethod.GET)
    public ResponseEntity<Candidate> listCandidateDeleted(@PathVariable("id") Long id){
        try {
            Candidate candidate = candidateService.findCandidateDeleted(id);
            return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Candidate>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/candidateDeleted/{id}", method = RequestMethod.DELETE)
    public boolean deletedCandidate(@PathVariable("id") Long id){
        boolean isCandidate = false;
        try {
            isCandidate = candidateService.deleteCandidate(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isCandidate;
    }

    @RequestMapping(value = "/candidateUndo/{id}", method = RequestMethod.PUT)
    public boolean undoCandidate(@PathVariable("id") Long id){
        boolean isCandidate = false;
        try {
            isCandidate = candidateService.undoCandidate(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isCandidate;
    }

    //Admin: Lấy danh sách thí sinh bị loại
    @RequestMapping(value = "/candidateRemoved/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listCandidateStatusRemove(){
        List<Candidate> candidateList = candidateService.findAllCandidateStatusRemoved();
        return new ResponseEntity<List<Candidate>>(candidateList, HttpStatus.OK);
    }

    //Admin: Lấy danh sách thí sinh đã duyệt
    @RequestMapping(value = "/candidateSuccess/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listCandidateStatusSuccess(){
        List<Candidate> candidateList = candidateService.findAllCandidateStatusSuccess();
        return new ResponseEntity<List<Candidate>>(candidateList, HttpStatus.OK);
    }

    //Admin: Lấy danh sách thí sinh chờ duyệt
    @RequestMapping(value = "/candidatePending/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listCandidateStatusPending(){
        List<Candidate> candidateList = candidateService.findAllCandidateStatusPending();
        return new ResponseEntity<List<Candidate>>(candidateList, HttpStatus.OK);
    }


    //Trang chủ: Hiển thị danh sách 10 thí sinh đăng ký mới nhất
    @RequestMapping(value = "/lastestCandidates/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listLastestCandidates(){
        List<Candidate> candidates = candidateService.listNewTenCandidateRegister();
        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }

    //Trang chủ: Hiển thị danh sách 10 thí sinh đã duyệt mới nhất
    @RequestMapping(value = "/lastestCandidateSuccess/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listLastestCandidateSuccess(){
        List<Candidate> candidates = candidateService.listNewTenCandidateRegisterSuccess();
        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }

    //Trang chủ: Hiển thị danh sách thí sinh đã đăng ký
    @RequestMapping(value = "/candidateRegistered/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listAllCandidateRegistered(){
        List<Candidate> candidates = candidateService.listAllCandidateRegisteredList();
        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }

    //Trang chủ: Hiển thị danh sách thí sinh đã được duyệt
    @RequestMapping(value = "/candidateRegisteredSuccess/", method = RequestMethod.GET)
    public ResponseEntity<List<Candidate>> listAllCandidateRegisteredSuccess(){
        List<Candidate> candidates = candidateService.listAllCandidateRegisterSuccess();
        return new ResponseEntity<List<Candidate>>(candidates, HttpStatus.OK);
    }

    //Trang chủ: Xem thông tin chi tiết thí sinh
    @RequestMapping(value = "/candidateView/{id}", method = RequestMethod.GET)
    public ResponseEntity<Candidate> candidateView(@PathVariable("id") Long id){
        try {
            Candidate candidate = candidateService.candidateView(id);
            return new ResponseEntity<Candidate>(candidate, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Candidate>(HttpStatus.NO_CONTENT);
        }
    }
}
