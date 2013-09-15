package com.ahmap.web;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ahmap.domain.PaymentInfo;
import com.ahmap.service.PaymentInfoService;

@Controller
@RequestMapping("/pay")
public class PaymentInfoController {
	
	@Autowired
	PaymentInfoService payService;
	
	//插入收款纪录
	@RequestMapping("/addPay")
	public @ResponseBody String insertPay(HttpEntity<PaymentInfo> requestEntity){
		PaymentInfo pay=requestEntity.getBody();
		return payService.insertPay(pay);
	}
	//查询收款纪录
	@RequestMapping("/findPaysByAdd")
	public @ResponseBody List<PaymentInfo> findPaysByAdd(String start,String limit,String address,String leaholder){
		List<PaymentInfo> payList=payService.getAllPayByAdd(start, limit, address,leaholder);
		return payList;
	}
	@RequestMapping("/getAllPays")
	public  @ResponseBody HashMap<String,Object> getAllPays(String start,String limit){
		HashMap<String,Object> map = new HashMap<String, Object>();
		List<PaymentInfo> payList=payService.getAllPays(start, limit);
		map.put("totalCount",payService.getCount());
		map.put("hos", payList);
		return map;
	}
}
