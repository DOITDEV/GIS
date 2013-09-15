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
import com.ahmap.domain.PaymentInfo;

@Repository
public class PaymentInfoDao {
	
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
	//插入收款纪录
	public void addPay(PaymentInfo pay){
		String sql="INSERT INTO paymentinfo(leasseeid,rentid,address,amount,createtime,filler1,filler2,filler3)"+ " VALUES(?,?,?,?,?,?,?,?)";
		Object[] params = new Object[]{pay.getLeasseeId(),pay.getRentId(),pay.getAddress(),pay.getAmount(),pay.getCreateTime(),null,null,null};
		jdbcTemplate.update(sql, params);
	}
	//修改收款纪录
	public void updatePay(PaymentInfo pay){
		String sql="UPDATE paymentinfo set amount=?,createtime=? where address=? and leasseeid=?";
		Object[] params = new Object[]{pay.getAmount(),pay.getCreateTime(),pay.getAddress(),pay.getLeasseeId()};
		jdbcTemplate.update(sql, params);
	}
	public int getCount(){
		String sql="SELECT COUNT(*) FROM paymentinfo";
		return jdbcTemplate.queryForInt(sql);
	}
	//获取收款纪录
	public int getCountByAdd(String address){
		String sql="SELECT COUNT(*) FROM paymentinfo WHERE address="+address;
		return jdbcTemplate.queryForInt(sql);
	}
	public List<PaymentInfo> getAllPays(String start,String limit){
		String sql="SELECT * from paymentinfo limit "+limit+" offset "+start;
		return jdbcTemplate.query(sql, new PayInfoMapper());
	}
	//根据租赁地址、承租人查询付款明细
	public List<PaymentInfo> getAllPaysByAdd(String start,String limit,String address,String leaholder){
		String sql="SELECT * from paymentinfo where filler1 is null";
		if(!address.isEmpty()){
			sql=sql+" and address like '%"+address+"%' ";
		}
		if(!leaholder.isEmpty()){
			sql=sql+" and  leaholder like '%"+leaholder+"%'";
		}
		sql=sql+" limit"+limit+" offset "+start;
		return jdbcTemplate.query(sql, new PayInfoMapper());
	}
	private static final class PayInfoMapper implements RowMapper<PaymentInfo>{
		@Override
		public PaymentInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
			PaymentInfo pay=new PaymentInfo();
			pay.setLeasseeId(rs.getString("leasseeid"));
			pay.setRentId(rs.getString("rentid"));
			pay.setAddress(rs.getString("address"));
			pay.setAmount(rs.getDouble("amount"));
			pay.setCreateTime(rs.getString("createtime"));
			return pay;
		}
	}
}
