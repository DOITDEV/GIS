package com.ahmap.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
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

import com.ahmap.domain.LeaContract;
import com.ahmap.domain.LeasseeInfo;
import com.ahmap.domain.RentInfo;

@Repository
public class LeaContractDao {
	
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
    //插入租赁合同记录
	public void addleaContract(LeaContract lea){
		String sqlStr="INSERT INTO leacontract(id,sernum,lanblock,codnum,address,roomsize,nonocc,landsize,leaholder,propertys,timlimit,startdate,enddate,monrent,yerrent,paytype,handsel,penalty,tel,linker,incexplain,remark,nextPayDate,idcard,buslicense,orgcode,rentstatus,outdays,holdtype,coors_x,coors_y)"
					+"  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		Object[] params = new Object[]{"nextval('seq_milk')",lea.getSerNum(),lea.getLanBlock(),lea.getCodNum(),lea.getAddress(),lea.getRoomSize(),lea.getNonOcc(),lea.getLandSize(),lea.getLeaholder(),lea.getPropertys(),lea.getTimLimit(),
					lea.getStartDate(),lea.getEndDate(),lea.getMonRent(),lea.getYerRent(),lea.getPayType(),lea.getHandsel(),lea.getPenalty(),lea.getTel(),lea.getLinker(),lea.getIncExplain(),lea.getRemark(),lea.getNextPayDate(),lea.getIdCard(),
					lea.getBusLicense(),lea.getOrgCode(),lea.getRentStatus(),lea.getOutDays(),lea.getHoldType(),lea.getCoors_x(),lea.getCoors_y()};
		jdbcTemplate.update(sqlStr, params);
	}
	//批量插入租赁合同记录
	public int addleaContractList(List<LeaContract> list){
		String[] sqlList=new String[list.size()];
		String id=incre2.nextStringValue();
		for(int i=0;i<list.size();i++){
			LeaContract lea=list.get(i);
			String sql="INSERT INTO leacontract(id,sernum,lanblock,codnum,address,roomsize,nonocc,landsize,leaholder,propertys,timlimit,startdate,enddate,monrent,yerrent,paytype,handsel,penalty,tel,linker,incexplain,remark,nextPayDate,idcard,buslicense,orgcode,rentstatus,outdays,holdtype,coors_x,coors_y)"
					+" VALUES(nextval('seq_milk'),'"+list.get(i).getSerNum()+"','"+lea.getLanBlock()+"','"+lea.getCodNum()+"','"+lea.getAddress()+"',"+lea.getRoomSize()+",'"+lea.getNonOcc()+"',"+lea.getLandSize()
					+",'"+lea.getLeaholder()+"','"+lea.getPropertys()+"','"+lea.getTimLimit()+"','"+lea.getStartDate()+"','"+lea.getEndDate()+"',"+lea.getMonRent()+","+lea.getYerRent()+",'"+lea.getPayType()+"',"+lea.getHandsel()
					+","+lea.getPenalty()+",'"+lea.getTel()+"','"+lea.getLinker()+"','"+lea.getIncExplain()+"','"+lea.getRemark()+"',"+lea.getNextPayDate()+","+lea.getIdCard()+","+lea.getBusLicense()+","+lea.getOrgCode()+","+
					lea.getRentStatus()+","+lea.getOutDays()+","+lea.getHoldType()+","+lea.getCoors_x()+","+lea.getCoors_y()+")";
			sqlList[i]=sql;
			System.out.println("插入sql： "+sqlList[i]);
		}
		jdbcTemplate.batchUpdate(sqlList);
		return list.size();
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
	
	public void deleteleaContract(String id){
		String sql="delete from leacontract where id='"+id+"'";
		jdbcTemplate.update(sql);
	}
	public void updateleaContract(LeaContract lea){
		String sql="update  leacontract set id=? ,sernum=?,lanblock=?,codnum=?,address=?,roomsize=?,nonocc=?,landsize=?,leaholder=?,propertys=?,timlimit=?,startdate=?,enddate=?,monrent=?,yerrent=?,"
						+"paytype=?,handsel=?,penalty=?,tel=?,linker=?,incexplain=?,remark=?,nextpaydate=?,idcard=?,buslicense=?,orgcode=?,rentstatus=?,outdays=?,holdtype=? where id=?";
		Object[] params=new Object[]{lea.getId(),lea.getSerNum(),lea.getLanBlock(),lea.getCodNum(),lea.getAddress(),lea.getRoomSize(),lea.getNonOcc(),lea.getLandSize(),lea.getLeaholder(),lea.getPropertys(),lea.getTimLimit(),
				lea.getStartDate(),lea.getEndDate(),lea.getMonRent(),lea.getYerRent(),lea.getPayType(),lea.getHandsel(),lea.getPenalty(),lea.getTel(),lea.getLinker(),lea.getIncExplain(),lea.getRemark(),lea.getNextPayDate(),lea.getIdCard(),
				lea.getBusLicense(),lea.getOrgCode(),lea.getRentStatus(),lea.getOutDays(),lea.getId(),lea.getHoldType()};
		jdbcTemplate.update(sql,params);
	}
	public List<LeaContract> getAllLeaContracts(){
		String sql="SELECT id,sernum,lanblock,codnum,address,roomsize,nonocc,landsize,leaholder,propertys,timlimit,startdate,enddate,monrent,yerrent,paytype,handsel,penalty,tel,linker,incexplain,remark,nextPayDate,idcard,buslicense,orgcode,rentstatus,outdays,holdtype,coors_x,coors_y FROM leacontract";
		return jdbcTemplate.query(sql, new LeaContMapper());
	}
	
	public List<LeaContract> getAllLeas(String start,String limit){
		String sqlStr = "SELECT * from leacontract limit "+limit+" offset "+start;
		List<LeaContract> list=jdbcTemplate.query(sqlStr, new LeaContMapper());
		return list;
	}
	public int getCount(){
		String sqlStr = "SELECT COUNT(*) from leacontract";
		return jdbcTemplate.queryForInt(sqlStr);
	}
	private static final class LeaContMapper implements RowMapper<LeaContract> {
	    public LeaContract mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	LeaContract lea = new LeaContract();
	    	lea.setId(rs.getString("id"));
	    	lea.setSerNum(rs.getString("sernum"));
	    	lea.setLanBlock(rs.getString("lanblock"));
	    	lea.setCodNum(rs.getString("codnum"));
	    	lea.setAddress(rs.getString("address"));
	    	lea.setRoomSize(rs.getDouble("roomsize"));
	    	lea.setNonOcc(rs.getDouble("nonocc"));
	    	lea.setLandSize(rs.getDouble("landsize"));
	    	lea.setLeaholder(rs.getString("leaholder"));
	    	lea.setPropertys(rs.getString("propertys"));
	    	lea.setTimLimit(rs.getString("timlimit"));
	    	lea.setStartDate(rs.getString("startdate"));
	    	lea.setEndDate(rs.getString("enddate"));
	    	lea.setMonRent(rs.getDouble("monrent"));
	    	lea.setYerRent(rs.getDouble("yerrent"));
	    	lea.setPayType(rs.getString("paytype"));
	    	lea.setHandsel(rs.getDouble("handsel"));
	    	lea.setPenalty(rs.getDouble("penalty"));
	    	lea.setTel(rs.getString("tel"));
	    	lea.setLinker(rs.getString("linker"));
	    	lea.setIncExplain(rs.getString("incexplain"));
	    	lea.setRemark(rs.getString("remark"));
	    	lea.setNextPayDate(rs.getString("nextpaydate"));
	    	lea.setIdCard(rs.getString("idcard"));
	    	lea.setBusLicense(rs.getString("buslicense"));
	    	lea.setOrgCode(rs.getString("orgcode"));
	    	lea.setRentStatus(rs.getString("rentstatus"));
	    	lea.setOutDays(rs.getString("outdays"));
	    	lea.setHoldType(rs.getString("holdtype"));
	    	lea.setCoors_x(rs.getDouble("coors_x"));
	    	lea.setCoors_y(rs.getDouble("coors_y"));
	        return lea;
	    }        
	}
}
