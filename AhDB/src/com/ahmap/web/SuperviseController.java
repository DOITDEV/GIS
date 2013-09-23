package com.ahmap.web;

import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahmap.domain.Hospital;
import com.ahmap.domain.Supervise;
import com.ahmap.service.HosService;
import com.ahmap.service.SuperviseService;

@Controller
@RequestMapping("/supervise")
public class SuperviseController {
	@Autowired
	private SuperviseService superviseService;
//	@Autowired
//	private HosService hosService;
//	@RequestMapping("/getAllSupervise")  
//	public @ResponseBody HashMap<String,Object> getAllSupervise(String start,String limit)throws Exception
//    {   
//		List<Supervise> superviseList = hosService.getAllSuper(start,limit);
//		HashMap<String,Object> map = new HashMap<String, Object>();
//		map.put("totalCount",hosService.getCount2());
//		map.put("supervise", superviseList);
//		//maps.put("Hos:", serverList);
//		return map;//HashMap<String,Object>
//		//return superviseList;//maps;
//	} 
	@RequestMapping("/getSuperByDate")  
	public @ResponseBody HashMap<String,Object> getSuperByDate(String start,String limit,String begin,String end) throws Exception
    {   
		//String temp = new String(hosName.getBytes("ISO-8859-1"),"utf-8");  
		//hosName = URLDecoder.decode(temp, "utf-8");
		List<Supervise> superviseList = superviseService.getSuperByDate(start,limit,begin,end);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",superviseService.getCountByDate(begin,end));
		map.put("supervise", superviseList);
		return map; 
	} 
	@RequestMapping("/getSuperByHos")  
	public @ResponseBody HashMap<String,Object> getSuperByHos(String start,String limit,String hosName) throws Exception
    {   
		//String temp = new String(hosName.getBytes("ISO-8859-1"),"utf-8");  
		//hosName = URLDecoder.decode(temp, "utf-8");
		List<Supervise> superviseList = superviseService.getSuperByHos(start,limit,hosName);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",superviseService.getCountByHos(hosName));
		map.put("supervise", superviseList);
		return map; 
	} 
	@RequestMapping("/getSuperByUser")  
	public @ResponseBody HashMap<String,Object> getSuperByUser(String start,String limit,String userName) throws Exception
    {   
		//String temp = new String(userName.getBytes("ISO-8859-1"),"utf-8");  
		//userName = URLDecoder.decode(temp, "utf-8");
		List<Supervise> superviseList = superviseService.getSuperByUser(start,limit,userName);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",superviseService.getCountByUser(userName));
		map.put("supervise", superviseList);
		return map; 
	} 
	
	@RequestMapping("/getAllSupervise")  
	public @ResponseBody HashMap<String,Object> getAllSupervise2(String start,String limit)throws Exception
    {   
		List<Supervise> superviseList = superviseService.getAllSuper(start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",superviseService.getCount());
		map.put("supervise", superviseList);
		//maps.put("Hos:", serverList);
		return map;//HashMap<String,Object>
		//return superviseList;//maps;
	} 
	
	@RequestMapping("/getSuperviseByName")  
	public @ResponseBody List<Supervise> getSuperviseByName(String name) throws Exception
    {   
		List<Supervise> superviseList = superviseService.getSuperviseByName(name);
		return superviseList;
	} 
	@RequestMapping("/getHisSupervise")  
	public @ResponseBody HashMap<String,Object> getHisSupervise(String name,String start,String limit)throws Exception
    {   
		List<Supervise> superviseList = superviseService.getHisSupervise(name,start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",superviseService.geHisCount(name));
		map.put("supervise", superviseList);
		//maps.put("Hos:", serverList);
		return map;//HashMap<String,Object>
		//return superviseList;//maps;
	} 
	
}
