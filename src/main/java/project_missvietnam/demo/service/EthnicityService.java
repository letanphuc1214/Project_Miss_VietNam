package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Ethnicity;

import java.util.List;

public interface EthnicityService extends BaseService<Ethnicity>{
    List<Ethnicity> findAllEthnicityDeleted();
    Ethnicity findEthnicityDeleted(long id);
    boolean deleteEthnicity(long id);
    boolean undoEthnicity(long id);
}
