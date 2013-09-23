package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ahmap.domain.Hospital;
import com.ahmap.service.HosService;

@Controller
@RequestMapping("/hos")
public class HosController {
	
	@Autowired
	private HosService hosService;
	/**
	 * 对外接口匹配hosname 获取hos
	 * @param name
	 * @param start
	 * @param limit
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/findHosByName")
	public @ResponseBody List<Hospital> findHosByName(String hosName,String start,String limit) throws UnsupportedEncodingException{
		List<Hospital> serverList = hosService.findHosByName(hosName);
		return serverList;
	}
	 
	@RequestMapping("/getHosByName")
	public @ResponseBody HashMap<String,Object> getHosByName(String name,String start,String limit) throws UnsupportedEncodingException{
		String temp = new String(name.getBytes("ISO-8859-1"),"utf-8");  
		name = URLDecoder.decode(temp, "utf-8");
		//return hosService.getHosByName(name);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		List<Hospital> serverList = hosService.getHosByName(name,start,limit);
		map.put("totalCount",hosService.getCount2(name));
		map.put("hos", serverList);
		//maps.put("Hos:", serverList);
		return map;//serverList;//maps;
	}
	
    /**
	 * 对内接口 获取所有hos
	 * @return 
	 */
	@RequestMapping("/getAllHos")
	//public @ResponseBody Map<String,Object> getAllHos(){  
	public @ResponseBody HashMap<String,Object> getAllHos(String start,String limit){
		//HashMap<String,Object> maps = new HashMap<String, Object>();  
		//maps.put("totle", 100); 
		HashMap<String,Object> map = new HashMap<String, Object>();
		List<Hospital> serverList = hosService.getAllHos(start,limit);
		map.put("totalCount",hosService.getCount());
		map.put("hos", serverList);
		//maps.put("Hos:", serverList);
		return map;//serverList;//maps;
	} 
	 
	@RequestMapping("/getAllHos2")
	//public @ResponseBody Map<String,Object> getAllHos(){  
	public @ResponseBody List<Hospital> getAllHos2(String name){
		List<Hospital> serverList = hosService.getAllHos2(name);
		return  serverList;//maps;
	} 
	
	
	/**
	 * 对内接口 删除指定hos
	 * @return  
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/deleteHos")
	public @ResponseBody String deleteHos(String hosName){ 
		return hosService.deleteHos(hosName);
	}
	
	/**
	 * 对内接口 更新指定hos
	 * @return 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/updateHos")
	public @ResponseBody String updateHos(HttpEntity<Hospital> requestEntity) throws FileNotFoundException, IOException
	{
		Hospital hos = requestEntity.getBody();
		return hosService.upDateHos(hos);
	}
	
	/**
	 * 对内接口 新增hos
	 * @return 
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/addHos")
	public @ResponseBody String insertHos(HttpEntity<Hospital> requestEntity)
	{
		Hospital hos = requestEntity.getBody();
		return hosService.insertHos(hos);
	}
}
