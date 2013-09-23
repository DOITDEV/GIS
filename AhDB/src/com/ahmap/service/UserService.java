package com.ahmap.service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahmap.dao.LoginLogDao;
import com.ahmap.dao.UserDao;
import com.ahmap.dao.UserLogDao;
import com.ahmap.domain.LoginLog;
import com.ahmap.domain.User;
import com.ahmap.domain.UserClass;
import com.ahmap.domain.UserLog;

@Service
public class UserService {
    
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserLogDao userLogDao;
	
	@Autowired
	private LoginLogDao loginLogDao;
	
	/**
	 * 新增用户
	 * @param user
	 * @return 
	 * @throws UnsupportedEncodingException 
	 */
	public String addUser(User user) throws UnsupportedEncodingException {
		 if(userDao.getMatchCount(user.getUserName())>0)
		 {
			 return "用户名已存在！"; 
		 }
		 else
		 {
			 userDao.addUser(user);
			 return "添加用户成功！";
		 }	
	}
	
	/**
	 * 删除用户
	 * @param userId
	 */
	public void deleteUser(String userName) {
		userDao.deleteuser(userName);
		//删除该用户发布的所有服务
		//
	}
	/**
	 * 更新用户信息
	 * @param user
	 */
	public void updateUser(User user){
		userDao.updateUser(user);
	}

	/**
	 * 登录判断
	 * @param userName
	 * @param password
	 * @return
	 */
	public boolean hasMatchUser(String userName, String password) {
		int matchCount =userDao.getMatchCount(userName, password);
		if(matchCount > 0)
		{
//			UserLog userLog = new UserLog();
//			userLog.setUserName(userName);
//			User user = userDao.findUserbyUserName(userName);
//			userLog.setUserType(user.getUserType());
//			userLog.setOperation("登陆");
//			userLog.setComment("...");
//			Date date = new Date();
//			userLog.setCreateTime(date);
//			userLogDao.addUserLog(userLog);
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public void logOut(String userName,int userType)
	{
		UserLog userLog = new UserLog();
		userLog.setUserName(userName);
		userLog.setUserType(userType);
		userLog.setOperation("退出");
		userLog.setComment("...");
		Date date = new Date();
		userLog.setCreateTime(date);
		userLogDao.addUserLog(userLog);
	}

	/**
	 * 返回所有用户
	 * @return
	 */
	public List<User> getAllUser() {
		return userDao.getAllUser();
	}
	
	/**
	 * 返回所有权限
	 * @return
	 */
	public List<UserClass> getAllUserClass() {
		return userDao.getAllUserClass();
	}
	
	
	/**
	 * 根据用户名查询用户信息
	 * @return
	 */
	public User findUserByName(String userName) {
		return userDao.findUserbyUserName(userName);
	}
	
	/**
	 * 根据用户名查询用户信息
	 * @return
	 */
	public List<User> findUserByClass(String classID) {
		return userDao.getAllUserByClass(classID);
	}
	
	/**
	 * 登录成功添加登录日志信息
	 * @param user
	 */
	public void loginSuccess(User user) {
		//user.setCredits( 5 + user.getCredits());
		LoginLog loginLog = new LoginLog();
		//loginLog.setUserId(user.getUserId());
		//loginLog.setIp(user.getLastIp());
		//loginLog.setLoginDate(user.getLastVisit());
       // userDao.updateLoginInfo(user);
       // loginLogDao.insertLoginLog(loginLog);
	}	
}
