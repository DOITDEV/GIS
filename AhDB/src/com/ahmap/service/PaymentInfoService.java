package com.ahmap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.PaymentInfoDao;
import com.ahmap.domain.PaymentInfo;

@Service
public class PaymentInfoService {
	
	@Autowired
	private PaymentInfoDao paymentInfoDao;
	
	public String insertPay(PaymentInfo pay){
		paymentInfoDao.addPay(pay);
		return "收款成功！"; 
	}
	public int getCount(){
		return paymentInfoDao.getCount();
	}
	public int getCountByAdd(String address){
		return paymentInfoDao.getCountByAdd(address);
	}
	//获取所有付款记录
	public List<PaymentInfo> getAllPays(String start,String limit){
		return paymentInfoDao.getAllPays(start, limit);
	}
	//根据租赁地址、承租人查询付款明细
	public List<PaymentInfo> getAllPayByAdd(String start,String limit,String address,String leaholder){
		return paymentInfoDao.getAllPaysByAdd(start, limit, address,leaholder);
	}
}
