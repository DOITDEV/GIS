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
import com.ahmap.domain.LeasRent;


@Repository
public class LeasRentDao {
		
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
		//查询所有数据
		public List<LeasRent> getAllLeasRentList(){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark"
						+"from rentinfo r,leasseeinfo l where r.id=l.rentid";
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//根据条件查询
		public List<LeasRent> getLeasRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark"
						+"from rentinfo r,leasseeinfo l where r.id=l.rentid and l.isvalid='1'";
			if(!propertys.isEmpty()){
				sql=sql+" and r.propertys='"+propertys+"'";
			}
			if(!lanBlock.isEmpty()){
				sql=sql+" and r.lanblock like '%"+lanBlock+"%' ";
			}
			if(!startDate.isEmpty()){
				sql=sql+"  and l.startDate< '"+startDate+"'";
			}
			if(!endDate.isEmpty()){
				sql=sql+"  and l.endDate > '"+endDate+"'";
			}
			if(!leaholder.isEmpty()){
				sql=sql+" and l.leaholder like '%"+leaholder+"%'";			
			}
			if(!rentStatus.isEmpty()){
				sql=sql+" and l.rentstatus='"+rentStatus+"'";
			}
			sql=sql+" limit"+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//查询历史记录
		//根据条件查询
		public List<LeasRent> getLastRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark"
						+"from rentinfo r,leasseeinfo l where r.id=l.rentid";
			if(!propertys.isEmpty()){
				sql=sql+" and r.propertys='"+propertys+"'";
			}
			if(!lanBlock.isEmpty()){
				sql=sql+" and r.lanblock like '%"+lanBlock+"%' ";
			}
			if(!startDate.isEmpty()){
				sql=sql+"  and l.startDate< '"+startDate+"'";
			}
			if(!endDate.isEmpty()){
				sql=sql+"  and l.endDate > '"+endDate+"'";
			}
			if(!leaholder.isEmpty()){
				sql=sql+" and l.leaholder like '%"+leaholder+"%'";			
			}
			if(!rentStatus.isEmpty()){
				sql=sql+" and l.rentstatus='"+rentStatus+"'";
			}
			sql=sql+" limit"+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		private static final class LeasRentMapper implements RowMapper<LeasRent>{
			@Override
			public LeasRent mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				LeasRent lr=new LeasRent();
				lr.setRentId(rs.getString("rentid"));
				lr.setLanBlock(rs.getString("landblock"));
				lr.setCityArea(rs.getString("cityarea"));
				lr.setAddress(rs.getString("address"));
				lr.setPropertys(rs.getString("propertys"));
				lr.setPropertyNo(rs.getString("propertyno"));
				lr.setLandSize(rs.getDouble("landsize"));
				lr.setRoomSize(rs.getDouble("roomsize"));
				lr.setNonOcc(rs.getDouble("nonocc"));
				lr.setGeoLocation(rs.getString("geoLocation"));
				lr.setRealDisplay(rs.getString("realdisplay"));
				lr.setIsRent(rs.getString("isrent"));
				lr.setCoors_x(rs.getDouble("coors_x"));
				lr.setCoors_y(rs.getDouble("coors_y"));
				lr.setLeasId(rs.getString("leasid"));
				lr.setLeaholder(rs.getString("leaholder"));
				lr.setCardType(rs.getString("cardtype"));
				lr.setIdCard(rs.getString("idcard"));
				lr.setTel(rs.getString("tel"));
				lr.setTimLimit(rs.getString("timlimit"));
				lr.setStartDate(rs.getString("startdate"));
				lr.setEndDate(rs.getString("enddate"));
				lr.setMonRent(rs.getDouble("monrent"));
				lr.setYerRent(rs.getDouble("yerrent"));
				lr.setWuyeFee(rs.getDouble("wuyefee"));
				lr.setParkFee(rs.getDouble("parkfee"));
				lr.setHandsel(rs.getDouble("handsel"));
				lr.setPenalty(rs.getDouble("penalty"));
				lr.setPayType(rs.getString("paytype"));
				lr.setRentStatus(rs.getString("rentstatus"));
				lr.setOutDays(rs.getString("outdays"));
				lr.setIncExplain(rs.getString("incexplain"));
				lr.setNextPayDate(rs.getString("nextpaydate"));
				lr.setCreateTime(rs.getString("createtime"));
				lr.setIsValid(rs.getString("isvalid"));
				lr.setRemark(rs.getString("remark"));
				return lr;
			}
		}

}
