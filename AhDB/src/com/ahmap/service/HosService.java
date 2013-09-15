package com.ahmap.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ahmap.dao.HosDao;
import com.ahmap.dao.SuperviseDao;
import com.ahmap.domain.Hospital;
import com.ahmap.domain.Supervise;

@Service
public class HosService {
    
	@Autowired
	private HosDao hosDao;
	@Autowired
	SuperviseDao superviseDao;
	
	
	public List<Supervise> getAllSuper(String start,String limit) throws SQLException {
		return superviseDao.getAllSuper(start,limit);
	}
	public int getCount2(String name){
		return hosDao.getCount2(name);//superviseDao.getCount2(name);
	}
	public List<Supervise> getSuperviseByName(String name){
		return superviseDao.getSuperviseByName(name);
	}
	
	/**
	 * 返回所有hospital
	 * @return
	 */
	public List<Hospital> getAllHos2(String hosName){
		return hosDao.getAllHos2(hosName);
	}
	
	/**
	 * 返回所有hospital
	 * @return
	 */
	public List<Hospital> getAllHos(String start,String limit){
		return hosDao.getAllHos(start,limit);
	}
	public int getCount(){
		return hosDao.getCount();
	}
	
	public List<Hospital> findHosByName(String hosName){
		return hosDao.findHosByName(hosName);
	}
	/**
	 * 模糊查询
	 * @param hosName
	 * @param limit 
	 * @param start 
	 * @return
	 */
	public List<Hospital> getHosByName(String hosName, String start, String limit){
		return hosDao.getHosByName(hosName,start,limit);
	}
	/**
	 * 新增医疗机构信息
	 * @param hos
	 * @return
	 */
	public String insertHos(Hospital hos) {
			//return wfsDao.insertService(wfs);
			if(hosDao.getMatchCount(hos.getName())>0)
			 {
				 return "该医院已存在！";
			 }
			else
			 {
				 hosDao.addHospital(hos);
				 return "添加信息成功！";
			 }	
	}
	
	/**
	 * 删除hospital
	 * @param name
	 * @return
	 */
	public String deleteHos(String name){
		hosDao.deleteHos(name);
		return "success";
	}
	
	/**
	 * 修改hospital
	 * @param hospital
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public String upDateHos(Hospital hospital){// throws FileNotFoundException, IOException{
		hosDao.updateHos(hospital);
		return "修改成功！";
	}
	 
}
