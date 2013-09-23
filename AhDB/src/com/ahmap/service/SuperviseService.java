package com.ahmap.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.SuperviseDao;
import com.ahmap.domain.Supervise;

@Service
public class SuperviseService {
	@Autowired
	SuperviseDao superviseDao;
	
	
	public List<Supervise> getAllSuper(String start,String limit) throws SQLException {
		return superviseDao.getAllSuper(start,limit);
	}
	
	public int getCountByHos(String name){
		return superviseDao.getCountByHos(name);
	}
	public int getCountByUser(String name){
		return superviseDao.getCountByUser(name);
	}
	public int getCount(){
		return superviseDao.getCount();
	}
	public int geHisCount(String name){
		return superviseDao.geHisCount(name);
	}
	
	public List<Supervise> getSuperviseByName(String name){
		return superviseDao.getSuperviseByName(name);
	}
	public List<Supervise> getSuperByHos(String start,String limit,String name) throws SQLException{
		return superviseDao.getSuperByHos(start,limit,name);
	}
	public List<Supervise> getSuperByUser(String start,String limit,String name) throws SQLException{
		return superviseDao.getSuperByUser(start,limit,name);
	}
	public List<Supervise> getHisSupervise(String name,String start,String limit){
		return superviseDao.getHisSupervise(name,start,limit);
	}

	public List<Supervise> getSuperByDate(String start, String limit,
			String begin, String end) {
		return superviseDao.getSuperByDate(start,limit,begin,end);
	}

	public int getCountByDate(String begin, String end) {
		return superviseDao.getCountByDate(begin,end);
	}
}
