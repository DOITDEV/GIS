package com.ahmap.dao;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.ahmap.domain.Hospital;
import com.ahmap.domain.Supervise;

@Repository
public class SuperviseDao {
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
	
	public List<Supervise> getHosByName(String hosName){
		String sqlStr = "SELECT * from t_d2_supervise_info where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND name like ’"+ hosName +"'";
		return jdbcTemplate2.query(sqlStr, new SuperviseMapper());
	}
	public List<Supervise> getSuperByUser(String start,String limit,String hosName) throws SQLException{

		String sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And objname  like '%"+ hosName +"%'"+ "AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) Order By LOGTIME DESC)" +" Order by LOGTIME DESC";

		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	public List<Supervise> getSuperByHos(String start,String limit,String hosName) throws SQLException{

		String sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And objname  like '%"+ hosName +"%'"+ "AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And objname  like '%"+ hosName +"%' Order By LOGTIME DESC)" +" Order by LOGTIME DESC";

		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	
	public List<Supervise> getSuperviseByName2(String name){
		//String sqlStr = "SELECT * from t_d2_supervise_info where logtime=(select max(logtime) from t_d2_supervise_info where objname = '"+ name+ "') and objname = '"+ name +"'";
		String sqlStr = "Select  e.obj_id, e.logid,e.objname,e.logtime,g.username,f.result from t_d2_supervise_info as e inner join t_d2_supervise_template as f on e.logid=f.logid left join t_d2_biz_supervisorinfo as g on f.logid=g.slogid where e.logtime=(select max(logtime) from t_d2_supervise_info where objname = '"+ name +"') AND e.objname = '"+ name +"' Order By e.LOGTIME DESC";
		
		//String sqlStr = "Select  e.obj_id, e.logid,e.objname,e.logtime,g.username,f.result from t_d2_supervise_info as e inner join t_d2_supervise_template as f on e.logid=f.logid left join t_d2_biz_supervisorinfo as g on f.logid=g.slogid Where e.OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND e.objname = '"+ name +"' Order By e.LOGTIME DESC";
		//String sqlStr = "SELECT * from t_d2_supervise_info where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logtime=(select max(logtime) from t_d2_supervise_info where objname = '"+ name+ "') and objname = '"+ name +"'";
//"SELECT * from t_d2_supervise_info where logtime=(select max(logtime) from t_d2_supervise_info) and objname = '" + name +"'";
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size()-1;i++)
		{
			Supervise supervise = superviseList.get(i);
			
			if(superviseList.get(i).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(superviseList.get(i).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(superviseList.get(i).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(superviseList.get(i).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			
			
//			for(int j=0;j<temp2.size();j++)
//			{
//				if(j==0)
//				{
//					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
//				}
//				else
//				{
//					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
//				}
//			}
		}
		int j=0;
		while(j<superviseList.size()-1)
		{
			if(superviseList.get(j).getLogId().equals(superviseList.get(j+1).getLogId()))
			{
				superviseList.get(j).setSuperviseUsers(superviseList.get(j).getSuperviseUsers()+","+superviseList.get(j+1).getSuperviseUsers());
				superviseList.remove(j+1);
			}
			else
			{
				j++;
			}
		}
		
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	public List<Supervise> getSuperviseByName(String name){
		//String sqlStr = "SELECT * from t_d2_supervise_info where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logtime=(select max(logtime) from t_d2_supervise_info where objname = '"+ name+ "') and objname = '"+ name +"'";
		String sqlStr = "SELECT * from t_d2_supervise_info where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logtime=(select max(logtime) from t_d2_supervise_info where  objname = '" + name +"' ) and objname = '" + name +"'";
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}

	public List<Supervise> getHisSupervise(String name,String start,String limit){
		//String sqlStr = "SELECT * from t_d2_supervise_info where logtime<>(select max(logtime) from t_d2_supervise_info where  objname = '" + name +"' ) and objname = '" + name +"' limit "+limit+" offset "+start;
		String sqlStr =	"SELECT Top "+limit+" * from t_d2_supervise_info where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) and logtime<>(select max(logtime) from t_d2_supervise_info where  objname = '" + name +"' ) and objname = '" + name +"' AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) Order By LOGTIME DESC)" +"Order by LOGTIME DESC";
		
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	
	public int geHisCount(String name){
		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";
		String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info WHERE logtime<>(select max(logtime) from t_d2_supervise_info where  objname = '" + name +"' ) and objname = '" + name +"' and OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";
		return jdbcTemplate2.queryForInt(sqlStr);
	}
	public int getCountByUser(String name){
		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";
		String sqlStr = "Select  COUNT(*) From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And objname  like '%"+ name +"%'";

		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info  WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";

		return jdbcTemplate2.queryForInt(sqlStr);
	}
	public int getCountByHos(String name){
		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";
		String sqlStr = "Select  COUNT(*) From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And objname  like '%"+ name +"%'";

		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info  WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";

		return jdbcTemplate2.queryForInt(sqlStr);
	}
	public int getCount(){
		//String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";
		String sqlStr = "SELECT COUNT(*) from t_d2_supervise_info  WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL)";

		return jdbcTemplate2.queryForInt(sqlStr);
	}
	public List<Supervise> getAllSuper(String start,String limit) throws SQLException{
//		DatabaseMetaData md = jdbcTemplate2.getDataSource().getConnection().getMetaData();  
//        System.out.println(md.getDatabaseProductName());  
//        System.out.println(md.getDatabaseProductVersion());  
//        String sqlStr = null;
//        if(md.getDatabaseProductName().equals("PostgreSQL"))
//        {
		//String sqlStr = "SELECT * from t_d2_supervise_info limit "+limit+" offset "+start;
		String sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) Order By LOGTIME DESC) Order by LOGTIME DESC";
//        }
//        else
//        {
//        	sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where logid Not In (Select Top "+start+" logid From t_d2_supervise_info Order By logid) Order by logid";
        	//sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) Order By LOGTIME DESC) Order by LOGTIME DESC";
        	//"SELECT * from t_d2_supervise_info limit "+limit+" offset "+start;
//        }
		
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	public List<Supervise> getAllSuper2(String start,String limit) throws SQLException{
//		DatabaseMetaData md = jdbcTemplate2.getDataSource().getConnection().getMetaData();  
//        System.out.println(md.getDatabaseProductName());  
//        System.out.println(md.getDatabaseProductVersion());  
        String sqlStr = null;
        
//        if(md.getDatabaseProductName().equals("PostgreSQL"))
//        {
        	//sqlStr = "SELECT * from t_d2_supervise_info limit "+limit+" offset "+start;
        	sqlStr = "select e.obj_id, e.logid,e.objname,e.logtime,g.username,f.result from t_d2_supervise_info as e inner join t_d2_supervise_template as f on e.logid=f.logid left join t_d2_biz_supervisorinfo as g on f.logid=g.slogid limit "+limit+" offset "+start+"Order by LOGTIME DESC";
//        }
//        else
//        {
        	//sqlserver 语句
//        	sqlStr = "Select Top "+limit+" e.obj_id, e.logid,e.objname,e.logtime,g.username,f.result from t_d2_supervise_info as e inner join t_d2_supervise_template as f on e.logid=f.logid left join t_d2_biz_supervisorinfo as g on f.logid=g.slogid Where e.OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND e.logid Not In (Select Top "+start+" logid From t_d2_supervise_info Order By LOGTIME DESC) Order By e.LOGTIME DESC ";
        	//sqlStr = "select Top "+limit+" e.logid,e.objname,e.logtime,g.username,f.result from t_d2_supervise_info as e inner join t_d2_supervise_template as f on e.logid=f.logid left join t_d2_biz_supervisorinfo as g on f.logid=g.slogid Where logid Not In (Select Top "+start+" logid From t_d2_supervise_info Order By logid) Order by logid";
        	//sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where logid Not In (Select Top "+start+" logid From t_d2_supervise_info Order By logid) Order by logid";
        	//sqlStr = "Select Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) Order By LOGTIME DESC) Order by LOGTIME DESC";
        	//"SELECT * from t_d2_supervise_info limit "+limit+" offset "+start;
//        }
		
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			
			if(superviseList.get(i).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(superviseList.get(i).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(superviseList.get(i).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(superviseList.get(i).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
		}
		int j=0;
		while(j<superviseList.size()-1)
		{
			if(superviseList.get(j).getLogId().equals(superviseList.get(j+1).getLogId()))
			{
				superviseList.get(j).setSuperviseUsers(superviseList.get(j).getSuperviseUsers()+","+superviseList.get(j+1).getSuperviseUsers());
				superviseList.remove(j+1);
			}
			else
			{
				j++;
			}
		}
		
//		for(int i=0;i<superviseList.size();i++)
//		{
//			Supervise supervise = superviseList.get(i);
//			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
//			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
//			if(temp1.get(0).getSuperviseResult().equals("00"))
//			{
//				superviseList.get(i).setSuperviseResult("合格");
//			}
//			if(temp1.get(0).getSuperviseResult().equals("01"))
//			{
//				superviseList.get(i).setSuperviseResult("不合格");
//			}
//			if(temp1.get(0).getSuperviseResult().equals("02"))
//			{
//				superviseList.get(i).setSuperviseResult("不确定");
//			}
//			if(temp1.get(0).getSuperviseResult().equals("03"))
//			{
//				superviseList.get(i).setSuperviseResult("未完成");
//			}
//			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
//			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
//			for(int j=0;j<temp2.size();j++)
//			{
//				if(j==0)
//				{
//					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
//				}
//				else
//				{
//					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
//				}
//			}
//		}
		return superviseList;//jdbcTemplate.query(sqlStr, new SuperviseMapper());
	}
	
	private static final class SuperviseMapper implements RowMapper<Supervise> {
	    public Supervise mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	Supervise supervise = new Supervise();
	    	supervise.setLogId(rs.getInt("logid"));
	    	supervise.setHosName(rs.getString("objname"));
	    	supervise.setSuperviseDate(rs.getDate("logtime"));
	    	//supervise.setSuperviseUsers(rs.getString("username"));
	    	//supervise.setSuperviseResult(rs.getString("result"));
	        return supervise;
	    }  
	}
	private static final class SuperviseUsersMapper implements RowMapper<Supervise> {
	    public Supervise mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	Supervise supervise = new Supervise();
	    	supervise.setSuperviseUsers(rs.getString("username"));
	        return supervise;
	    }  
	}
	private static final class SuperviseResultMapper implements RowMapper<Supervise> {
	    public Supervise mapRow(ResultSet rs, int rowNum) throws SQLException{
	    	Supervise supervise = new Supervise();
	    	supervise.setSuperviseResult(rs.getString("result"));
	        return supervise;
	    }
	}
	public List<Supervise> getSuperByDate(String start,String limit, String begin, String end) {
		String sqlStr = "SELECT Top "+limit+" * From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And logtime between convert(datetime,'"+begin+"') and convert(datetime,'"+end+"')"+" AND logid Not In (Select Top "+start+" logid From t_d2_supervise_info WHERE OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And logtime between convert(datetime,'"+begin+"') and convert(datetime,'"+end+"')" + " Order By LOGTIME DESC) Order by LOGTIME DESC";
		List<Supervise> superviseList = new ArrayList<Supervise>();
		superviseList = jdbcTemplate2.query(sqlStr, new SuperviseMapper());
		for(int i=0;i<superviseList.size();i++)
		{
			Supervise supervise = superviseList.get(i);
			String sqlStr1 = "SELECT * from t_d2_supervise_template where logid = " + supervise.getLogId();
			List<Supervise> temp1 = jdbcTemplate2.query(sqlStr1, new SuperviseResultMapper()); 
			if(temp1.get(0).getSuperviseResult().equals("00"))
			{
				superviseList.get(i).setSuperviseResult("合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("01"))
			{
				superviseList.get(i).setSuperviseResult("不合格");
			}
			if(temp1.get(0).getSuperviseResult().equals("02"))
			{
				superviseList.get(i).setSuperviseResult("不确定");
			}
			if(temp1.get(0).getSuperviseResult().equals("03"))
			{
				superviseList.get(i).setSuperviseResult("未完成");
			}
			String sqlStr2 = "SELECT * from t_d2_biz_supervisorinfo where slogid = " + supervise.getLogId();
			List<Supervise> temp2 = jdbcTemplate2.query(sqlStr2, new SuperviseUsersMapper()); 
			for(int j=0;j<temp2.size();j++)
			{
				if(j==0)
				{
					superviseList.get(i).setSuperviseUsers(temp2.get(j).getSuperviseUsers());
				}
				else
				{
					superviseList.get(i).setSuperviseUsers(superviseList.get(i).getSuperviseUsers()+","+temp2.get(j).getSuperviseUsers());
				}
			}
		}
		return superviseList;
	}

	public int getCountByDate(String begin, String end) {
		String sqlStr = "Select  COUNT(*) From t_d2_supervise_info Where OBJ_ID IN (SELECT hospital_id FROM T_D3_BIZ_HOSPITAL) And logtime between convert(datetime,'"+begin+"') and convert(datetime,'"+end+"')";
		return jdbcTemplate2.queryForInt(sqlStr);
	}
}
