package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahmap.base.ResultModel;
import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.RentInfo;
import com.ahmap.domain.ThirdRent;
import com.ahmap.service.RentService;
import com.ahmap.service.ThirdRentService;

@Controller
@RequestMapping("/rent")
public class RentInfoController {
	
	@Autowired
	private RentService rentService;
	
	@Autowired
	private ThirdRentService thirdRentService ;
	
	 /**
	 * 对内接口 获取所有rent
	 * @return 
	 */
	@RequestMapping("/getAllRents")
	public @ResponseBody HashMap<String,Object> getAllRentList(String start,String limit){
		HashMap<String,Object> map = new HashMap<String, Object>();
		List<RentInfo> serverList =rentService.getAllRents(start, limit);
		map.put("totalCount",rentService.getCount());
		map.put("rent", serverList);
		return map;
	} 
	 /**
	 * 对内接口 获取所有rent
	 * @return 
	 */
	@RequestMapping("/addRent")
	public @ResponseBody String insertLeaRent(RentInfo requestEntity){
		RentInfo rent=requestEntity;
		return rentService.insertRent(rent);
	} 

	/**
	 * 对内接口 删除指定rent
	 * @return  
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/deleteRent")
	public @ResponseBody String deleteRent(String  id){ 
		return rentService.deleteRent(id);
		
	}
	
	/**
	 * 对内接口 更新指定rent
	 * @return 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/updateRent")
	public @ResponseBody ResultModel updateRent(RentInfo requestEntity) throws FileNotFoundException, IOException
	{
		RentInfo rent = requestEntity;
		if(!CommonUtils.isEmpty(rent.getId())){
			rentService.updateRent(rent);
			
			return ResultModel.getResult(0, null, null);
		}else{
			insertLeaRent(rent);
			
			return ResultModel.getResult(0, null, null);
		}
//		return "{success:true,msg:'test'}";
	}
	
	 /**
	 * 录入第三方租赁信息
	 * @return 
	 */
	@RequestMapping("/addThirdRent")
	public @ResponseBody String insertThirdRent(ThirdRent requestEntity){
		ThirdRent rent=requestEntity;
		return thirdRentService.insertRent(rent);
	} 
	/**
	 * 修改第三方租赁信息
	 * @return 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/updateThirdRent")
	public @ResponseBody String updateThirdRent(ThirdRent requestEntity) throws FileNotFoundException, IOException
	{
		ThirdRent rent = requestEntity;
		if(!CommonUtils.isEmpty(rent.getId())){
			return thirdRentService.updateRent(rent);
		}else{
			return insertThirdRent(rent);
		}
	}
	
	/**
	 * 删除第三方租赁信息
	 * @return  
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/deleteThirdRent")
	public @ResponseBody String deleteThirdRent(String  id){ 
		return thirdRentService.deleteRent(id);
		
	}
	 /**
		 * 获取所有第三方租赁信息
		 * @return 
		 */
	@RequestMapping("/getAllThirdRents")
	public @ResponseBody HashMap<String,Object> getAllThirdRentList(String start,String limit){
		HashMap<String,Object> map = new HashMap<String, Object>();
		List<ThirdRent> serverList =thirdRentService.getAllRents(start, limit);
		map.put("totalCount",thirdRentService.getCount());
		map.put("rent", serverList);
		return map;
	} 
}
