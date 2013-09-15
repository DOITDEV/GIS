package com.ahmap.domain;
import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class Hospital implements Serializable{
	
	private String name;
	private String lever;
	private String kemu;
	private int docNum;
	private int nursNum;
	private String phoneNum;
	private String corporation;
	private String address;
	private double coors_x;
	private double coors_y;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLever() {
		return lever;
	}
	public void setLever(String lever) {
		this.lever = lever;
	}
 
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getCoors_x() {
		return coors_x;
	}
	public void setCoors_x(double coorsX) {
		coors_x = coorsX;
	}
	public double getCoors_y() {
		return coors_y;
	}
	public void setCoors_y(double coorsY) {
		coors_y = coorsY;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setDocNum(int docNum) {
		this.docNum = docNum;
	}
	public int getDocNum() {
		return docNum;
	}
	/**
	 * @param nursNum the nursNum to set
	 */
	public void setNursNum(int nursNum) {
		this.nursNum = nursNum;
	}
	/**
	 * @return the nursNum
	 */
	public int getNursNum() {
		return nursNum;
	}
	public void setKemu(String kemu) {
		this.kemu = kemu;
	}
	public String getKemu() {
		return kemu;
	}
}
