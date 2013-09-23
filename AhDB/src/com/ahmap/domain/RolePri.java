package com.ahmap.domain;

import java.util.Date;

public class RolePri {
	private int roleId;
	private String roleName;
	private String priv1;//菜单一
	private String priv2;//菜单二
	private String priv3;//菜单三
	private String priv4;//菜单四
	private String priv5;//菜单五
	private String priv6;//菜单六
	private Date createTime;
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getPriv1() {
		return priv1;
	}
	public void setPriv1(String priv1) {
		this.priv1 = priv1;
	}
	public String getPriv2() {
		return priv2;
	}
	public void setPriv2(String priv2) {
		this.priv2 = priv2;
	}
	public String getPriv3() {
		return priv3;
	}
	public void setPriv3(String priv3) {
		this.priv3 = priv3;
	}
	public String getPriv4() {
		return priv4;
	}
	public void setPriv4(String priv4) {
		this.priv4 = priv4;
	}
	public String getPriv5() {
		return priv5;
	}
	public void setPriv5(String priv5) {
		this.priv5 = priv5;
	}
	public String getPriv6() {
		return priv6;
	}
	public void setPriv6(String priv6) {
		this.priv6 = priv6;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
