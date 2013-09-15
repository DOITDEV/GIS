package com.ahmap.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.ahmap.domain.XZCF;

@Repository
public class XZCFDao {

	private JdbcTemplate jdbcTemplate;  
    private JdbcTemplate jdbcTemplate2;  
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;  
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate2;  
      
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
    public List<XZCF> getXZCFByName(String hosName,String start,String limit){
    	String sqlStr = "Select Top "+limit+" * from T_D4_XZCF_BASE where UNIT_NAME like '%"+ hosName +"%' And PUNISH_ID  Not In (Select Top "+start+" PUNISH_ID  From T_D4_XZCF_BASE Order by LA_TIME DESC) Order by LA_TIME DESC";
		
//		String sqlStr = "SELECT * from T_D4_XZCF_BASE order by LA_TIME desc"+" limit "+limit+" offset "+start;
		List<XZCF> XZCFList = new ArrayList<XZCF>();
		XZCFList = jdbcTemplate2.query(sqlStr, new XZCFMapper());
		for(int i=0;i<XZCFList.size();i++)
		{
			XZCF xzcf = XZCFList.get(i);
			int id = xzcf.getPUNISH_ID();
			String CASE_CON = xzcf.getCASE_CON();
			String PUNISH_DESC = xzcf.getPUNISH_DESC();
			try{
				CASE_CON = (String) jdbcTemplate2.queryForObject( "SELECT CASE_CON FROM T_D4_PUNISH_CASE WHERE PUNISH_ID = ?", new Object[] {id}, java.lang.String.class);
				PUNISH_DESC = (String) jdbcTemplate2.queryForObject( "SELECT PUNISH_DESC FROM T_D4_PUNISH_CASE WHERE PUNISH_ID = ?", new Object[] {id}, java.lang.String.class);
			}catch (EmptyResultDataAccessException e) {  
				CASE_CON = null; 
				PUNISH_DESC = null; 
	        } 
			xzcf.setCASE_CON(CASE_CON);
			xzcf.setPUNISH_DESC(PUNISH_DESC);
		}
		
		return XZCFList; 
	}
    
    public int getCountByName(String hosName)
    {
    	return jdbcTemplate2.queryForInt("SELECT count(*) FROM T_D4_XZCF_BASE WHERE UNIT_NAME like '%"+ hosName +"%'");
    }
	 
	public List<XZCF> getAllXZCF(String start,String limit){
		String sqlStr = "Select Top "+limit+" * from T_D4_XZCF_BASE where PUNISH_ID  Not In (Select Top "+start+" PUNISH_ID  From T_D4_XZCF_BASE Order by LA_TIME DESC) Order by LA_TIME DESC";
		
//		String sqlStr = "SELECT * from T_D4_XZCF_BASE order by LA_TIME desc"+" limit "+limit+" offset "+start;
		List<XZCF> XZCFList = new ArrayList<XZCF>();
		XZCFList = jdbcTemplate2.query(sqlStr, new XZCFMapper());
		for(int i=0;i<XZCFList.size();i++)
		{
			XZCF xzcf = XZCFList.get(i);
			int id = xzcf.getPUNISH_ID();
			String CASE_CON = xzcf.getCASE_CON();
			String PUNISH_DESC = xzcf.getPUNISH_DESC();
			try{
				CASE_CON = (String) jdbcTemplate2.queryForObject( "SELECT CASE_CON FROM T_D4_PUNISH_CASE WHERE PUNISH_ID = ?", new Object[] {id}, java.lang.String.class);
				PUNISH_DESC = (String) jdbcTemplate2.queryForObject( "SELECT PUNISH_DESC FROM T_D4_PUNISH_CASE WHERE PUNISH_ID = ?", new Object[] {id}, java.lang.String.class);
			}catch (EmptyResultDataAccessException e) {  
				CASE_CON = null; 
				PUNISH_DESC = null; 
	        } 
			xzcf.setCASE_CON(CASE_CON);
			xzcf.setPUNISH_DESC(PUNISH_DESC);
		}
		return XZCFList; 
	}
	public int getCount(){
		String sqlStr = "SELECT COUNT(*) from T_D4_XZCF_BASE ";
		return jdbcTemplate2.queryForInt(sqlStr);
	}
	 
	private static final class XZCFMapper implements RowMapper<XZCF> {
	    public XZCF mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	XZCF xzcf = new XZCF();
	    	xzcf.setPUNISH_ID(rs.getInt("PUNISH_ID"));
	    	xzcf.setUNIT_NAME(rs.getString("UNIT_NAME"));
	    	xzcf.setUNIT_ADDRESS(rs.getString("UNIT_ADDRESS"));
	    	xzcf.setLA_TIME(rs.getDate("LA_TIME"));
	    	xzcf.setACCEPT_DATE(rs.getDate("ACCEPT_DATE"));
	    	xzcf.setJARQ(rs.getDate("JARQ"));
	    	xzcf.setCASE_CON(null);//(rs.getString("CASE_CON"));
	    	xzcf.setPUNISH_DESC(null);//(rs.getString("PUNISH_DESC"));
	        return xzcf;
	    }        
	}
}
