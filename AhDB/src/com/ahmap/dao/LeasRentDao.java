package com.ahmap.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.incrementer.PostgreSQLSequenceMaxValueIncrementer;
import org.springframework.stereotype.Repository;

import com.ahmap.cons.CommonUtils;
import com.ahmap.domain.LeasRent;
import com.ahmap.domain.LeasseeInfo;
import com.ahmap.domain.RentInfo;


@Repository
public class LeasRentDao {
		
		private JdbcTemplate jdbcTemplate;  
	    private JdbcTemplate jdbcTemplate2;
	    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;  
	    private NamedParameterJdbcTemplate namedParameterJdbcTemplate2;
	    
	    @Autowired
	    private PostgreSQLSequenceMaxValueIncrementer incre2;
	
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
		public List<LeasRent> getAllLeasRentList(String start,String limit){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark,l.dateflag as dateflag "
						+" from rentinfo r,leasseeinfo l where r.id=l.rentid";
			sql=sql+" limit "+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//查询所有数据
		public List<LeasRent> getAllLeasRentList(){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark,l.dateflag as dateflag "
						+" from rentinfo r,leasseeinfo l where r.id=l.rentid";
//					sql=sql+" limit"+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//根据地块、城区、道路地址统计租赁信息
		public List<LeasRent> getAllRentByArea(String cityArea,String lanBlock,String address,String start,String limit){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark,l.dateflag as dateflag"
						+"from rentinfo r,leasseeinfo l where r.id=l.rentid and l.isvalid='1'";
			if(!cityArea.isEmpty()){
				sql=sql+" and r.cityArea like '%"+cityArea+"'";
			}
			if(!lanBlock.isEmpty()){
				sql=sql+" and r.lanblock like '%"+lanBlock+"%' ";
			}
			if(!address.isEmpty()){
				sql=sql+" and l.address like '%"+address+"%'";			
			}
			sql=sql+" limit "+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//根据条件查询
		public List<LeasRent> getLeasRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark,l.dateflag as dateflag"
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
			sql=sql+" limit "+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		//查询历史记录
		//根据条件查询
		public List<LeasRent> getLastRentList(String start,String limit,String propertys,String lanBlock,String startDate,String endDate,String leaholder,String rentStatus){
			String sql="Select r.id as rentid,r.lanblock as lanblock,r.cityarea as cityarea,r.address as address,r.propertys as propertys,r.propertyno as propertyno,r.landsize as landsize,r.roomsize as roomsize,r.nonocc as nonocc,"
						+"r.geolocation as geolocation,r.realdisplay as realdisplay,r.isrent as isrent,r.coors_x as coors_x,r.coors_y as coors_y,l.id as leasid,l.leaholder as leaholder,l.cardtype as cardtype,l.idcard as idcard,l.tel as tel,"
						+"l.timlimit as timlimit,l.startdate as startdate,l.enddate as enddate,l.monrent as monrent,l.yerrent as yerrent,l.wuyefee as wuyefee,l.parkfee as parkfee,l.handsel as handsel,l.penalty as penalty,l.paytype as paytype,"
						+"l.rentstatus as rentstatus,l.outdays as outdays,l.incexplain as incexplain,l.nextpaydate as nextpaydate,l.createtime as createtime,l.isvalid as isvalid,l.remark as remark,l.dateflag as dateflag"
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
			sql=sql+" limit "+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasRentMapper());
		}
		public void updateLeasRent(List<LeasseeInfo> list){
			
		}
		//
		public int getCount(){
			String sql="SELECT COUNT(*) FROM leasseeinfo l,rentinfo r WHERE r.id=l.rentid and l.isvalid='1' and r.isrent='1'";
			return jdbcTemplate.queryForInt(sql);
		}
		//出租已到期纪录
		public int getOverCount(){
			String sql="SELECT COUNT(*) FROM leasseeinfo WHERE dateflag='0' AND l.isvalid='1'";
			return jdbcTemplate.queryForInt(sql);
		}
		//未出租纪录
		public int getNoRentCount(){
			String sql="SELECT COUNT(*) FROM rentinfo where isrent='0'";
			return jdbcTemplate.queryForInt(sql);
		}
		//1个月内到期纪录
		public int getOverMonCount(){
			String sql="SELECT COUNT(*) FROM leasseeinfo WHERE dateflag='1' AND l.isvalid='1'";
			return jdbcTemplate.queryForInt(sql);
		}
		//3个月内到期纪录
		public int getOver3MonCount(){
			String sql="SELECT COUNT(*) FROM leasseeinfo WHERE dateflag='3' AND l.isvalid='1'";
			return jdbcTemplate.queryForInt(sql);
		}
		//更新租赁到期天数
		public void updateLimitDays() throws ParseException{
			String sql="Select l.id as id,l.enddate as enddate from rentinfo r,leasseeinfo l where r.id=l.rentid and l.isvalid='1' and r.isrent='1'";
			List<LeasseeInfo> leasList=CommonUtils.getJdbcTemplate1().query(sql, new LeassInfoMapper());
			if(leasList.size()>0 && leasList!=null){
				Date now=new Date();
				String[] sqlList=new String[leasList.size()];
				for(int i=0;i<leasList.size();i++){
					if(leasList.get(i).getEndDate()!=null && !"".equals(leasList.get(i).getEndDate())){
						int days=CommonUtils.getDaysBetweenDate(CommonUtils.convertDateToStr(now),leasList.get(i).getEndDate());
						String dateFlag=CommonUtils.getDateFlag(days);
						String sqlStr="UPDATE leasseeinfo SET dateflag='"+dateFlag+"'  where id='"+leasList.get(i).getId()+"'";
						sqlList[i]=sqlStr;
					}
				}
				CommonUtils.getJdbcTemplate1().batchUpdate(sqlList);
				System.out.println("dateflag已更新！");
			}
		}
		//批量插入租赁合同记录
		@SuppressWarnings("unchecked")
		public void addleaContractMap(Map<String,Object> map){
			List<RentInfo> rentList=(List<RentInfo>) map.get("rentInfoList");
			List<LeasseeInfo> leasseeInfoList=(List<LeasseeInfo>) map.get("leasseeInfoList");
			String[] sqlList=new String[rentList.size()+leasseeInfoList.size()];
			if(rentList.size()>0){
				for(int i=0;i<rentList.size();i++){
					RentInfo rent=rentList.get(i);
					String sql="INSERT INTO rentinfo(id,lanblock ,cityarea,address,propertys,propertyno,landsize,roomsize,nonocc,geolocation,realdisplay,isrent,coors_x,coors_y,filler1,filler2,filler3)"+ " VALUES('"+rent.getId()+"','"+rent.getLanBlock()+"','"+rent.getCityArea()+"','"+rent.getAddress()+"','"+rent.getPropertys()+"','"+rent.getPropertyNo()+"',"+rent.getLandSize()+","+rent.getRoomSize()+","+rent.getNonOcc()+",'"+rent.getGeoLocation()+"','"+
							rent.getRealDisplay()+"','"+rent.getIsRent()+"',"+rent.getCoors_x()+","+rent.getCoors_y()+","+rent.getFiller1()+","+rent.getFiller2()+","+rent.getFiller3()+")";
					sqlList[i]=sql;
				}
			}
			if(leasseeInfoList.size()>0){
				for(int j=0;j<leasseeInfoList.size();j++){
					LeasseeInfo lea=leasseeInfoList.get(j);
					String sqlStr="INSERT INTO leasseeinfo(id,rentid,lanblock,cityarea,address ,leaholder,cardtype,idcard,tel,timlimit,startdate,enddate,monrent,yerrent,wuyefee,parkfee,handsel,penalty,paytype,rentstatus,outdays,incexplain,nextpaydate,createtime,isvalid,remark,filler3,filler4,filler5)"+ " VALUES('"
					+incre2.nextStringValue()+"','"+lea.getRentId()+"','"+lea.getLanBlock()+"','"+lea.getCityArea()+"','"+lea.getAddress()+"','"+lea.getLeaholder()+"','"+lea.getCardType()+"','"+lea.getIdCard()+"','"+lea.getTel()+"','"+lea.getTimLimit()+"','"+lea.getStartDate()+"','"+lea.getEndDate()+"',"+lea.getMonRent()+","+lea.getYerRent()+","+
					lea.getWuyeFee()+","+lea.getParkFee()+","+lea.getHandsel()+","+lea.getPenalty()+",'"+lea.getPayType()+"','"+lea.getRentStatus()+"','"+lea.getOutDays()+"','"+lea.getIncExplain()+"','"+lea.getNextPayDate()+"','"+lea.getCreateTime()+"','"+lea.getIsValid()+"','"+lea.getRemark()+"',"+lea.getFiller3()+","+lea.getFiller4()+","+lea.getFiller5()+")";
					sqlList[j+rentList.size()]=sqlStr;
				}
			}
			jdbcTemplate.batchUpdate(sqlList);
		}
		private static final class LeassInfoMapper implements RowMapper<LeasseeInfo>{
			@Override
			public LeasseeInfo mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				LeasseeInfo lr=new LeasseeInfo();
				lr.setId(rs.getString("id"));
				lr.setEndDate(rs.getString("enddate"));
//				lr.setDateFlag(rs.getString("dateflag"));
				return lr;
			}
		}
		private static final class LeasRentMapper implements RowMapper<LeasRent>{
			@Override
			public LeasRent mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				LeasRent lr=new LeasRent();
				lr.setRentId(rs.getString("rentid"));
				lr.setLanBlock(rs.getString("lanblock"));
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
				String startDate=rs.getString("startdate");
				if(!CommonUtils.isEmpty(startDate)){
					lr.setStartDate(startDate);
				}
				String enddate=rs.getString("enddate");
				if(!CommonUtils.isEmpty(enddate)){
					lr.setEndDate(enddate);
				}
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
