package com.ahmap.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.LeasseeDao;
import com.ahmap.domain.LeasseeInfo;


@Service
public class LeasseeService {
	
	@Autowired
	private LeasseeDao leasseeDao;
	
	public String insertLeassee(LeasseeInfo lea){
		leasseeDao.addLeassee(lea);
		return "{success:true}";
	}
	public String insertLeassee2(LeasseeInfo lea){
		leasseeDao.addLeassee2(lea);
		return "{success:true}";
	}
	public String updateLeassee(LeasseeInfo lea){
		leasseeDao.updateLeassee(lea);
		return "{success:true}";
	}
	public String deleteLeassee(String id){
		leasseeDao.deleteLeassee(id);
		return "success";
	}
	public int getCount(){
		return leasseeDao.getCount();
	}
	public int getCountByAdd(String address){
		return leasseeDao.getCountByAdd(address);
	}
	public List<LeasseeInfo> getAllLeassees(String start,String limit){
		return leasseeDao.getAllLeassee(start, limit);
	}
	public List<LeasseeInfo> getAllLeassees(){
		return leasseeDao.getAllLeassee();
	}
	
}
