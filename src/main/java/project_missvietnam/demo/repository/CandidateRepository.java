package project_missvietnam.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import project_missvietnam.demo.model.Candidate;

import java.util.List;

@Component
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

//    Admin

    @Query(
        value = "select candidates.id, candidates.full_name, candidates.date_of_birth, candidates.residential_address, candidates.contact_address, candidates.phone, candidates.email, candidates.id_card, candidates.job, candidates.work_unit, candidates.height, candidates.weight, candidates.gifted, candidates.avatar, candidates.status, candidates.delete, candidates.province_id, candidates.education_id, candidates.ethnicity_id \n" +
                " from candidates, provinces, educations, ethnicities \n" +
                " where candidates.delete = true \n" +
                " and provinces.delete = false \n" +
                " and educations.delete = false \n" +
                " and ethnicities.delete = false \n" +
                " and candidates.province_id = provinces.id \n" +
                " and candidates.education_id = educations.id \n" +
                " and candidates.ethnicity_id = ethnicities.id",
            nativeQuery = true)
    List<Candidate> findAllCandidateDeleted();

    @Query(
            value = "select * from candidates where id=?1", nativeQuery = true
    )
    Candidate findCandidateDeleted(long id);

    @Query(
            value = "select * from candidates where phone=?1 or email=?2 or id_card=?3",
            nativeQuery = true
    )
    List<Candidate> findAllCandidatesByPhoneEmailIdCard (String phone, String email, String idCard);

    @Query(
            value = "select * from candidates where status='Bị loại' and delete =false", nativeQuery = true
    )
    List<Candidate> findAllCandidateStatusRemoved();

    @Query(
            value = "select * from candidates where status='Đã duyệt' and delete =false", nativeQuery = true
    )
    List<Candidate> findAllCandidateStatusSuccess();

    @Query(
            value = "select * from candidates where status='Chờ duyệt' and delete =false " , nativeQuery = true
    )
    List<Candidate> findAllCandidateStatusPending();

    //Trang chủ

    @Query(
            value = "select * from candidates where delete = false ", nativeQuery = true
    )
    List<Candidate> listAllCandidateRegisteredList();

    @Query(
            value = "select * from candidates where status = 'Đã duyệt' and delete = false ", nativeQuery = true
    )
    List<Candidate> listAllCandidateRegisteredListSuccess();

    @Query(
            value = "select  * from candidates where delete = false order by id desc limit 10", nativeQuery = true
    )
    List<Candidate> listNewTenCandidateRegister();

    @Query(
            value = "select * from candidates where status='Đã duyệt' and delete =false order by id desc limit 10", nativeQuery = true
    )
    List<Candidate> listNewTenCandidateRegisterSuccess();

    @Query(
            value = "select * from candidates where id=?1 and delete = false", nativeQuery = true
    )
    Candidate candidateView(long id);

}
