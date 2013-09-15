package com.ahmap.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.RentDao;
import com.ahmap.domain.RentInfo;

@Service
public class RentService {
	
	@Autowired
	private RentDao rentDao;
	
	public String insertRent(RentInfo rent){
		rentDao.addRent(rent);
		return "新增成功！"; 
	}
	public String deleteRent(RentInfo rent){
		rentDao.deleteRent(rent);
		return "success";
	}
	public String updateRent(RentInfo rent){
		rentDao.updateRent(rent);
		return "修改成功！";
	}
	public List<RentInfo> getAllRents(String start, String limit){
		return rentDao.getAllRents(start, limit);
	}
	//根据城区统计出租信息
	public List<RentInfo> getAllRentByArea(String cityArea,String start,String limit){
		return rentDao.getAllRentByArea(cityArea, start, limit);
	}
	//根据地块查询
	public List<RentInfo> getAllRentsByBlock(String landBlock,String start,String limit){
		return rentDao.getAllRentsByBlock(landBlock, start, limit);
	}
}
