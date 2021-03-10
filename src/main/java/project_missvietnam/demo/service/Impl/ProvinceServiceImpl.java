package project_missvietnam.demo.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project_missvietnam.demo.model.Candidate;
import project_missvietnam.demo.model.Province;
import project_missvietnam.demo.repository.CandidateRepository;
import project_missvietnam.demo.repository.ProvinceRepository;
import project_missvietnam.demo.service.ProvinceService;

import java.sql.SQLException;
import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {
    @Autowired
    public ProvinceRepository provinceRepository;

    @Autowired
    public CandidateRepository candidateRepository;

    @Override
    public List<Province> findAllProvinceDeleted() {
        return provinceRepository.findAllProvinceDeleted();
    }

    @Override
    public Province findProvinceDeleted(long id) {
        Province province = null;
        province = provinceRepository.findProvinceDeleted(id);
        return province;
    }

    @Override
    public boolean deleteProvince(long id) {
        Province province = this.findProvinceDeleted(id);
        if (province != null){
            provinceRepository.delete(province);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoProvince(long id) {
        Province province = this.findProvinceDeleted(id);
        if (province != null){
            province.setDelete(false);
            provinceRepository.save(province);
            return true;
        }
        return false;
    }

    @Override
    public List<Province> findAll() {
        return provinceRepository.findAll();
    }

    @Override
    public Province findbyId(long id) throws SQLException {
        return provinceRepository.findById(id).orElse(null);
    }

    @Override
    public Province save(Province element) throws SQLException {
        return provinceRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Province province = this.findbyId(id);
        if (province == null){
            return false;
        }
        province.setDelete(true);
        provinceRepository.save(province);
        List<Candidate> candidateList = candidateRepository.findAll();
        for (Candidate candidate:candidateList){
            if (candidate.getProvince().isDelete()){
                candidate.setDelete(true);
                candidateRepository.save(candidate);
            }
        }
        return true;
    }
}
