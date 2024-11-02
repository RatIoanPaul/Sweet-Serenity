package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.PreorderDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.Address;
import tw_Project.sweet.Model.enums.DeliveryMethod;
import tw_Project.sweet.Model.Preorder;
import tw_Project.sweet.Repository.AddressRepository;
import tw_Project.sweet.Repository.PreorderRepository;
import tw_Project.sweet.Repository.UserRepository;
import tw_Project.sweet.Service.PreorderService;

import java.util.Optional;

@Service
public class PreorderServiceImpl implements PreorderService {
    private final PreorderRepository preorderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;


    @Autowired
    public PreorderServiceImpl(PreorderRepository preorderRepository, AddressRepository addressRepository, UserRepository userRepository) {
        this.preorderRepository = preorderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Preorder addNewPreorder(PreorderDto preorderDto) {
        Preorder preorder = new Preorder();
        Optional<Address> optionalAddress = addressRepository.getAddressesByAddressId(preorderDto.getAddressId());
        if(optionalAddress.isPresent()){
            Address address = optionalAddress.get();
            preorder.setAddress(address);
            preorder.setDateAndTime(preorderDto.getDateAndTime());
            preorder.setDeliveryMethod(DeliveryMethod.valueOf(preorderDto.getDeliveryMethod()));
            preorder.setDeliveryMessage(preorderDto.getDeliveryMessage());
            preorder.setPrice(preorderDto.getPrice());
            return preorderRepository.save(preorder);
        }
        else{
            throw new BadRequestException("There is no address with this id");
        }
    }

    @Override
    public void deletePreorder(Long preorderId) {
        Optional<Preorder> optionalPreorder = preorderRepository.getPreordersByIdPreorder(preorderId);
        if(optionalPreorder.isPresent()){
            Preorder preorder = optionalPreorder.get();
            preorderRepository.delete(preorder);
        }
        else{
            throw new BadRequestException("There is no preorder with this id");
        }
    }
}