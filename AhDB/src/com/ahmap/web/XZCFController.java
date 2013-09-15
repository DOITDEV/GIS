package com.ahmap.web;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahmap.domain.TSJB;
import com.ahmap.domain.XZCF;
import com.ahmap.service.XZCFService;

@Controller
@RequestMapping("/xzcf")
public class XZCFController {
	@Autowired
	private XZCFService xzcfService;
 
	@RequestMapping("/getAllxzcf") 
	public @ResponseBody HashMap<String,Object> getAllxzcf(String start,String limit)throws Exception
    {   
		List<XZCF> xzcfList = xzcfService.getAllXZCF(start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",xzcfService.getCount());
		map.put("xzcf", xzcfList);
		return map; 
	}
	
	@RequestMapping("/getXZCFByName")  
	public @ResponseBody HashMap<String,Object> getXZCFByName(String hosName,String start,String limit) throws Exception
    {   
		List<XZCF> tsjbList = xzcfService.getXZCFByName(hosName,start,limit);
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("totalCount",xzcfService.getCountByName(hosName));
		map.put("xzcf", tsjbList);
		return map; 
	}
}
