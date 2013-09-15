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
import com.ahmap.domain.Hospital;
import com.ahmap.domain.TSJB;

@Repository
public class TSJBDao {

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
	
    public int getCountByName(String hosName)
    {
    	return jdbcTemplate2.queryForInt("SELECT count(*) FROM T_D7_BIZ_COMP_DEPARTMENT WHERE OBJNAME like '"+ hosName +"'");
    }
	public List<TSJB> getTSJBByName(String hosName,String start,String limit){
		String sqlStr = "SELECT * from T_D7_BIZ_TSJB_BASE Order by RECEIVE_DATE DESC";
		List<TSJB> tsjbList = new ArrayList<TSJB>();
		tsjbList = jdbcTemplate2.query(sqlStr, new TSJBMapper());
		List<TSJB> tsjbList2 = new ArrayList<TSJB>();
		tsjbList = jdbcTemplate2.query(sqlStr, new TSJBMapper());
		for(int i=0;i<tsjbList.size();i++)
		{
			TSJB tsjb = tsjbList.get(i);
			String classify = tsjb.getCLASSIFY();
			String dealingResult = tsjb.getDEALING_RESULT();
			String objName = tsjb.getObjName();
			int id = tsjb.getID();
			String objAddress = tsjb.getObjAddress();
			 
			try{
				objName = (String) jdbcTemplate2.queryForObject( "SELECT OBJNAME FROM T_D7_BIZ_COMP_DEPARTMENT WHERE COMPLAINT_ID = ?", new Object[] {id}, java.lang.String.class);
				objAddress = (String) jdbcTemplate2.queryForObject( "SELECT ADDRESS FROM T_D7_BIZ_COMP_DEPARTMENT WHERE COMPLAINT_ID = ?", new Object[] {id}, java.lang.String.class);
			}catch (EmptyResultDataAccessException e) { 
		 		objName = null;
		 		objAddress = null;
	        }  
			 try{
			    	dealingResult = (String) jdbcTemplate2.queryForObject( "SELECT DT_NAME FROM T_A1_DIC_TYPE WHERE DT_ID = ?", new Object[] {Integer.valueOf(dealingResult)}, java.lang.String.class);
			 	}catch (EmptyResultDataAccessException e) {  
			 		dealingResult = null;  
		    }  
			 	
		    try{
		    	classify = (String) jdbcTemplate2.queryForObject( "SELECT DT_NAME FROM T_A1_DIC_TYPE WHERE DT_ID = ?", new Object[] {Integer.valueOf(classify)}, java.lang.String.class);
		 	}catch (EmptyResultDataAccessException e) {  
		 		classify = null;  
	        }
		 	tsjb.setObjName(objName);
		 	tsjb.setObjAddress(objAddress);
			tsjb.setCLASSIFY(classify);
			tsjb.setDEALING_RESULT(dealingResult);
			if(!(objName.indexOf(hosName)==-1)){
				tsjbList2.add(tsjb);
			}	
		}
		int end = Integer.valueOf(start) + Integer.valueOf(limit);
		if(end>tsjbList2.size())
		{
			end = tsjbList2.size();
		}
		tsjbList2.subList(Integer.valueOf(start), end);
		return tsjbList2;
	}
	
	public List<TSJB> getAllTSJB(String start,String limit){
		 
		String sqlStr = "Select Top "+limit+" * from T_D7_BIZ_TSJB_BASE where ID  Not In (Select Top "+start+" ID  From T_D7_BIZ_TSJB_BASE Order by RECEIVE_DATE DESC) Order by RECEIVE_DATE DESC";
		List<TSJB> tsjbList = new ArrayList<TSJB>();
		tsjbList = jdbcTemplate2.query(sqlStr, new TSJBMapper());
		for(int i=0;i<tsjbList.size();i++)
		{
			TSJB tsjb = tsjbList.get(i);
			String classify = tsjb.getCLASSIFY();
			String dealingResult = tsjb.getDEALING_RESULT();
			String objName = tsjb.getObjName();
			int id = tsjb.getID();
			String objAddress = tsjb.getObjAddress();
			
			//COMPLAINT_ID OBJNAME ADDRESS
			
			try{
				objName = (String) jdbcTemplate2.queryForObject( "SELECT OBJNAME FROM T_D7_BIZ_COMP_DEPARTMENT WHERE COMPLAINT_ID = ?", new Object[] {id}, java.lang.String.class);
				objAddress = (String) jdbcTemplate2.queryForObject( "SELECT ADDRESS FROM T_D7_BIZ_COMP_DEPARTMENT WHERE COMPLAINT_ID = ?", new Object[] {id}, java.lang.String.class);
			}catch (EmptyResultDataAccessException e) { 
		 		objName = null;
		 		objAddress = null;
	        }  
			 try{
			    	dealingResult = (String) jdbcTemplate2.queryForObject( "SELECT DT_NAME FROM T_A1_DIC_TYPE WHERE DT_ID = ?", new Object[] {Integer.valueOf(dealingResult)}, java.lang.String.class);
			 	}catch (EmptyResultDataAccessException e) {  
			 		dealingResult = null;  
		    }  
			 	
		    try{
		    	classify = (String) jdbcTemplate2.queryForObject( "SELECT DT_NAME FROM T_A1_DIC_TYPE WHERE DT_ID = ?", new Object[] {Integer.valueOf(classify)}, java.lang.String.class);
		 	}catch (EmptyResultDataAccessException e) {  
		 		classify = null;  
	        }  
		 	tsjb.setObjName(objName);
		 	tsjb.setObjAddress(objAddress);
			tsjb.setCLASSIFY(classify);
			tsjb.setDEALING_RESULT(dealingResult);
		}
		return tsjbList;//jdbcTemplate2.query(sqlStr, new TSJBMapper());
	}
	public int getCount(){
		String sqlStr = "SELECT COUNT(*) from T_D7_BIZ_TSJB_BASE";
		return jdbcTemplate2.queryForInt(sqlStr);
	}
	 
	private static final class TSJBMapper implements RowMapper<TSJB> {
	    public TSJB mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	TSJB tsjb = new TSJB();
	    	tsjb.setID(rs.getInt("ID"));
	    	tsjb.setDEALING_RESULT(rs.getString("DEALING_RESULT"));
	    	tsjb.setARCHIVE_DATE(rs.getDate("ARCHIVE_DATE"));
	    	tsjb.setCLASSIFY(rs.getString("CLASSIFY"));
	    	tsjb.setCOMPLAINT_DETAIL(rs.getString("COMPLAINT_DETAIL"));
	    	tsjb.setObjName(null);
	    	tsjb.setObjAddress(null);
	    	tsjb.setISArchive(null);
	    	tsjb.setRECEIVE_DATE(rs.getDate("RECEIVE_DATE"));
	    	//tsjb.setResult(rs.getString("result"));
	        return tsjb;
	    }        
	}
}
