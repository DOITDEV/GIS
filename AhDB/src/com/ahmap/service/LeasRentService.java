package com.ahmap.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.LeasRentDao;
import com.ahmap.dao.LeasseeDao;
import com.ahmap.domain.LeasRent;
import com.ahmap.domain.LeasseeInfo;
import com.ahmap.domain.ThirdRent;

@Service
public class LeasRentService {
	@Autowired
	private LeasRentDao leasRentDao;
	
	@Autowired
	private LeasseeDao leasseeDao;
	
	public LeasRentDao getLeasRentDao() {
		if(leasRentDao==null){
			leasRentDao=new LeasRentDao();
		}
		return leasRentDao;
	}
	//查询所有记录
	public List<LeasRent> getAllLeasRentList(String start,String limit){
		return leasRentDao.getAllLeasRentList(start,limit);
	}
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
	//租赁已到期的条数
	public int getCount(){
		return leasRentDao.getCount();
	}
	//租赁已到期的条数
	public int getOverCount(){
		return leasRentDao.getOverCount();
	}
	//查询未出租的纪录
	public int getNoRentCount(){
		return leasRentDao.getNoRentCount();
	}
	//查询1个月到期的纪录
	public int getMonthCount(){
		return leasRentDao.getOver3MonCount();
	}
	//查询3个月到期的纪录
	public int getthreeMonthCount(){
		return leasRentDao.getOver3MonCount();
	}
	public void updateLeasRent(){
		List<LeasseeInfo> leasseeInfoList=leasseeDao.getAllLeassee();
		leasRentDao.updateLeasRent(leasseeInfoList);
	}
	//根据地块、城区、道路地址统计租赁信息
	public List<LeasRent> getAllRentByArea(String cityArea,String lanBlock,String address,String start,String limit){
		return leasRentDao.getAllRentByArea(cityArea,lanBlock,address,start, limit);
	}
	
	//系统定时更新租赁信息状态
	public void updateLimitDays() throws ParseException{
		getLeasRentDao().updateLimitDays();
	}
	@SuppressWarnings("unchecked")
	public String insertLeaContMap(Map<String,Object> map){
		leasRentDao.addleaContractMap(map);
		List<LeasseeInfo> list=(List<LeasseeInfo>) map.get("leasseeInfoList");
		return "成功导入："+list.size()+" 条数据！";
	}
}
