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
		return "新增成功！"; 
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
	
}
