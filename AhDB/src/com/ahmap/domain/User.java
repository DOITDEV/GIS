package com.ahmap.domain;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class User implements Serializable{
	private String id;
	private String userName;
	private String password;
	private String departId;
	private String departName;
	private String roleId;//角色id
	private String roleName;
	private int userType;//0 普通外网用户，1 公司内部用户
	private String email;
	private Date createTime;
	private Date lastUpdateTime;//最后一次修改时间
	
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
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
	
	public String getDepartId() {
		return departId;
	}
	public void setDepartId(String departId) {
		this.departId = departId;
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
	
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}
	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	public String getDepartName() {
		return departName;
	}
	public void setDepartName(String departName) {
		this.departName = departName;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
