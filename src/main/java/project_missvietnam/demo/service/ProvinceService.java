package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Province;

import java.util.List;

public interface ProvinceService extends BaseService<Province>{

    List<Province> findAllProvinceDeleted();

    Province findProvinceDeleted(long id);

    boolean deleteProvince(long id);

    boolean undoProvince(long id);
}
