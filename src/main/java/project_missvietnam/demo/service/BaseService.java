package project_missvietnam.demo.service;

import java.sql.SQLException;
import java.util.List;

public interface BaseService<T> {
    List<T> findAll();
    T findbyId(long id) throws SQLException;
    T save(T element) throws SQLException;
    boolean delete(long id) throws SQLException;
}
