package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Education;

import java.util.List;

public interface EducationService extends BaseService<Education>{

    List<Education> findAllEducationDeleted();

    Education findEducationDeleted(long id);

    boolean deleteEducation(long id);

    boolean undoEducation(long id);

}
