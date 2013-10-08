package com.ahmap.web;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.jdbc.support.incrementer.PostgreSQLSequenceMaxValueIncrementer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.ahmap.cons.CommonConstant;
import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.LeasRent;
import com.ahmap.domain.LeasseeInfo;
import com.ahmap.domain.RentInfo;
import com.ahmap.service.LeasRentService;

@Controller
@RequestMapping("/imp")
public class ImportExcelController {
	
	
	@Autowired
	private LeasRentService leasRentService;
	
	@Autowired
	private PostgreSQLSequenceMaxValueIncrementer incre;
	    
	private String resultStr;
	
	@RequestMapping("/importExcel")
	public @ResponseBody String importExcel(@RequestParam("fileName") MultipartFile file)throws Exception{
		if(file.isEmpty()){
			return null;
		}
		String fileName=file.getOriginalFilename();
		String excelExtension=fileName.indexOf(".")==-1?"":fileName.substring(fileName.lastIndexOf(".")+1);
		Map<String,Object> map=new HashMap<String,Object>();
		if("xls".equals(excelExtension.toLowerCase())){
			map=readxlsExcel(file);
		}else if("xlsx".equals(excelExtension.toLowerCase())){
			map=readxlsxExcel(file);
		}else{
			return "file";
		}
		if(!map.isEmpty()){
//			System.out.println("导入数据条数： "+leaConList.size());
//			resultStr=leaConService.insertLeaContMap(map);
			resultStr=leasRentService.insertLeaContMap(map);
			System.out.println("返回String: "+resultStr);
		}
		
		return "{success:true"+",msg:'"+resultStr+"'}";
	}
	//读取2007版Excel
	private Map<String,Object> readxlsxExcel(MultipartFile file) throws FileNotFoundException, IOException,IllegalStateException, ParseException {
		Map<String,Object> map=new HashMap<String,Object>();
		List<LeasseeInfo> leasseeInfoList=new ArrayList<LeasseeInfo>();
		List<RentInfo>  rentInfoList=new ArrayList<RentInfo>();
		
		XSSFWorkbook xwb=new XSSFWorkbook(file.getInputStream());
		XSSFSheet sheet=xwb.getSheetAt(0);
		XSSFRow row;
		int firstRowNum=sheet.getFirstRowNum();
		int lastRowNum=sheet.getPhysicalNumberOfRows();
		if(lastRowNum - firstRowNum < 1){
			resultStr="空行";
		}
		for(int i=firstRowNum+2; i<lastRowNum;){
			row=sheet.getRow(i);
			if(row==null){
				continue;
			}
			boolean isMerged=isMergedRegionCell07(sheet, i, 0);
			int mergedCellRows=0;
			//是合并单元格
			if(isMerged){
				//合并单元格行数
				mergedCellRows=getMergedRegionCellrows07(sheet, i, 0);
				String lanBlock=row.getCell(0).getStringCellValue();
				String cityArea=row.getCell(1).getStringCellValue();
				for(int j=i;j<(i+mergedCellRows);j++){
					LeasseeInfo lea=new LeasseeInfo();
					RentInfo rent=new RentInfo();
					
					XSSFRow row1=sheet.getRow(j);
					if(row1==null){
						continue;
					}
					int pos=2;
					String rentId=incre.nextStringValue();
					rent.setId(rentId);
					rent.setLanBlock(lanBlock);
					rent.setCityArea(cityArea);
					rent.setAddress(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setPropertys(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setPropertyNo(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setLandSize(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setRoomSize(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setNonOcc(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setGeoLocation(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setRealDisplay(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setIsRent(CommonConstant.ISVALID);
					rentInfoList.add(rent);
					//读取承租方信息
//					String leasseeId=incre.nextStringValue();
//					lea.setId(leasseeId);
					lea.setRentId(rentId);
					lea.setLanBlock(lanBlock);
					lea.setCityArea(cityArea);
					lea.setAddress(rent.getAddress());
					lea.setLeaholder(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setCardType(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setIdCard(row1.getCell(pos).getStringCellValue());
					pos++;
					try {
						lea.setTel(row1.getCell(pos).getStringCellValue());
					} catch (IllegalStateException e) {
						BigDecimal tel=new BigDecimal(row.getCell(pos).getNumericCellValue()).abs();
						lea.setTel(String.valueOf(tel));
					}
					lea.setTimLimit(row1.getCell(pos).getStringCellValue());
					pos++;
					Date startDate=row1.getCell(pos).getDateCellValue();
					if(startDate!=null && !"".equals(startDate)){
						lea.setStartDate(CommonUtils.convertDateToStr(startDate));
					}
					pos++;
					Date endDate=row1.getCell(pos).getDateCellValue();
					if(endDate!=null && !"".equals(endDate)){
						lea.setEndDate(CommonUtils.convertDateToStr(endDate));
					}
					pos++;
					lea.setMonRent(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setYerRent(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setWuyeFee(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setParkFee(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setHandsel(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setPenalty(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setPayType(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setRentStatus(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setOutDays(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setIncExplain(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setRemark(row1.getCell(pos).getStringCellValue());
					lea.setCreateTime(CommonUtils.convertDateToStr(new Date()));
					lea.setIsValid(CommonConstant.ISVALID);
					leasseeInfoList.add(lea);
				}
				i=(i+mergedCellRows);
			//不是合并单元格
			}else{
				int pos=0;
				LeasseeInfo lea=new LeasseeInfo();
				RentInfo rent=new RentInfo();
				String rentId=incre.nextStringValue();
				rent.setId(rentId);
				String landBlock=row.getCell(pos).getStringCellValue();
				rent.setLanBlock(landBlock);
				pos++;
				String cityArea=row.getCell(pos).getStringCellValue();
				rent.setCityArea(cityArea);
				pos++;
				String address=row.getCell(pos).getStringCellValue();
				rent.setAddress(address);
				pos++;
				rent.setPropertys(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setPropertyNo(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setLandSize(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setRoomSize(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setNonOcc(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setGeoLocation(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setRealDisplay(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setIsRent(CommonConstant.ISVALID);
				rentInfoList.add(rent);
				//读取承租方信息
//				String leasseeId=incre.nextStringValue();
//				lea.setId(leasseeId);
				lea.setRentId(rentId);
				lea.setLanBlock(landBlock);
				lea.setCityArea(cityArea);
				lea.setAddress(address);
				lea.setLeaholder(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setCardType(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setIdCard(row.getCell(pos).getStringCellValue());
				pos++;
				try {
					lea.setTel(row.getCell(pos).getStringCellValue());
				} catch (IllegalStateException e) {
					BigDecimal tel=new BigDecimal(row.getCell(pos).getNumericCellValue()).abs();
					lea.setTel(String.valueOf(tel));
				}
				pos++;
				lea.setTimLimit(row.getCell(pos).getStringCellValue());
				pos++;
				Date startDate=row.getCell(pos).getDateCellValue();
				if(startDate!=null && !"".equals(startDate)){
//					SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
					lea.setStartDate(CommonUtils.convertDateToStr(startDate));
				}
				pos++;
				Date endDate=row.getCell(pos).getDateCellValue();
				if(endDate!=null && !"".equals(endDate)){
					lea.setEndDate(CommonUtils.convertDateToStr(endDate));
				}
				pos++;
				lea.setMonRent(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setYerRent(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setWuyeFee(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setParkFee(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setHandsel(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setPenalty(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setPayType(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setRentStatus(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setOutDays(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setIncExplain(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setRemark(row.getCell(pos).getStringCellValue());
				lea.setCreateTime(CommonUtils.convertDateToStr(new Date()));
				lea.setIsValid(CommonConstant.ISVALID);
//				lea.setCreateTime(CommonUtils.getSysDate());
				leasseeInfoList.add(lea);
				i++;
			}
		}
		System.out.println("出租记录数："+rentInfoList.size());
		System.out.println("承租记录数："+leasseeInfoList.size());
		map.put("leasseeInfoList", leasseeInfoList);
		map.put("rentInfoList", rentInfoList);
		return map;
	}
	//读取2003版Excel
	private Map<String,Object>  readxlsExcel(MultipartFile file) throws ParseException, IOException {
		Map<String,Object> map=new HashMap<String,Object>();
		List<LeasseeInfo> leasseeInfoList=new ArrayList<LeasseeInfo>();
		List<RentInfo>  rentInfoList=new ArrayList<RentInfo>();
		
		HSSFWorkbook hwb=new HSSFWorkbook(file.getInputStream());
		HSSFSheet sheet=hwb.getSheetAt(0);
		HSSFRow row;
		int firstRowNum=sheet.getFirstRowNum();
		int lastRowNum=sheet.getPhysicalNumberOfRows();
		if(lastRowNum - firstRowNum < 1){
			resultStr="空行";
		}
		for(int i=firstRowNum+2; i<lastRowNum;){
			row=sheet.getRow(i);
			if(row==null){
				continue;
			}
			boolean isMerged=isMergedRegionCell03(sheet, i, 0);
			int mergedCellRows=0;
			//是合并单元格
			if(isMerged){
				//合并单元格行数
				mergedCellRows=getMergedRegionCellrows03(sheet, i, 0);
				String lanBlock=row.getCell(0).getStringCellValue();
				String cityArea=row.getCell(1).getStringCellValue();
				for(int j=i;j<(i+mergedCellRows);j++){
					LeasseeInfo lea=new LeasseeInfo();
					RentInfo rent=new RentInfo();
					
					HSSFRow row1=sheet.getRow(j);
					if(row1==null){
						continue;
					}
					int pos=2;
					String rentId=incre.nextStringValue();
					rent.setId(rentId);
					rent.setLanBlock(lanBlock);
					rent.setCityArea(cityArea);
					rent.setAddress(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setPropertys(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setPropertyNo(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setLandSize(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setRoomSize(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setNonOcc(row1.getCell(pos).getNumericCellValue());
					pos++;
					rent.setGeoLocation(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setRealDisplay(row1.getCell(pos).getStringCellValue());
					pos++;
					rent.setIsRent(CommonConstant.ISVALID);
					rentInfoList.add(rent);
					//读取承租方信息
	//				String leasseeId=incre.nextStringValue();
	//				lea.setId(leasseeId);
					lea.setRentId(rentId);
					lea.setLanBlock(lanBlock);
					lea.setCityArea(cityArea);
					lea.setAddress(rent.getAddress());
					lea.setLeaholder(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setCardType(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setIdCard(row1.getCell(pos).getStringCellValue());
					pos++;
					try {
						lea.setTel(row1.getCell(pos).getStringCellValue());
					} catch (IllegalStateException e) {
						BigDecimal tel=new BigDecimal(row.getCell(pos).getNumericCellValue()).abs();
						lea.setTel(String.valueOf(tel));
					}
					lea.setTimLimit(row1.getCell(pos).getStringCellValue());
					pos++;
					Date startDate=row1.getCell(pos).getDateCellValue();
					if(startDate!=null && !"".equals(startDate)){
						lea.setStartDate(CommonUtils.convertDateToStr(startDate));
					}
					pos++;
					Date endDate=row1.getCell(pos).getDateCellValue();
					if(endDate!=null && !"".equals(endDate)){
						lea.setEndDate(CommonUtils.convertDateToStr(endDate));
					}
					pos++;
					lea.setMonRent(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setYerRent(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setWuyeFee(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setParkFee(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setHandsel(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setPenalty(row1.getCell(pos).getNumericCellValue());
					pos++;
					lea.setPayType(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setRentStatus(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setOutDays(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setIncExplain(row1.getCell(pos).getStringCellValue());
					pos++;
					lea.setRemark(row1.getCell(pos).getStringCellValue());
					lea.setCreateTime(CommonUtils.convertDateToStr(new Date()));
					lea.setIsValid(CommonConstant.ISVALID);
					leasseeInfoList.add(lea);
				}
				i=(i+mergedCellRows);
			//不是合并单元格
			}else{
				int pos=0;
				LeasseeInfo lea=new LeasseeInfo();
				RentInfo rent=new RentInfo();
				String rentId=incre.nextStringValue();
				rent.setId(rentId);
				String landBlock=row.getCell(pos).getStringCellValue();
				rent.setLanBlock(landBlock);
				pos++;
				String cityArea=row.getCell(pos).getStringCellValue();
				rent.setCityArea(cityArea);
				pos++;
				String address=row.getCell(pos).getStringCellValue();
				rent.setAddress(address);
				pos++;
				rent.setPropertys(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setPropertyNo(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setLandSize(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setRoomSize(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setNonOcc(row.getCell(pos).getNumericCellValue());
				pos++;
				rent.setGeoLocation(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setRealDisplay(row.getCell(pos).getStringCellValue());
				pos++;
				rent.setIsRent(CommonConstant.ISVALID);
				rentInfoList.add(rent);
				//读取承租方信息
	//			String leasseeId=incre.nextStringValue();
	//			lea.setId(leasseeId);
				lea.setRentId(rentId);
				lea.setLanBlock(landBlock);
				lea.setCityArea(cityArea);
				lea.setAddress(address);
				lea.setLeaholder(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setCardType(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setIdCard(row.getCell(pos).getStringCellValue());
				pos++;
				try {
					lea.setTel(row.getCell(pos).getStringCellValue());
				} catch (IllegalStateException e) {
					BigDecimal tel=new BigDecimal(row.getCell(pos).getNumericCellValue()).abs();
					lea.setTel(String.valueOf(tel));
				}
				pos++;
				lea.setTimLimit(row.getCell(pos).getStringCellValue());
				pos++;
				Date startDate=row.getCell(pos).getDateCellValue();
				if(startDate!=null && !"".equals(startDate)){
	//				SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
					lea.setStartDate(CommonUtils.convertDateToStr(startDate));
				}
				pos++;
				Date endDate=row.getCell(pos).getDateCellValue();
				if(endDate!=null && !"".equals(endDate)){
					lea.setEndDate(CommonUtils.convertDateToStr(endDate));
				}
				pos++;
				lea.setMonRent(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setYerRent(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setWuyeFee(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setParkFee(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setHandsel(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setPenalty(row.getCell(pos).getNumericCellValue());
				pos++;
				lea.setPayType(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setRentStatus(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setOutDays(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setIncExplain(row.getCell(pos).getStringCellValue());
				pos++;
				lea.setRemark(row.getCell(pos).getStringCellValue());
				lea.setCreateTime(CommonUtils.convertDateToStr(new Date()));
				lea.setIsValid(CommonConstant.ISVALID);
	//			lea.setCreateTime(CommonUtils.getSysDate());
				leasseeInfoList.add(lea);
				i++;
			}
		}
		System.out.println("出租记录数："+rentInfoList.size());
		System.out.println("承租记录数："+leasseeInfoList.size());
		map.put("leasseeInfoList", leasseeInfoList);
		map.put("rentInfoList", rentInfoList);
		return map;
	}
	/*
	 * 导出Excel
	 */
	@RequestMapping("/exportExcel")
	public @ResponseBody  String exportExcel(ModelMap modMap,HttpServletRequest request,HttpServletResponse response,Object command){
		List<LeasRent> leasRentList=leasRentService.getAllLeasRentList();
		modMap.addAttribute("leasRentList", leasRentList);
		return "leasRentListExcel";
	}
	/**
	 * 2007 Excel
	 * 判断指定单元格是否是合并单元格
	 */
	protected  boolean isMergedRegionCell07(XSSFSheet sheet, int row,
			int column) {
		int sheetMergeCount = sheet.getNumMergedRegions();

		for (int i = 0; i < sheetMergeCount; i++) {
			CellRangeAddress ca = sheet.getMergedRegion(i);
			int firstColumn = ca.getFirstColumn();
			int lastColumn = ca.getLastColumn();
			int firstRow = ca.getFirstRow();
			int lastRow = ca.getLastRow();
			if (row >= firstRow && row <= lastRow) {
				if (column >= firstColumn && column <= lastColumn) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 2003 Excel
	 * 判断指定单元格是否是合并单元格
	 */
	protected boolean isMergedRegionCell03(HSSFSheet sheet, int row,
			int column) {
		int sheetMergeCount = sheet.getNumMergedRegions();

		for (int i = 0; i < sheetMergeCount; i++) {
			CellRangeAddress ca = sheet.getMergedRegion(i);
			int firstColumn = ca.getFirstColumn();
			int lastColumn = ca.getLastColumn();
			int firstRow = ca.getFirstRow();
			int lastRow = ca.getLastRow();
			if (row >= firstRow && row <= lastRow) {
				if (column >= firstColumn && column <= lastColumn) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 2007 Excel
	 * 获取合并单元格所占行数
	 */
	protected int getMergedRegionCellrows07(XSSFSheet sheet, int row,
			int column) {
		int cnt = sheet.getNumMergedRegions();
		for (int i = 0; i < cnt; i++) {
			CellRangeAddress ca = sheet.getMergedRegion(i);
			if (row == ca.getFirstRow() && column == ca.getFirstColumn()) {
				return ca.getNumberOfCells();
			}
		}
		return 0;
	}
	
	/**
	 * 2003 Excel
	 * 获取合并单元格所占行数
	 */
	protected int getMergedRegionCellrows03(HSSFSheet sheet, int row,
			int column) {
		int cnt = sheet.getNumMergedRegions();
		for (int i = 0; i < cnt; i++) {
			CellRangeAddress ca = sheet.getMergedRegion(i);
			if (row == ca.getFirstRow() && column == ca.getFirstColumn()) {
				return ca.getNumberOfCells();
			}
		}
		return 0;
	}
}
