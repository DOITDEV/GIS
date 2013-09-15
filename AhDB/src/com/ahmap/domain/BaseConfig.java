package com.ahmap.domain;

public class BaseConfig {
	private String dbName;
	private String dbUser;
	private String dbPassWord;
	private String serverUrl;
	private String dbUrl;
	
	public String getDbName() {
		return dbName;
	}
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	public String getDbUser() {
		return dbUser;
	}
	public void setDbUser(String dbUser) {
		this.dbUser = dbUser;
	}
	public String getDbPassWord() {
		return dbPassWord;
	}
	public void setDbPassWord(String dbPassWord) {
		this.dbPassWord = dbPassWord;
	}
	public String getServerUrl() {
		return serverUrl;
	}
	public void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}
	public void setDbUrl(String dbUrl) {
		this.dbUrl = dbUrl;
	}
	public String getDbUrl() {
		return dbUrl;
	}
	
}
