package tw_Project.sweet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tw_Project.sweet.Dto.FavouriteDto;
import tw_Project.sweet.Dto.FavouriteItemDto;
import tw_Project.sweet.Service.FavouriteService;
import tw_Project.sweet.utils.ApiResponse;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping( "api/in/user/favourite")
public class FavouriteController {

    private final FavouriteService favouriteService;

    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @GetMapping("/getAllUserFavourite/{userEmail}")
    public ResponseEntity<ApiResponse> getAllUserFavourite(@PathVariable String userEmail){
        List<FavouriteItemDto> favouriteDtos = favouriteService.getAllFavouriteUser(userEmail);
        return ResponseEntity.ok(ApiResponse.success("All user Favourites", favouriteDtos));
    }

    @PostMapping("/addNewProductToFavourite")
    public ResponseEntity<ApiResponse> addNewFavouriteProduct(@RequestBody FavouriteDto favouriteDto){
        favouriteService.addNewFavouriteItems(favouriteDto);
        return ResponseEntity.ok(ApiResponse.success("New item added to favourite successfully", null));
    }
}
