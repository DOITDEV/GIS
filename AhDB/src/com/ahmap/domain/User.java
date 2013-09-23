package com.ahmap.domain;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class User implements Serializable{
	
	//private int userId;
	private String userName;
	private String password;
	private String depart;
	private int roleId;
	private int userType;
	private String email;
	private Date createTime;
	private RolePri role;
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	private String lastIp;
	private Date lastVisit;

	
//	public int getUserId() {
//		return userId;
//	}
//	
//	public void setUserId(int userId) {
//		this.userId = userId;
//	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDepart() {
		return depart;
	}
	public void setDepart(String depart) {
		this.depart = depart;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
//	public String getLastIp() {
//		return lastIp;
//	}
//	public void setLastIp(String lastIp) {
//		this.lastIp = lastIp;
//	}
//	public Date getLastVisit() {
//		return lastVisit;
//	}
//	public void setLastVisit(Date lastVisit) {
//		this.lastVisit = lastVisit;
//	}

	/**
	 * @param userType the userType to set
	 */
	public void setUserType(int userType) {
		this.userType = userType;
	}

	/**
	 * @return the userType
	 */
	public int getUserType() {
		return userType;
	}
	public RolePri getRole() {
		return role;
	}
	public void setRole(RolePri role) {
		this.role = role;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	
}
