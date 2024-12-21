package tw_Project.sweet.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw_Project.sweet.Dto.DisplayOrdersDto;
import tw_Project.sweet.Dto.OrderDto;
import tw_Project.sweet.Exceptions.BadRequestException;
import tw_Project.sweet.Model.*;
import tw_Project.sweet.Model.enums.DeliveryMethod;
import tw_Project.sweet.Model.enums.OrderStatus;
import tw_Project.sweet.Repository.AddressRepository;
import tw_Project.sweet.Repository.OrderDetailsRepository;
import tw_Project.sweet.Repository.OrderRepository;
import tw_Project.sweet.Service.OrderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderDetailsRepository orderDetailsRepository;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AddressRepository addressRepository, OrderDetailsRepository orderDetailsRepository) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Override
    public Order addNewOrder(OrderDto orderDto) {
        Order order = new Order();
        Optional<Address> optionalAddress = addressRepository.getAddressesByAddressId(orderDto.getAddressId());
        if(optionalAddress.isPresent()){
            Address address = optionalAddress.get();
            order.setAddress(address);
            order.setDateAndTime(orderDto.getDateAndTime());
            order.setDeliveryMethod(DeliveryMethod.valueOf(orderDto.getDeliveryMethod()));
            order.setDeliveryMessage(orderDto.getDeliveryMessage());
            order.setPrice(orderDto.getPrice());
            order.setOrderStatus(OrderStatus.ARRIVED);
            return orderRepository.save(order);
        }
        else{
            throw new BadRequestException("There is no address with this id");
        }
    }

    @Override
    public void deleteOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.getOrderByIdOrder(orderId);
        if(optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            orderRepository.delete(order);
        }
        else{
            throw new BadRequestException("There is no order with this id");
        }
    }

    @Override
    public void changeOrderStatus(Long orderId, String newOrderStatus) {
        Optional<Order> optionalOrder = orderRepository.getOrderByIdOrder(orderId);
        if(optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            order.setOrderStatus(OrderStatus.valueOf(newOrderStatus));
        }
        else{
            throw new BadRequestException("There is no order with this id");
        }
    }

    @Override
    public List<DisplayOrdersDto> getAllOrders() {
        List<Order> orders = orderRepository.getAll();
        List<DisplayOrdersDto> displayOrdersDtos = new ArrayList<>();
        for(Order order: orders)
        {
            DisplayOrdersDto displayOrdersDto =  new DisplayOrdersDto();
            displayOrdersDto.setAddressId(order.getAddress().getAddressId());
            displayOrdersDto.setPrice(order.getPrice());
            displayOrdersDto.setDeliveryMethod(order.getDeliveryMethod().toString());
            displayOrdersDto.setDeliveryMessage(order.getDeliveryMessage());
            displayOrdersDto.setDateAndTime(order.getDateAndTime());
            List<Product> orderProducts = new ArrayList<>();
            List<OrderDetails> orderDetails = orderDetailsRepository.findAllByOrder(order);
            for(OrderDetails orderDetail: orderDetails){
                CartItem cartItem = orderDetail.getCartItem();
                Product product = cartItem.getProduct();
                orderProducts.add(product);
            }
            displayOrdersDto.setProducts(orderProducts);
        }
        return displayOrdersDtos;
    }

}
