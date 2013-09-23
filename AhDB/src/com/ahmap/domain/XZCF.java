package com.ahmap.domain;

import java.util.Date;

public class XZCF {
	//处罚ID
	private int PUNISH_ID;
	//处罚对象
	private String UNIT_NAME;
	//处罚对象地址
	private String UNIT_ADDRESS;
	//立案日期
	private Date LA_TIME;
	//受理日期
	private Date ACCEPT_DATE;
	//结案日期
	private Date JARQ;
	/////////////////********************************来源T_D4_PUNISH_CASE表***********************************************/////////////////////
	//案由
	private String CASE_CON;
	//处罚内容
	private String PUNISH_DESC;
	
	
	public int getPUNISH_ID() {
		return PUNISH_ID;
	}
	public void setPUNISH_ID(int pUNISHID) {
		PUNISH_ID = pUNISHID;
	}
	public String getUNIT_NAME() {
		return UNIT_NAME;
	}
	public void setUNIT_NAME(String uNITNAME) {
		UNIT_NAME = uNITNAME;
	}
	public String getUNIT_ADDRESS() {
		return UNIT_ADDRESS;
	}
	public void setUNIT_ADDRESS(String uNITADDRESS) {
		UNIT_ADDRESS = uNITADDRESS;
	}
	public Date getLA_TIME() {
		return LA_TIME;
	}
	public void setLA_TIME(Date lATIME) {
		LA_TIME = lATIME;
	}
	public Date getACCEPT_DATE() {
		return ACCEPT_DATE;
	}
	public void setACCEPT_DATE(Date aCCEPTDATE) {
		ACCEPT_DATE = aCCEPTDATE;
	}
	public Date getJARQ() {
		return JARQ;
	}
	public void setJARQ(Date jARQ) {
		JARQ = jARQ;
	}
	public String getCASE_CON() {
		return CASE_CON;
	}
	public void setCASE_CON(String cASECON) {
		CASE_CON = cASECON;
	}
	public String getPUNISH_DESC() {
		return PUNISH_DESC;
	}
	public void setPUNISH_DESC(String pUNISHDESC) {
		PUNISH_DESC = pUNISHDESC;
	}
}
