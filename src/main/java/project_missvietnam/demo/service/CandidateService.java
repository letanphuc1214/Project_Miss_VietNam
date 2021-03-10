package project_missvietnam.demo.service;

import project_missvietnam.demo.model.Candidate;

import java.util.List;

public interface CandidateService extends BaseService<Candidate>{
    List<Candidate> findAllCandidateDeleted();
    Candidate findCandidateDeleted(long id);
    boolean deleteCandidate(long id);
    boolean undoCandidate(long id);

    List<Candidate> findAllCandidatesByPhoneEmailIdCard(String phone, String email, String idCard);

    List<Candidate> findAllCandidateStatusRemoved();

    List<Candidate> findAllCandidateStatusSuccess();

    List<Candidate> findAllCandidateStatusPending();


    //Trang chủ
    List<Candidate> listAllCandidateRegisteredList();

    List<Candidate> listAllCandidateRegisterSuccess();

    List<Candidate> listNewTenCandidateRegister();

    List<Candidate> listNewTenCandidateRegisterSuccess();

    Candidate candidateView(long id);

}
