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
import com.ahmap.domain.TSJB;
import com.ahmap.service.HosService;
import com.ahmap.service.SuperviseService;
import com.ahmap.service.TSJBService;

@Controller
@RequestMapping("/tsjb")
public class TSJBController {
	@Autowired
	private TSJBService tsjbService;

	 
	
	@RequestMapping("/getAlltsjb")  
	public @ResponseBody HashMap<String,Object> getAlltsjb(String start,String limit)throws Exception
    {   
		List<TSJB> tsjbList = tsjbService.getAllTSJB(start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",tsjbService.getCount());
		map.put("tsjb", tsjbList);
		return map; 
	}
	@RequestMapping("/getTSJBByName")  
	public @ResponseBody HashMap<String,Object> getTSJBByName(String hosName,String start,String limit) throws Exception
    {   
		List<TSJB> tsjbList = tsjbService.getTSJBByName(hosName,start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",tsjbService.getCountByName(hosName));
		map.put("tsjb", tsjbList);
		return map; 
	}
}
