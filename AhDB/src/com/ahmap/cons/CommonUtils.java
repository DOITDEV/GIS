package com.ahmap.cons;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class CommonUtils {
	
	private static JdbcTemplate jdbcTemplate;  
    private JdbcTemplate jdbcTemplate2;  
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;  
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate2;
    
    @SuppressWarnings("static-access")
	@Autowired  
    @Resource(name="dataSource")  
    public void setDataSource(DataSource dataSource) {  
        this.jdbcTemplate = new JdbcTemplate(dataSource);  
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(  
                dataSource);  
    }  
      
    @Autowired  
    @Resource(name="dataSource2")  
    public void setDataSource2(DataSource dataSource2){  
        this.jdbcTemplate2 = new JdbcTemplate(dataSource2);  
        this.namedParameterJdbcTemplate2 = new NamedParameterJdbcTemplate(dataSource2);  
    }

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public JdbcTemplate getJdbcTemplate2() {
		return jdbcTemplate2;
	}

	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
		return namedParameterJdbcTemplate;
	}
	
	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate2() {
		return namedParameterJdbcTemplate2;
	}  
	
	public static String getSequence(){
		String sql="select nextval('seq_milk') as sec";
		final long ss=0;
		final long secq1=jdbcTemplate.queryForLong(sql,  new RowCallbackHandler() {
			@Override
			public void processRow(ResultSet rs) throws SQLException {
				rs.getLong(0);
				
				
			}
		});
		return String.valueOf(secq1);
	}
	//转换数字
	public static String convertToString(String dNum){
		DecimalFormat decimalFormat = new DecimalFormat("#.000000");
		String resultStr=decimalFormat.format(new Double(dNum));
		if(resultStr.matches("^\\d+\\.[0]+$")){
			resultStr=resultStr.substring(0,resultStr.indexOf("."));
		}
		
		return resultStr;
	}
	//获取当前数据库日期(格式为："yyyy-MM-dd")
	public static String getSysDate(){
		String sql="SELECT CURRENT_DATE";
		SqlRowSet rs= jdbcTemplate.queryForRowSet(sql);
		if(rs!=null){
			return rs.getString(0);
		}else{
			return null;
		}
	}
	//将Date转为String
	public static String convertDateToStr(Date date){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); 
		String str=sdf.format(date);
		return str;
	}
	//将String转为Date
	public static Date converStrToDate(String str) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); 
		Date date=sdf.parse(str);
		return date;
	}
	//计算两个日期之间相差天数
	public static int getDaysBetweenDate(String start,String end) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
        Calendar cal = Calendar.getInstance();    
        cal.setTime(sdf.parse(start));    
        long time1 = cal.getTimeInMillis();                 
        cal.setTime(sdf.parse(end));    
        long time2 = cal.getTimeInMillis();         
        long between_days=(time2-time1)/(1000*3600*24);  
        return Integer.parseInt(String.valueOf(between_days));     
	}
	public static String getDateFlag(int days){
		if(days <= 0){
			return "0";
		}else if(0 < days && 30>days){
			return "1";
		}else if(30<days && 90 >= days){
			return "3";
		}else{
			return "9";
		}
	}
	//判断是否为空
	public static boolean isEmpty(String str){
		return str==null || str.trim().length()==0;
	}
	public static String CodToStr(String str){
		if("1".equals(str)){
			return "是";
		}else if("0".equalsIgnoreCase(str)){
			return "否";
		}else{
			return "其他";
		}
	}
	//手工获取jdbcTemplate
	public static JdbcTemplate getJdbcTemplate1(){
		DriverManagerDataSource ds=new DriverManagerDataSource();
		ds.setDriverClassName("org.postgresql.Driver");
		ds.setUrl("jdbc:postgresql://localhost/postgres");
		ds.setUsername("postgres");
		ds.setPassword("123456");
		JdbcTemplate jdbcTemplate=new JdbcTemplate(ds);
		return jdbcTemplate;
	}
}
