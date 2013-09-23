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
import org.springframework.jdbc.support.incrementer.PostgreSQLSequenceMaxValueIncrementer;
import org.springframework.stereotype.Repository;
import com.ahmap.domain.ThirdRent;

@Repository
public class ThirdRentDao {
	
		private JdbcTemplate jdbcTemplate;  
	    private JdbcTemplate jdbcTemplate2;  
	    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;  
	    private NamedParameterJdbcTemplate namedParameterJdbcTemplate2;
	    
	    @Autowired
	    private PostgreSQLSequenceMaxValueIncrementer incre;
	    
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
			
		//新增第三方出租信息
		public void addRent(ThirdRent rent){
			String sql="INSERT INTO thirdrent(id,lanblock ,cityarea,address,landsize,roomsize,nonocc,coors_x,coors_y,filler1,filler2,filler3)"+ " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			Object[] params = new Object[]{rent.getId(),rent.getLanBlock(),rent.getCityArea(),rent.getAddress(),rent.getLandSize(),rent.getRoomSize(),rent.getNonOcc(),
							rent.getCoors_x(),rent.getCoors_y(),rent.getFiller1(),rent.getFiller2(),rent.getFiller3()};
			jdbcTemplate.update(sql, params);
			
		}
		//删除第三方出租信息
		public void deleteRent(ThirdRent rent){
			String sql="DELETE FROM thirdrent where id='"+rent.getId()+"'";
			jdbcTemplate.equals(sql);
			
		}
		//修改第三方信息
		public void updateRent(ThirdRent rent){
			String sql="UPDATE thirdrent set lanblock=?,cityarea=?,address=?,landsize=?,roomsize=?,nonocc=?,coors_x=?,coors_y=?  where id=? and address=?";
			Object[] params = new Object[]{rent.getLanBlock(),rent.getCityArea(),rent.getAddress(),rent.getLandSize(),rent.getRoomSize(),rent.getNonOcc(),
					rent.getCoors_x(),rent.getCoors_y(),rent.getId(),rent.getAddress()};
			jdbcTemplate.update(sql, params);
		}
		public int getCount(){
			String sql="SELECT COUNT(*) FROM thirdrent";
			return jdbcTemplate.queryForInt(sql);
		}
		//根据城区统计数量
		public int getCountByArea(String cityarea){
			String sql="SELECT COUNT(*) FROM thirdrent where cityarea='"+cityarea+"'";
			return jdbcTemplate.queryForInt(sql);
		}
		
		public List<ThirdRent> getAllRents(String start,String limit){
			String sqlStr = "SELECT * from thirdrent limit "+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		//根据城市区域统计出租纪录
		public List<ThirdRent> getAllRentByArea(String cityArea,String start,String limit){
			String sqlStr = "SELECT * from thirdrent  where  cityarea like '%"+ cityArea +"%'"+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		//根据地块查询
		public List<ThirdRent> getAllRentsByBlock(String landBlock,String start,String limit){
			String sqlStr = "SELECT * from thirdrent where  landblock like '%"+ landBlock +"%'"+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		private static final class RentMapper implements RowMapper<ThirdRent> {
			@Override
			public ThirdRent mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				ThirdRent rent=new ThirdRent();
				rent.setId(rs.getString("id"));
				rent.setLanBlock(rs.getString("landblock"));
				rent.setCityArea(rs.getString("cityarea"));
				rent.setAddress(rs.getString("address"));
				rent.setLandSize(rs.getDouble("landsize"));
				rent.setRoomSize(rs.getDouble("roomsize"));
				rent.setNonOcc(rs.getDouble("nonocc"));
				rent.setCoors_x(rs.getDouble("coors_x"));
				rent.setCoors_y(rs.getDouble("coors_y"));
				return rent;
			}
		}
}
