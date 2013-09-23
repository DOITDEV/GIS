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
import com.ahmap.domain.LeasseeInfo;

@Repository
public class LeasseeDao {
	
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
    
		//插入承租人信息
		public void addLeassee(LeasseeInfo lea){
			String sql="INSERT INTO leasseeinfo(id,rentid,lanblock,cityarea,address ,leaholder,cardtype,idcard,tel,timlimit,startdate,enddate,monrent,yerrent,wuyefee,parkfee,handsel,penalty,paytype,rentstatus,outdays,incexplain,nextpaydate,createtime,isvalid,remark,filler3,filler4,filler5)"+ " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			Object[] params = new Object[]{lea.getId(),lea.getRentId(),lea.getLanBlock(),lea.getCityArea(),lea.getAddress(),lea.getLeaholder(),lea.getCardType(),lea.getIdCard(),lea.getTel(),lea.getTimLimit(),lea.getStartDate(),lea.getEndDate(),lea.getMonRent(),lea.getYerRent(),
							lea.getWuyeFee(),lea.getParkFee(),lea.getHandsel(),lea.getHandsel(),lea.getPayType(),lea.getRentStatus(),lea.getOutDays(),lea.getIncExplain(),lea.getNextPayDate(),lea.getCreateTime(),lea.getIsValid(),lea.getRemark(),lea.getFiller3(),lea.getFiller4(),lea.getFiller5()};
			jdbcTemplate.update(sql, params);
		}
		//插入承租人信息2
		public void addLeassee2(LeasseeInfo lea){
			String sql="INSERT INTO leasseeinfo(id,rentid,lanblock,cityarea,address ,leaholder,cardtype,idcard,tel,timlimit,startdate,enddate,monrent,yerrent,wuyefee,parkfee,handsel,penalty,paytype,rentstatus,outdays,incexplain,nextpaydate,createtime,isvalid,remark,filler3,filler4,filler5)"+ " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			Object[] params = new Object[]{incre.nextIntValue(),lea.getRentId(),lea.getLanBlock(),lea.getCityArea(),lea.getAddress(),lea.getLeaholder(),lea.getCardType(),lea.getIdCard(),lea.getTel(),lea.getTimLimit(),lea.getStartDate(),lea.getEndDate(),lea.getMonRent(),lea.getYerRent(),
							lea.getWuyeFee(),lea.getParkFee(),lea.getHandsel(),lea.getHandsel(),lea.getPayType(),lea.getRentStatus(),lea.getOutDays(),lea.getIncExplain(),lea.getNextPayDate(),lea.getCreateTime(),lea.getIsValid(),lea.getRemark(),lea.getFiller3(),lea.getFiller4(),lea.getFiller5()};
			jdbcTemplate.update(sql, params);
		}
		/**
		 * 删除承租人信息
		 * @param name
		 */
		public void deleteLeassee(String id){
			String sqlStr = "delete from leasseeinfo where id='" + id +"'";
			jdbcTemplate.update(sqlStr);
		}
		//修改承租人信息
		public void updateLeassee(LeasseeInfo lea){
			String sql="UPDATE leasseeinfo set rentid=?,lanblock=?,cityarea=?,address=?,leaholder=?,cardtype=?,idcard=?,tel=?,timlimit=?,startdate=?,enddate=?,monrent=?,yerrent=?,wuyefee=?," +
					"parkfee=?,handsel=?,penalty=?,paytype=?,rentstatus=?,outdays=?,incexplain=?,nextpaydate=?,createtime=?,isvalid=?,remark=? where id=?";
			Object[] params = new Object[]{lea.getRentId(),lea.getLanBlock(),lea.getCityArea(),lea.getAddress(),lea.getLeaholder(),lea.getCardType(),lea.getIdCard(),lea.getTel(),lea.getTimLimit(),lea.getStartDate(),lea.getEndDate(),lea.getMonRent(),lea.getYerRent(),
					lea.getWuyeFee(),lea.getParkFee(),lea.getHandsel(),lea.getPenalty(),lea.getPayType(),lea.getRentStatus(),lea.getOutDays(),lea.getIncExplain(),lea.getNextPayDate(),lea.getCreateTime(),lea.getIsValid(),lea.getRemark(),lea.getId()};
			jdbcTemplate.update(sql, params);
		}
	
		public int getCount(){
			String sql="SELECT COUNT(*) FROM leasseeinfo";
			return jdbcTemplate.queryForInt(sql);
		}
		//获取承租人信息
		public int getCountByAdd(String address){
			String sql="SELECT COUNT(*) FROM leasseeinfo WHERE address="+address;
			return jdbcTemplate.queryForInt(sql);
		}
		public List<LeasseeInfo> getAllLeassee(String start,String limit){
			String sql="SELECT * from leasseeinfo limit "+limit+" offset "+start;
			return jdbcTemplate.query(sql, new LeasseeInfoMapper());
		}
		public List<LeasseeInfo> getAllLeassee(){
			String sql="SELECT * from leasseeinfo where isvalid='1'";
			return jdbcTemplate.query(sql, new LeasseeInfoMapper());
		}
		private static final class LeasseeInfoMapper implements RowMapper<LeasseeInfo>{
			@Override
			public LeasseeInfo mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				LeasseeInfo lea=new LeasseeInfo();
				lea.setId(rs.getString("id"));
				lea.setRentId(rs.getString("rentid"));
				lea.setLanBlock(rs.getString("lanblock"));
				lea.setCityArea(rs.getString("cityarea"));
				lea.setAddress(rs.getString("address"));
				lea.setLeaholder(rs.getString("leaholder"));
				lea.setCardType(rs.getString("cardtype"));
				lea.setIdCard(rs.getString("idcard"));
				lea.setTel(rs.getString("tel"));
				lea.setTimLimit(rs.getString("timlimit"));
				lea.setStartDate(rs.getString("startdate"));
				lea.setEndDate(rs.getString("enddate"));
				lea.setMonRent(rs.getDouble("monrent"));
				lea.setYerRent(rs.getDouble("yerrent"));
				lea.setWuyeFee(rs.getDouble("wuyefee"));
				lea.setParkFee(rs.getDouble("parkfee"));
				lea.setHandsel(rs.getDouble("handsel"));
				lea.setPenalty(rs.getDouble("penalty"));
				lea.setPayType(rs.getString("paytype"));
				lea.setRentStatus(rs.getString("rentstatus"));
				lea.setOutDays(rs.getString("outdays"));
				lea.setIncExplain(rs.getString("incexplain"));
				lea.setNextPayDate(rs.getString("nextpaydate"));
				lea.setCreateTime(rs.getString("createtime"));
				lea.setIsValid(rs.getString("isvalid"));
				lea.setRemark(rs.getString("remark"));
				return lea;
			}
		}
}
