package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.LoginDto;
import tw_Project.sweet.Dto.UserDto;
import tw_Project.sweet.Model.User;
import tw_Project.sweet.Model.VerificationAndRegisterData;
import tw_Project.sweet.utils.AuthenticationResponse;

import java.text.ParseException;

@Service
public interface LoginRegisterService {
    User login(LoginDto loginDto);
    void register(UserDto registerDto);
    public AuthenticationResponse registerAfterVerification(VerificationAndRegisterData verificationAndRegisterData) ;

}
