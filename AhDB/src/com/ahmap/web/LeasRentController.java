package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.LeasRent;
import com.ahmap.domain.LeasseeInfo;
import com.ahmap.service.LeasRentService;
import com.ahmap.service.LeasseeService;


@Controller
@RequestMapping("/lear")
public class LeasRentController {
	
	@Autowired
	private LeasRentService leasRentService;
	
	@Autowired
	private LeasseeService leaService;

	  /**
		 * 对内接口 获取所有lear
		 * @return 
		 */
		@RequestMapping("/getAllLeasRent")
		public @ResponseBody HashMap<String,Object> getAllLeasRent(String start,String limit){
			HashMap<String,Object> map = new HashMap<String, Object>();
//			List<LeaContract> serverList = leaConService.getAllLeaContracts(start,limit);
			List<LeasRent> serverList =leasRentService.getAllLeasRentList(start,limit);
			map.put("totalCount",leasRentService.getCount());
			map.put("lear", serverList);
			return map;
		} 
	/**
	 * 对内接口 获取所有leas
	 * @return 
	 */
	@RequestMapping("/getAllLeasC")
	public @ResponseBody HashMap<String,Object> getAllLeasC(String start,String limit){
		HashMap<String,Object> map = new HashMap<String, Object>();
//		List<LeaContract> serverList = leaConService.getAllLeaContracts(start,limit);
//		List<LeasRent> serverList =leasRentService.getAllLeasRentList(start,limit);
		List<LeasseeInfo> serverList =leaService.getAllLeassees(start, limit);
		map.put("totalCount",leaService.getCount());
		map.put("lear", serverList);
		return map;
	} 
	
	 /**
	 * 对内接口 获取所有leas
	 * @return 
	 */
	@RequestMapping("/addLeass")
	public @ResponseBody String insertLeaRent(LeasseeInfo requestEntity){
		LeasseeInfo lea=requestEntity;
		if(!CommonUtils.isEmpty(lea.getId())){
			return leaService.updateLeassee(lea);
		}else{
			return leaService.insertLeassee(lea);
		}
		
	} 
	/**
	 * 对内接口 删除指定hos
	 * @return  
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/deleteLeass")
	public @ResponseBody String deleteLeasC(String id){ 
		return leaService.deleteLeassee(id);
	}
}
