package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.TastingRequestDto;
import tw_Project.sweet.Model.TastingRequest;
import tw_Project.sweet.Repository.TastingRequestRepository;
import tw_Project.sweet.Service.TastingRequestService;

import java.util.List;

@Service
public class TastingRequestServiceImpl implements TastingRequestService {


    private final TastingRequestRepository tastingRequestRepository;

    @Autowired
    public TastingRequestServiceImpl(TastingRequestRepository tastingRequestRepository) {
        this.tastingRequestRepository = tastingRequestRepository;
    }

    public void addNewRequest(TastingRequestDto tastingRequestDto){
        TastingRequest tastingRequest = new TastingRequest();
        tastingRequest.setEmailUser(tastingRequestDto.getEmailUser());
        tastingRequest.setEventType(tastingRequestDto.getEventType());
        tastingRequest.setGuestNumber(tastingRequestDto.getGuestNumber());
        tastingRequest.setEventDate(tastingRequestDto.getEventDate());
        tastingRequest.setPhoneNumber(tastingRequestDto.getPhoneNumber());
        tastingRequestRepository.save(tastingRequest);
    }

    public List<TastingRequest> getAllTastingsRequests(){
        return tastingRequestRepository.findAll();
    }

    public List<TastingRequest>getAllUserRequests(String userEmail){
        return tastingRequestRepository.findAllByEmailUser(userEmail);
    }

}
