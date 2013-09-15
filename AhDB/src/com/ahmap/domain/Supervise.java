package com.ahmap.domain;

import java.util.Date;

public class Supervise {
	private Integer logId;
	private String hosName;
	private String superviseUsers;
	private Date superviseDate;
	private String superviseResult;
	
	public Integer getLogId() {
		return logId;
	}
	public void setLogId(Integer logId) {
		this.logId = logId;
	}
	public String getHosName() {
		return hosName;
	}
	public void setHosName(String hosName) {
		this.hosName = hosName;
	}
	public String getSuperviseUsers() {
		return superviseUsers;
	}
	public void setSuperviseUsers(String superviseUsers) {
		this.superviseUsers = superviseUsers;
	}
	 
	public Date getSuperviseDate() {
		return superviseDate;
	}
	public void setSuperviseDate(Date superviseDate) {
		this.superviseDate = superviseDate;
	}
	public String getSuperviseResult() {
		return superviseResult;
	}
	public void setSuperviseResult(String superviseResult) {
		this.superviseResult = superviseResult;
	}
	
}
