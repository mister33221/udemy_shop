package com.luv2code.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.dao.CustomerRespository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;

@Service
public class ChackoutServiceImpl implements CheckoutService{

	
	private CustomerRespository CustomerRespository;
	
	
	//我原本是寫private 就會跳錯
	//org.springframework.beans.factory.UnsatisfiedDependencyExceptionion: //後面還有很長一串 要看的話再重新製造一次error
	//改成public就好了?  why
	@Autowired
	public ChackoutServiceImpl(CustomerRespository customerRespository) {
		this.CustomerRespository = customerRespository;
	}

	
	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		//retrive the order info form dto
		Order order = purchase.getOrder();
		
		//geenerate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		//populate order with orderItems
		Set<OrderItem> orderItem = purchase.getOrderItems();
		orderItem.forEach(item -> order.add(item));
		
		//populate order with billingAddress and shippingAddress
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		
		//populate customer with order
		Customer customer = purchase.getCustomer();
		customer.add(order);
		
		//save to databass
		CustomerRespository.save(customer);
		
		//return a response
		return new PurchaseResponse(orderTrackingNumber);
		
//		return null;
	}
//
	private String generateOrderTrackingNumber() {
		//generate a random UUID number(UUID version-4
		//For detail see: https://en.wikipedia~~~~~~
		return UUID.randomUUID().toString();
	}

}
