package com.ahmap.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.ahmap.domain.Hospital;

@Repository
public class HosDao {
//	@Autowired
//	private JdbcTemplate jdbcTemplate;
//	

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
	/**
	 * @param hosname
	 * @return 医院名是否重复
	 */
	public int getMatchCount(String hosName)
	{
		String sqlStr = "SELECT count(*) from hospital" + " WHERE name=?";
		return jdbcTemplate.queryForInt(sqlStr,new Object[]{hosName});
	}
	
	public List<Hospital> findHosByName(String hosName){
		String sqlStr = "SELECT * from hospital  where name = '"+ hosName +"'";
		return jdbcTemplate.query(sqlStr, new HosMapper());
	}
	
	public List<Hospital> getHosByName(String hosName,String start,String limit){
		String sqlStr = "SELECT * from hospital  where name like '%"+ hosName +"%'"+" limit "+limit+" offset "+start;
		//String sqlStr = "SELECT * from hospital where name = '"+ hosName +"'";
		return jdbcTemplate.query(sqlStr, new HosMapper());
	}
	
	public List<Hospital> getAllHos2(String hosName){
		String sqlStr = "SELECT * from hospital where name like '%"+ hosName +"%'";
		return jdbcTemplate.query(sqlStr, new HosMapper());
	}
	public List<Hospital> getAllHos(String start,String limit){
		String sqlStr = "SELECT * from hospital limit "+limit+" offset "+start;
		return jdbcTemplate.query(sqlStr, new HosMapper());
	}
	public int getCount(){
		String sqlStr = "SELECT COUNT(*) from hospital";
		return jdbcTemplate.queryForInt(sqlStr);
	}
	public int getCount2(String hosName){
		String sqlStr = "SELECT COUNT(*) from hospital where name like '%"+ hosName +"%'";
		return jdbcTemplate.queryForInt(sqlStr);
	}
	public void addHospital(Hospital hos){
		String sqlStr = " INSERT INTO hospital(name,lever,docnum,nursnum,corporation,phonenum,address,coors_x,coors_y,kemu)"+ " VALUES(?,?,?,?,?,?,?,?,?,?)";
		 //最后的aa表示“上午”或“下午”    HH表示24小时制    如果换成hh表示12小时制  
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss aa");  
		 //temp_str=sdf.format(dt); 
		Object[] params = new Object[]{hos.getName(),hos.getLever(),hos.getDocNum(),hos.getNursNum(),hos.getCorporation(),hos.getPhoneNum(),hos.getAddress(),hos.getCoors_x(),hos.getCoors_y(),hos.getKemu()};
		jdbcTemplate.update(sqlStr, params);
	}
	
	/**
	 * 删除医院
	 * @param name
	 */
	public void deleteHos(String name){
		String sqlStr = "delete from hospital where name='" + name +"'";
		jdbcTemplate.execute(sqlStr);
	}
	
	/**
	 * 修改医院
	 * @param hos
	 */
	public void updateHos(Hospital hos){
		String sqlStr = "update hospital set lever=?, docnum=?, nursnum=?, corporation=?, phoneNum=?, address=?, coors_x=?,coors_y=?,kemu=? where name=?";
		Object[] params = new Object[]{hos.getLever(),hos.getDocNum(),hos.getNursNum(),hos.getCorporation(),hos.getPhoneNum(),hos.getAddress(),hos.getCoors_x(),hos.getCoors_y(),hos.getKemu(),hos.getName()};
		jdbcTemplate.update(sqlStr, params);
	}
	private static final class HosMapper implements RowMapper<Hospital> {
	    public Hospital mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	Hospital hos = new Hospital();
	    	hos.setName(rs.getString("name"));
	    	hos.setLever(rs.getString("lever"));
	    	hos.setDocNum(rs.getInt("docnum"));
	    	hos.setNursNum(rs.getInt("nursnum"));
	    	hos.setPhoneNum(rs.getString("phonenum"));
	    	hos.setAddress(rs.getString("address"));
	    	hos.setCoors_x(rs.getDouble("coors_x"));
	    	hos.setCoors_y(rs.getDouble("coors_y"));
	    	hos.setKemu(rs.getString("kemu"));
	    	hos.setCorporation(rs.getString("corporation"));
	        return hos;
	    }        
	}
}
