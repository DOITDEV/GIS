package com.ahmap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.ThirdRentDao;
import com.ahmap.domain.ThirdRent;

@Service
public class ThirdRentService {
	
	@Autowired
	private ThirdRentDao thirdRentDao;
	//录入第三方出租信息
	public String insertRent(ThirdRent rent){
		thirdRentDao.addRent(rent);
		return "{success:true,msg:'test'}";
//		return "新增成功！"; 
	}
	//删除第三方出租信息
	public String deleteRent(String id){
		thirdRentDao.deleteRent(id);
		return "success";
	}
	//修改第三方出租信息
	public String updateRent(ThirdRent rent){
		thirdRentDao.updateRent(rent);
		return "修改成功！";
	}
	public List<ThirdRent> getAllRents(String start, String limit){
		return thirdRentDao.getAllRents(start, limit);
	}
	public int getCount(){
		return thirdRentDao.getCount();
	}
	//根据城区统计出租信息
	public List<ThirdRent> getAllRentByArea(String cityArea,String start,String limit){
		return thirdRentDao.getAllRentByArea(cityArea, start, limit);
	}
	//根据地块查询
	public List<ThirdRent> getAllRentsByBlock(String landBlock,String start,String limit){
		return thirdRentDao.getAllRentsByBlock(landBlock, start, limit);
	}
}
