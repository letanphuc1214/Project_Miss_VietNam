package project_missvietnam.demo.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.repository.CandidateRepository;
import project_missvietnam.demo.service.BaseService;
import project_missvietnam.demo.service.CandidateService;

import java.sql.SQLException;
import java.util.List;

@Service
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    public CandidateRepository candidateRepository;

    //Admin Candidate delete
    @Override
    public List<Candidate> findAllCandidateDeleted() {
        return candidateRepository.findAllCandidateDeleted();
    }

    @Override
    public Candidate findCandidateDeleted(long id) {
        Candidate candidate = null;
        candidate =candidateRepository.findCandidateDeleted(id);
        return candidate;
    }

    @Override
    public boolean deleteCandidate(long id) {
        Candidate candidate = this.findCandidateDeleted(id);
        if (candidate != null){
            candidateRepository.delete(candidate);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoCandidate(long id) {
        Candidate candidate = this.findCandidateDeleted(id);
        if (candidate != null){
            candidate.setDelete(false);
            candidateRepository.save(candidate);
            return true;
        }
        return false;
    }

    //Kiểm tra phone, email, idCard có trùng nhau không
    @Override
    public List<Candidate> findAllCandidatesByPhoneEmailIdCard(String phone, String email, String idCard) {
        return candidateRepository.findAllCandidatesByPhoneEmailIdCard(phone, email, idCard);
    }

    //Trang chủ
    @Override
    public List<Candidate> findAllCandidateStatusRemoved() {
        return candidateRepository.findAllCandidateStatusRemoved();
    }

    @Override
    public List<Candidate> findAllCandidateStatusSuccess() {
        return candidateRepository.findAllCandidateStatusSuccess();
    }

    @Override
    public List<Candidate> findAllCandidateStatusPending() {
        return candidateRepository.findAllCandidateStatusPending();
    }

    @Override
    public List<Candidate> listAllCandidateRegisteredList() {
        return candidateRepository.listAllCandidateRegisteredList();
    }

    @Override
    public List<Candidate> listAllCandidateRegisterSuccess() {
        return candidateRepository.listAllCandidateRegisteredListSuccess();
    }

    @Override
    public List<Candidate> listNewTenCandidateRegister() {
        return candidateRepository.listNewTenCandidateRegister();
    }

    @Override
    public List<Candidate> listNewTenCandidateRegisterSuccess() {
        return candidateRepository.listNewTenCandidateRegisterSuccess();
    }

    @Override
    public Candidate candidateView(long id) {
        return candidateRepository.candidateView(id);
    }


    //admin Candidate
    @Override
    public List<Candidate> findAll() {
        return candidateRepository.findAll();
    }

    @Override
    public Candidate findbyId(long id) throws SQLException {
        return candidateRepository.findById(id).orElse(null);
    }

    @Override
    public Candidate save(Candidate element) throws SQLException {
        return candidateRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Candidate candidate = this.findbyId(id);
        if (candidate == null){
                return false;
        }else if (candidate.getStatus().equals("Đã duyệt")){
            return false;
        }else{
            candidate.setDelete(true);
            candidateRepository.save(candidate);
            return true;
        }
    }
}
