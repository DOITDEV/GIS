package com.ahmap.service;

import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.XZCFDao;
import com.ahmap.domain.TSJB;
import com.ahmap.domain.XZCF;

@Service
public class XZCFService {
	@Autowired
	XZCFDao xzcfDao;
	
	public List<XZCF> getAllXZCF(String start,String limit) throws SQLException {
		return xzcfDao.getAllXZCF(start,limit);
	}
	 
	public int getCount(){
		return xzcfDao.getCount();
	}
	public List<XZCF> getXZCFByName(String hosName,String start,String limit) throws SQLException {
		return xzcfDao.getXZCFByName( hosName, start, limit);
	}
	 
	public int getCountByName(String hosName){
		return xzcfDao.getCountByName(hosName);
	}
}
