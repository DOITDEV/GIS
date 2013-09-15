package com.ahmap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.LeaContractDao;
import com.ahmap.domain.LeaContract;
import com.ahmap.domain.LeasseeInfo;

@Service
public class LeaContractService {

	@Autowired
	private LeaContractDao leaContractDao;
	
	public String insertLeaCont(LeaContract lea){
		leaContractDao.addleaContract(lea);
		return "success";
	}
	public String deleteLeaCont(String id){
		leaContractDao.deleteleaContract(id);
		return "success";
	}
	public String updateLeaCont(LeaContract lea){
		leaContractDao.updateleaContract(lea);
		return "修改成功！"; 
	}
	public String insertLeaContList(List<LeaContract> leaList){
		leaContractDao.addleaContractList(leaList);
		return "成功导入： "+leaList.size()+" 条数据！";
	}
	@SuppressWarnings("unchecked")
	public String insertLeaContMap(Map<String,Object> map){
		leaContractDao.addleaContractMap(map);
		List<LeasseeInfo> list=(List<LeasseeInfo>) map.get("leasseeInfoList");
		return "成功导入："+list.size()+" 条数据！";
	}
	public List<LeaContract> getLeaContList(){
		return leaContractDao.getAllLeaContracts();
	}
	
	/**
	 * 返回所有LeaContract
	 * @return
	 */
	public List<LeaContract> getAllLeaContracts(String start,String limit){
		return leaContractDao.getAllLeas(start,limit);
	}
	public int getCount(){
		return leaContractDao.getCount();
	}
}
