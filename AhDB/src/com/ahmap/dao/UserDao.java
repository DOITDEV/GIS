package com.ahmap.dao;

import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import com.ahmap.domain.User;
import com.ahmap.domain.UserClass;

@Repository
public class UserDao {
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
	/**
	 * @param userName
	 * @param password
	 * @return 登录判断
	 */
	public int getMatchCount(String userName, String password)
	{
		String sqlStr = "SELECT count(*) from chtuser WHERE username= '"+ userName+"' and password= '"+password +"'";
		//String sqlStr = "select count(*) from chtuser";
		int i = jdbcTemplate.queryForInt(sqlStr);
		System.out.println("**********************************************"+i);
		return i;
	}
	
	/**
	 * @param userName
	 * @return 用户名是否重复
	 */
	public int getMatchCount(String userName)
	{
		String sqlStr = "SELECT count(*) from chtuser" + " WHERE username=?";
		return jdbcTemplate.queryForInt(sqlStr,new Object[]{userName});
	}
	/**
	 * @param userName
	 * @return 按用户名返回用户
	 */
	public User findUserbyUserName(final String userName){
		String sqlStr = "SELECT * from chtuser where UserName= '" +userName+"'";
//		final User user = new User();
		return jdbcTemplate.query(sqlStr, new UserMapper()).get(0);
//		jdbcTemplate.query(sqlStr, new Object[]{userName},
//				new RowCallbackHandler(){
//					public void processRow(java.sql.ResultSet rs)
//							throws SQLException {
//						//user.setUserId(rs.getInt("id"));
//				    	user.setUserName(rs.getString("userName"));
//				    	user.setPassword(rs.getString("passWord"));
//				    	user.setDepart(rs.getString("depart"));
//				    	user.setEmail(rs.getString("email"));
//				    	user.setUserType(rs.getInt("userType"));
//						//user.setLastIp(rs.getString("lastip"));
//						//user.setLastVisit(rs.getDate("lastvisit"));
//					}
//		});
//		return user;
	}
	
	/**
	 * 
	 * @return 所有权限
	 */
	public List<UserClass> getAllUserClass(){
		String sqlStr = "SELECT * from chtao_userclass";
		return jdbcTemplate.query(sqlStr, new UserClassMapper());
	}
	
	private static final class UserClassMapper implements RowMapper<UserClass> {
	    public UserClass mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	UserClass user = new UserClass();
	    	user.setClassId(rs.getInt("classID"));
	        return user;
	    }        
	}
	
	public List<User> getAllUser(){
		String sqlStr = "SELECT * from chtuser";
		return jdbcTemplate.query(sqlStr, new UserMapper());
	}
	
	public List<User> getAllUserByClass(final String userClass){
		String sqlStr = "SELECT * from chtao_user where userType = " + userClass;
		return jdbcTemplate.query(sqlStr, new UserMapper());
	}

	private static final class UserMapper implements RowMapper<User> {
	    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
	    	User user = new User();
	    	//user.setUserId(rs.getInt("id"));
	    	user.setUserType(rs.getInt("userType"));
	    	user.setUserName(rs.getString("USERNAME"));
	    	user.setPassword(rs.getString("passWord"));
	    	user.setDepart(rs.getString("depart"));
	    	user.setEmail(rs.getString("email"));
			//user.setLastIp(rs.getString("lastip"));
			user.setCreateTime(rs.getDate("createTime"));
	        return user;
	    }        
	}
	
	/**
	 * 新增用户
	 * @param user
	 */
	public void addUser(User user) throws UnsupportedEncodingException{
		String sqlStr = " INSERT INTO chtuser(username,password,depart,usertype,email,createTime)"+ " VALUES(?,?,?,?,?,?)";
		 //最后的aa表示“上午”或“下午”    HH表示24小时制    如果换成hh表示12小时制  
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss aa");  
		 //temp_str=sdf.format(dt); 
		Object[] params = new Object[]{user.getUserName(),user.getPassword(),user.getDepart(),user.getUserType(),user.getEmail(),user.getCreateTime()};
		jdbcTemplate.update(sqlStr, params);
	}
	
	/**
	 * 删除用户
	 * @param user
	 */
	public void deleteuser(String userName){
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
