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

import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.RentInfo;

@Repository
public class RentDao {
	
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
			
		//插入出租房信息
		public void addRent(RentInfo rent){
			String sql="INSERT INTO rentinfo(id,lanblock ,cityarea,address,propertys,propertyno,landsize,roomsize,nonocc,geolocation,realdisplay,isrent,coors_x,coors_y,filler1,filler2,filler3)"+ " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			Object[] params = new Object[]{incre.nextStringValue(),rent.getLanBlock(),rent.getCityArea(),rent.getAddress(),rent.getPropertys(),rent.getPropertyNo(),rent.getLandSize(),rent.getRoomSize(),rent.getNonOcc(),rent.getGeoLocation(),
							rent.getRealDisplay(),rent.getIsRent(),rent.getCoors_x(),rent.getCoors_y(),rent.getFiller1(),rent.getFiller2(),rent.getFiller3()};
			jdbcTemplate.update(sql, params);
			
		}
		public void deleteRent(String id){
			String sql="DELETE FROM rentinfo where id='"+id+"'";
			jdbcTemplate.update(sql);
			
		}
		//修改出租房信息
		public void updateRent(RentInfo rent){
			String sql="UPDATE rentinfo set lanblock=?,cityarea=?,address=?,propertys=?,propertyno=?,landsize=?,roomsize=?,nonocc=?,geolocation=?,realdisplay=?,isrent=?,coors_x=?,coors_y=?  where id=?";
			Object[] params = new Object[]{rent.getLanBlock(),rent.getCityArea(),rent.getAddress(),rent.getPropertys(),rent.getPropertyNo(),rent.getLandSize(),rent.getRoomSize(),rent.getNonOcc(),rent.getGeoLocation(),
					rent.getRealDisplay(),rent.getIsRent(),rent.getCoors_x(),rent.getCoors_y(),rent.getId()};
			jdbcTemplate.update(sql, params);
		}
		public int getCount(){
			String sql="SELECT COUNT(*) FROM rentinfo";
			return jdbcTemplate.queryForInt(sql);
		}
		//根据城区统计数量
		public int getCountByArea(String cityarea){
			String sql="SELECT COUNT(*) FROM rentinfo where cityarea='"+cityarea+"'";
			return jdbcTemplate.queryForInt(sql);
		}
		
		public List<RentInfo> getAllRents(String start,String limit){
			String sqlStr = "SELECT * from rentinfo limit "+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		//根据城市区域统计出租纪录
		public List<RentInfo> getAllRentByArea(String cityArea,String start,String limit){
			String sqlStr = "SELECT * from rentinfo  where  cityarea like '%"+ cityArea +"%'"+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		//根据地块查询
		public List<RentInfo> getAllRentsByBlock(String landBlock,String start,String limit){
			String sqlStr = "SELECT * from rentinfo where  lanblock like '%"+ landBlock +"%'"+limit+" offset "+start;
			return jdbcTemplate.query(sqlStr, new RentMapper());
		}
		
		private static final class RentMapper implements RowMapper<RentInfo> {
			@Override
			public RentInfo mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				RentInfo rent=new RentInfo();
				rent.setId(rs.getString("id"));
				rent.setLanBlock(rs.getString("lanblock"));
				rent.setCityArea(rs.getString("cityarea"));
				rent.setAddress(rs.getString("address"));
				rent.setPropertys(rs.getString("propertys"));
				rent.setPropertyNo(rs.getString("propertyno"));
				rent.setLandSize(rs.getDouble("landsize"));
				rent.setRoomSize(rs.getDouble("roomsize"));
				rent.setNonOcc(rs.getDouble("nonocc"));
				rent.setGeoLocation(rs.getString("geoLocation"));
				rent.setRealDisplay(rs.getString("realdisplay"));
				String isRent=rs.getString("isrent");
				rent.setIsRent(isRent);
				if(!CommonUtils.isEmpty(isRent)){
					rent.setIsRentName(CommonUtils.CodToStr(isRent));
				}
				rent.setCoors_x(rs.getDouble("coors_x"));
				rent.setCoors_y(rs.getDouble("coors_y"));
				return rent;
			}
		}
}
