package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.RentInfo;
import com.ahmap.service.RentService;

@Controller
@RequestMapping("/rent")
public class RentInfoController {
	
	@Autowired
	private RentService rentService;
	
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
	public @ResponseBody String updateRent(RentInfo requestEntity) throws FileNotFoundException, IOException
	{
		RentInfo rent = requestEntity;
		if(!CommonUtils.isEmpty(rent.getId())){
			return rentService.updateRent(rent);
		}else{
			return insertLeaRent(rent);
		}
//		return "{success:true,msg:'test'}";
	}
	
}
