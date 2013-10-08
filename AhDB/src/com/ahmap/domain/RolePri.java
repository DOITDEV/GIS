package com.ahmap.domain;

import java.util.Date;

public class RolePri {
	private int roleId;
	private String roleName;//角色名称
	private int deptId;//所属部门
	private String priv1;//Map
	private String priv2;//用户管理
	private String priv3;//租赁信息	
	private String priv4;//出租方
	private String priv5;//承租方
	private String priv6;//支付信息
	private String priv7;//第三方租赁
	private String priv8;//菜单六
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
	public int getDeptId() {
		return deptId;
	}
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}
	public String getPriv7() {
		return priv7;
	}
	public void setPriv7(String priv7) {
		this.priv7 = priv7;
	}
	public String getPriv8() {
		return priv8;
	}
	public void setPriv8(String priv8) {
		this.priv8 = priv8;
	}
	
}
