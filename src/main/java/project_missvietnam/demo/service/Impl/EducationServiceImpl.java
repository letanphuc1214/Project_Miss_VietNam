package project_missvietnam.demo.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.model.Education;
import project_missvietnam.demo.repository.CandidateRepository;
import project_missvietnam.demo.repository.EducationRepository;
import project_missvietnam.demo.service.EducationService;

import java.sql.SQLException;
import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {
    @Autowired
    public EducationRepository educationRepository;

    @Autowired
    public CandidateRepository candidateRepository;

    @Override
    public List<Education> findAllEducationDeleted() {
        return educationRepository.findAllEducationDeleted();
    }

    @Override
    public Education findEducationDeleted(long id) {
        Education education = null;
        education = educationRepository.findEducationDeleted(id);
        return education;
    }

    @Override
    public boolean deleteEducation(long id) {
        Education education = this.findEducationDeleted(id);
        if (education != null){
            educationRepository.delete(education);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoEducation(long id) {
       Education education = this.findEducationDeleted(id);
       if (education != null){
           education.setDelete(false);
           educationRepository.save(education);
           return true;
       }
       return false;
    }

    @Override
    public List<Education> findAll() {
        return educationRepository.findAll();
    }

    @Override
    public Education findbyId(long id) throws SQLException {
        return educationRepository.findById(id).orElse(null);
    }

    @Override
    public Education save(Education element) throws SQLException {
        return educationRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Education education = this.findbyId(id);
        if (education == null){
            return false;
        }
        education.setDelete(true);
        educationRepository.save(education);
        List<Candidate> candidateList = candidateRepository.findAll();
        for (Candidate candidate:candidateList){
            if (candidate.getEducation().isDelete()){
                candidate.setDelete(true);
                candidateRepository.save(candidate);
            }
        }
        return true;
    }
}
