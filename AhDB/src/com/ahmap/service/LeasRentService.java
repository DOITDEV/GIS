package com.ahmap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.LeasRentDao;
import com.ahmap.domain.LeasRent;

@Service
public class LeasRentService {
	@Autowired
	private LeasRentDao leasRentDao;
	
	//查询所有记录
	public List<LeasRent> getAllLeasRentList(){
		return leasRentDao.getAllLeasRentList();
	}
	//根据条件查询数据
	public List<LeasRent> getLeasRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
		return leasRentDao.getLeasRentList(start,limit,propertys,lanBlock,startDate,endDate,leaholder,rentStatus);
	}
	//查询历史租赁信息
	public List<LeasRent> getLastRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
		return leasRentDao.getLastRentList(start,limit,propertys,lanBlock,startDate,endDate,leaholder,rentStatus);
	}
}
