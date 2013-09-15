package com.ahmap.cons;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
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
}
