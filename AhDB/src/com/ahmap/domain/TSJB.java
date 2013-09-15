package com.ahmap.domain;

import java.util.Date;

public class TSJB {
	private int ID;
	private String CLASSIFY;
	private String DEALING_RESULT;
	private String objName;
	private String objAddress;
	private Date RECEIVE_DATE;
	private Date ARCHIVE_DATE;
	private String COMPLAINT_DETAIL;
	private String ISArchive;
	//private String result;
	
	
	public String getDEALING_RESULT() {
		return DEALING_RESULT;
	}
	public void setDEALING_RESULT(String dEALINGRESULT) {
		DEALING_RESULT = dEALINGRESULT;
	}
	
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getCLASSIFY() {
		return CLASSIFY;
	}
	public void setCLASSIFY(String cLASSIFY) {
		CLASSIFY = cLASSIFY;
	}
	public String getObjName() {
		return objName;
	}
	public void setObjName(String objName) {
		this.objName = objName;
	}
	public Date getRECEIVE_DATE() {
		return RECEIVE_DATE;
	}
	public void setRECEIVE_DATE(Date rECEIVEDATE) {
		RECEIVE_DATE = rECEIVEDATE;
	}
	public Date getARCHIVE_DATE() {
		return ARCHIVE_DATE;
	}
	public void setARCHIVE_DATE(Date aRCHIVEDATE) {
		ARCHIVE_DATE = aRCHIVEDATE;
	}
	public String getCOMPLAINT_DETAIL() {
		return COMPLAINT_DETAIL;
	}
	public void setCOMPLAINT_DETAIL(String cOMPLAINTDETAIL) {
		COMPLAINT_DETAIL = cOMPLAINTDETAIL;
	}
//	public String getResult() {
//		return result;
//	}
//	public void setResult(String result) {
//		this.result = result;
//	}
	public void setObjAddress(String objAddress) {
		this.objAddress = objAddress;
	}
	public String getObjAddress() {
		return objAddress;
	}
	public void setISArchive(String iSArchive) {
		ISArchive = iSArchive;
	}
	public String getISArchive() {
		return ISArchive;
	}
}
