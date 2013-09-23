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
import com.ahmap.domain.User;
import com.ahmap.domain.UserLog;

@Repository
public class UserLogDao {
//	@Autowired
//	private JdbcTemplate jdbcTemplate;
	
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
	
	public UserLog findUserLogbyUserName(final String userName){
		String sqlStr = "SELECT * from UserLog where UserName= '" +userName+"'";
		return jdbcTemplate.query(sqlStr, new UserLogMapper()).get(0);
	}
	
	public List<UserLog> getAllUserLog(){
		String sqlStr = "SELECT * from userlog";
		return jdbcTemplate.query(sqlStr, new UserLogMapper());
	}
	
	public List<UserLog> getAllUserLogByClass(final String userClass){
		String sqlStr = "SELECT * from UserLog where userType = " + userClass;
		return jdbcTemplate.query(sqlStr, new UserLogMapper());
	}

	private static final class UserLogMapper implements RowMapper<UserLog> {
	    public UserLog mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	UserLog userlog = new UserLog();
	    	//user.setUserId(rs.getInt("id"));
	    	userlog.setUserType(rs.getInt("userType"));
	    	userlog.setUserName(rs.getString("userName"));
	    	userlog.setOperation(rs.getString("operation"));
	    	userlog.setComment(rs.getString("comment"));
	    	userlog.setCreateTime(rs.getDate("createTime"));
	        return userlog;
	    }        
	}
	
	/**
	 * 新增用户日志
	 * @param userlog
	 */
	public void addUserLog(UserLog userLog) {
		String sqlStr = " INSERT INTO userLog(username,userType,operation,comment,createTime)"+ " VALUES(?,?,?,?,?)";
		 //最后的aa表示“上午”或“下午”    HH表示24小时制    如果换成hh表示12小时制  
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss aa");  
		 //temp_str=sdf.format(dt); 
		Object[] params = new Object[]{userLog.getUserName(),userLog.getUserType(),userLog.getOperation(),userLog.getComment(),userLog.getCreateTime()};
		jdbcTemplate.update(sqlStr, params);
	}
	
	/**
	 * 删除用户
	 * @param user
	 */
	public void deleteuserLog(String userName){
		String sqlStr = "delete from chtuser where userName='" + userName +"'";
		jdbcTemplate.execute(sqlStr);
	}
	
	/**
	 * 修改用户
	 * @param user
	 */
	public void updateUser(User user){
		String sqlStr = " update chtuser set password=?,depart=?,usertype=?,email=? where username=?";
		Object[] params = new Object[]{user.getPassword(),user.getDepart(),user.getUserType(),user.getEmail(),user.getUserName()};
		jdbcTemplate.update(sqlStr, params);
	}
	
	/**
	 *  
	 * @param user
	 */
	public void updateLoginInfo(User user){
		String sqlStr = "UPDATE t_user set last_visit=?,last_ip=?,credits=?"+" where user_id=?";
		
		jdbcTemplate.update(sqlStr,new Object[]{
				//user.getLastVisit(),
				//user.getLastIp(),
				//user.getCredits(),
				//user.getUserId()
				});
	}
}
