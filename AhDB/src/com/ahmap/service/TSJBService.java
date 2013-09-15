package com.ahmap.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.SuperviseDao;
import com.ahmap.dao.TSJBDao;
import com.ahmap.domain.Supervise;
import com.ahmap.domain.TSJB;

@Service
public class TSJBService {
	@Autowired
	TSJBDao tsjbDao;
	
	public List<TSJB> getAllTSJB(String start,String limit) throws SQLException {
		return tsjbDao.getAllTSJB(start,limit);
	}
	 
	public int getCount(){
		return tsjbDao.getCount();
	}
	
	public List<TSJB> getTSJBByName(String hosName,String start,String limit) throws SQLException {
		return tsjbDao.getTSJBByName( hosName, start, limit);
	}
	 
	public int getCountByName(String hosName){
		return tsjbDao.getCountByName(hosName);
	}
}
