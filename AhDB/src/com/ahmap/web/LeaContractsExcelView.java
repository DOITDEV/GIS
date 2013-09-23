package com.ahmap.web;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;
import com.ahmap.domain.LeasRent;

public class LeaContractsExcelView extends AbstractExcelView{
		@SuppressWarnings("unchecked")
		protected void buildExcelDocument(Map<String, Object> model,
				HSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response)
				throws Exception {
			response.setHeader("Content-Disposition", "attachment;filename="+new String("租赁合同一览表.xls".getBytes(),"iso8859-1"));
			List<LeasRent> list = (List<LeasRent>) model.get("leasRentList");
			HSSFSheet sheet=workbook.createSheet("sheet1");
			HSSFRow header=sheet.createRow(0);
			header.createCell(0).setCellValue("地块");
			header.createCell(1).setCellValue("所在城区");
			header.createCell(2).setCellValue("租赁地址");
			header.createCell(3).setCellValue("产权");
			header.createCell(4).setCellValue("产权证号");
			header.createCell(5).setCellValue("土地(m²)");
			header.createCell(6).setCellValue("房屋(m²)");
			header.createCell(7).setCellValue("空置(m²)");
			header.createCell(8).setCellValue("地理位置");
			header.createCell(9).setCellValue("实景");
			header.createCell(10).setCellValue("承租人(公司)");
			header.createCell(11).setCellValue("证件类别");
			header.createCell(12).setCellValue("证件号");
			header.createCell(13).setCellValue("联系电话"); 
			header.createCell(14).setCellValue("租赁期限");
			header.createCell(15).setCellValue("开始日期");
			header.createCell(16).setCellValue("结束日期");
			header.createCell(17).setCellValue("月租金");
			header.createCell(18).setCellValue("年租金");
			header.createCell(19).setCellValue("物业管理费");
			header.createCell(20).setCellValue("车辆停放费");
			header.createCell(21).setCellValue("押金");
			header.createCell(22).setCellValue("违约金");
			header.createCell(23).setCellValue("支付方式");
			header.createCell(24).setCellValue("租金收缴");
			header.createCell(25).setCellValue("滞交天数");
			header.createCell(26).setCellValue("租金调整说明");
			header.createCell(27).setCellValue("备注");
			int rowNum=1;
			for(LeasRent lea:list){
				HSSFRow row=sheet.createRow(rowNum++);
				row.createCell(0).setCellValue(lea.getLanBlock());
				row.createCell(1).setCellValue(lea.getCityArea());
				row.createCell(2).setCellValue(lea.getAddress());
				row.createCell(3).setCellValue(lea.getPropertys());
				row.createCell(4).setCellValue(lea.getPropertyNo());
				row.createCell(5).setCellValue(lea.getLandSize());
				row.createCell(6).setCellValue(lea.getRoomSize());
				row.createCell(7).setCellValue(lea.getNonOcc());
				row.createCell(8).setCellValue(lea.getGeoLocation());
				row.createCell(9).setCellValue(lea.getRealDisplay());
				row.createCell(10).setCellValue(lea.getLeaholder());
				row.createCell(11).setCellValue(lea.getCardType());
				row.createCell(12).setCellValue(lea.getIdCard());
				row.createCell(13).setCellValue(lea.getTel());
				row.createCell(14).setCellValue(lea.getTimLimit());
				String startDate=lea.getStartDate();
				if(!startDate.isEmpty()){
					row.createCell(15).setCellValue(startDate);
				}
				String endDate=lea.getEndDate();
				if(!endDate.isEmpty()){
					row.createCell(16).setCellValue(lea.getEndDate());
				}
				row.createCell(17).setCellValue(lea.getMonRent());
				row.createCell(18).setCellValue(lea.getYerRent());
				row.createCell(19).setCellValue(lea.getWuyeFee());
				row.createCell(20).setCellValue(lea.getParkFee());
				row.createCell(21).setCellValue(lea.getHandsel());
				row.createCell(22).setCellValue(lea.getPenalty());
				row.createCell(23).setCellValue(lea.getPayType());
				row.createCell(24).setCellValue(lea.getRentStatus());
				row.createCell(25).setCellValue(lea.getOutDays());
				row.createCell(26).setCellValue(lea.getIncExplain());
				row.createCell(27).setCellValue(lea.getRemark());
			}
		}
}
