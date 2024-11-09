package tw_Project.sweet.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import tw_Project.sweet.Dto.OrderDto;
import tw_Project.sweet.Model.Order;

@Service
public interface OrderService {
    public Order addNewOrder(@RequestBody OrderDto orderDto);

    public void deleteOrder(Long orderId);

    public void changeOrderStatus(Long orderId, String newOrderStatus);

}
