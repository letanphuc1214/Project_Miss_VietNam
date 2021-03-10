package project_missvietnam.demo.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.model.Ethnicity;
import project_missvietnam.demo.repository.CandidateRepository;
import project_missvietnam.demo.repository.EthnicityRepository;
import project_missvietnam.demo.service.EthnicityService;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EthnicityServiceImpl implements EthnicityService {
    @Autowired
    public EthnicityRepository ethnicityRepository;

    @Autowired
    public CandidateRepository candidateRepository;

    @Override
    public List<Ethnicity> findAllEthnicityDeleted() {
        return ethnicityRepository.findAllEthnicityDeleted();
    }

    @Override
    public Ethnicity findEthnicityDeleted(long id) {
       Ethnicity ethnicity = null;
       ethnicity = ethnicityRepository.findEthnicityDeleted(id);
       return ethnicity;
    }

    @Override
    public boolean deleteEthnicity(long id) {
        Ethnicity ethnicity = this.findEthnicityDeleted(id);
        if (ethnicity != null){
            ethnicityRepository.delete(ethnicity);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoEthnicity(long id) {
        Ethnicity ethnicity = this.findEthnicityDeleted(id);
        if (ethnicity != null){
            ethnicity.setDelete(false);
            ethnicityRepository.save(ethnicity);
            return true;
        }
        return false;
    }

    @Override
    public List<Ethnicity> findAll() {
        return ethnicityRepository.findAll();
    }

    @Override
    public Ethnicity findbyId(long id) throws SQLException {
        return ethnicityRepository.findById(id).orElse(null);
    }

    @Override
    public Ethnicity save(Ethnicity element) throws SQLException {
        return ethnicityRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Ethnicity ethnicity = this.findbyId(id);
        if (ethnicity == null){
            return false;
        }
        ethnicity.setDelete(true);
        ethnicityRepository.save(ethnicity);
        List<Candidate> candidateList = candidateRepository.findAll();
        for (Candidate candidate:candidateList){
            if (candidate.getEthnicity().isDelete()){
                candidate.setDelete(true);
                candidateRepository.save(candidate);
            }
        }
        return true;

    }
}
