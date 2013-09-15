package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.ahmap.domain.LeaContract;
import com.ahmap.service.LeaContractService;
import com.ahmap.service.LeasRentService;
import com.ahmap.service.LeasseeService;
import com.ahmap.service.RentService;

@Controller
@RequestMapping("/leas")
public class LeaContractController {

	@Autowired
	private LeaContractService leaConService;
	
	@Autowired
	private LeasRentService leasRentService;
	
	@Autowired
	private RentService  rentService;
	
	@Autowired
	private LeasseeService leaService;
	
	private String resultStr;
	
	  /**
		 * 对内接口 获取所有leas
		 * @return 
		 */
		@RequestMapping("/getAllLeasC")
		public @ResponseBody HashMap<String,Object> getAllLeasC(String start,String limit){
			HashMap<String,Object> map = new HashMap<String, Object>();
			List<LeaContract> serverList = leaConService.getAllLeaContracts(start,limit);
			map.put("totalCount",leaConService.getCount());
			map.put("leas", serverList);
			return map;
		} 
		 /**
		 * 对内接口 获取所有leas
		 * @return 
		 */
		@RequestMapping("/addLeaContract")
		public @ResponseBody String insertLeaContract(HttpEntity<LeaContract> requestEntity){
			LeaContract lea=requestEntity.getBody();
			return leaConService.insertLeaCont(lea);
		} 
	
		/**
		 * 对内接口 删除指定hos
		 * @return  
		 * @throws IOException 
		 * @throws FileNotFoundException 
		 */
		@RequestMapping("/deleteLeasC")
		public @ResponseBody String deleteLeasC(String id){ 
			return leaConService.deleteLeaCont(id);
		}
		
		/**
		 * 对内接口 更新指定leas
		 * @return 
		 * @throws IOException 
		 * @throws FileNotFoundException 
		 */
		@RequestMapping("/updateLeasC")
		public @ResponseBody String updateLeasC(HttpEntity<LeaContract> requestEntity) throws FileNotFoundException, IOException
		{
			LeaContract lea = requestEntity.getBody();
			return leaConService.updateLeaCont(lea);
		}
		
}
