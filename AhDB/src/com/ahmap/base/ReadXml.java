package com.ahmap.base;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.xml.sax.SAXException;
import com.ahmap.domain.BaseConfig;
import com.ahmap.domain.Hospital;
import com.ahmap.domain.LeasRent;
import com.ahmap.domain.MapServer;


public class ReadXml {
	 
    public static final String DATA_FILE_NAME = System.getProperty("user.dir")   
            + "/src/test/wmts.xml";
    
    private static final String DATA_BASE_NAME = System.getProperty("user.dir")   
    + "/src/test/db.xml";
    
    public static final String DATA_WFS_NAME = System.getProperty("user.dir")   
    + "/src/test/wfs.xml";
    
    public static final String DATA_ROUTE_NAME = System.getProperty("user.dir")   
    + "/src/test/route.xml";
    
    public static final String DATA_WMTS_CONFIG = System.getProperty("user.dir")   
    + "/src/test/wmtsConfig.xml";
    
    public static final String DATA_Map_Server = System.getProperty("user.dir")   
    + "/src/test/mapServer.xml";
    
    //flzhao
    public static final String DATA_LEAC_CONFIG = System.getProperty("user.dir")   
    	    + "/src/test/leacConfig.xml";
    
    public static SAXBuilder wmtsSb = new SAXBuilder();
	public static Element wmtsRoot = null;
	public static Document wmtsDoc = null;
	public static List<Element> tileList = new ArrayList<Element>();
	
	 
	public static SAXBuilder wfsSb = new SAXBuilder();
	public static Element wfsRoot = null;
	public static Document wfsDoc = null;
	public static List<Element> FeatureList = new ArrayList<Element>();
	
	public static SAXBuilder routeSb = new SAXBuilder();
	public static Element routeRoot = null;
	public static Document routeDoc = null;
	public static List<Element> routeList = new ArrayList<Element>();
	
//	@SuppressWarnings("unchecked")
//	public static void routeInit(){
//		routeSb = new SAXBuilder();
//		try
//		{
//			InputStream input = new FileInputStream(DATA_ROUTE_NAME); 
//			routeDoc = routeSb.build(input);
//			routeRoot = routeDoc.getRootElement();
//			routeList = new ArrayList<Element>();
//			routeList = routeRoot.getChildren("route");
//		}
//		catch(Exception e)
//		{
//			e.printStackTrace();
//		}
//	}
//    @SuppressWarnings("unchecked")
//	public static void wmtsInit(){
//		wmtsSb = new SAXBuilder();
//		try
//		{
//			InputStream input = new FileInputStream(DATA_FILE_NAME); 
//			wmtsDoc = wmtsSb.build(input);
//			wmtsRoot = wmtsDoc.getRootElement();
//			tileList = new ArrayList<Element>();
//			tileList = wmtsRoot.getChildren("tile");
//		}
//		catch(Exception e)
//		{
//			e.printStackTrace();
//		}
//    }
//
//
//    @SuppressWarnings("unchecked")
//	public static String deleteWmts(String LayerName) throws FileNotFoundException, IOException
//    {
//    		wmtsInit();
//			Iterator tileIt = tileList.iterator();
//			while(tileIt.hasNext())
//			{
//				Element temp = (Element) tileIt.next();
//				if(LayerName.equals(temp.getChildText("name")))
//				{
//					wmtsRoot.removeContent(temp);
//					wmtsDoc.setRootElement(wmtsRoot);
//					//文件处理
//					XMLOutputter out = new XMLOutputter();
//					OutputStream tmpout = new FileOutputStream(DATA_FILE_NAME);
//					out.output(wmtsDoc, tmpout);//new FileOutputStream(DATA_FILE_NAME));
//					tmpout.close();
//					return "success";
//				}
//			}
//		return "failure";
//    }
//
// 
//    public static String updateIsOn(String layerName) throws IOException
//    {
//    	wmtsInit();
//		Iterator tileIt = tileList.iterator();
//		
//		  for(Element e:tileList) {
//			  if(layerName.equals(e.getChildText("name")))
//				{
//					if(e.getChildText("isOn").equals("true"))
//					{
//						e.getChild("isOn").setText("false");
//					}
//					else{
//						e.getChild("isOn").setText("true");	
//					}
//					//文件处理
//					XMLOutputter out = new XMLOutputter();
//					OutputStream tmpout = new FileOutputStream(DATA_FILE_NAME);
//					out.output(wmtsDoc, tmpout);//new FileOutputStream(DATA_FILE_NAME));
//					tmpout.close();
//					return "success";
//				}
//			}
//		return "failure";
//    }
//    
//	@SuppressWarnings("unchecked")
//	public static String TilePath(String layer){
//			SAXBuilder sb = new SAXBuilder();
//			String outStr = null;
//			try
//			{
//				InputStream input = new FileInputStream(DATA_FILE_NAME); 
//				Document doc = sb.build(input);
//				Element root = doc.getRootElement();
//				List<Element> tileList = new ArrayList<Element>();
//				tileList = root.getChildren("tile");//.getChild("tile").getChildText("path");
//				Iterator tileIt = tileList.iterator();
//				while(tileIt.hasNext())
//				{
//					Element temp = (Element) tileIt.next();
//					String layerName = temp.getChildText("name");
//					String path = temp.getChildText("path");
//					//System.out.println(layerName);
//					//System.out.println(path);
//					if(layerName.equals(layer))
//					{
////						//System.out.println(layerName);
//						outStr = path;
//						System.out.println("stop:"+layerName);
//						System.out.println("stop:"+path);
//						return outStr;
//					}
//				}
//				System.out.println(outStr);
//			}
//			catch(Exception e)
//			{
//				e.printStackTrace();
//			}
//			return outStr;
//		}
// 
//	@SuppressWarnings("unchecked")
//    public static String GetDataBase(){
//        			SAXBuilder sb = new SAXBuilder();
//        			String outStr = null;
//        			try
//        			{
//        				InputStream input = new FileInputStream(DATA_BASE_NAME); 
//        				Document doc = sb.build(input);
//        				Element root = doc.getRootElement();
//        				List<Element> tileList = new ArrayList<Element>();
//        				tileList = root.getChildren("DataBase");//.getChild("tile").getChildText("path");
//        				System.out.println("--------------name:"+root.getChild("name").getText());
//        				System.out.println("--------------path:"+root.getChild("password").getText());
//        				System.out.println("--------------url:"+root.getChild("url").getText());
//        				
//        				String name = root.getChild("name").getText();
//        				String password = root.getChild("password").getText();
//        				String url = root.getChild("url").getText();
//        				outStr = name+"&"+password+"&"+url;
//        				return outStr;
//        			}
//        			catch(Exception e)
//        			{
//        				e.printStackTrace();
//        			}
//        			return outStr;
//        		}
	
//	@SuppressWarnings("unchecked")
//    public static BaseConfig getBaseConfig(){
//        			SAXBuilder sb = new SAXBuilder();
//        			String outStr = null;
//        			try
//        			{
//        				InputStream input = new FileInputStream(DATA_BASE_NAME); 
//        				Document doc = sb.build(input);
//        				Element root = doc.getRootElement();
//        				//List<Element> tileList = new ArrayList<Element>();
//        				//tileList = root.getChildren("DataBase");//.getChild("tile").getChildText("path");
//        				System.out.println("--------------name:"+root.getChild("name").getText());
//        				System.out.println("--------------path:"+root.getChild("password").getText());
//        				System.out.println("--------------url:"+root.getChild("url").getText());
//        				
//        				BaseConfig base = new BaseConfig();
//        				String name = root.getChild("name").getText();
//        				String password = root.getChild("password").getText();
//        				String url = root.getChild("url").getText();
//        				String dbName = root.getChild("dbName").getText();
//        				String serverUrl = root.getChild("serverUrl").getText();
//        				base.setDbName(dbName);
//        				base.setDbPassWord(password);
//        				base.setDbUser(name);
//        				base.setServerUrl(serverUrl);
//        				base.setDbUrl(url);
//        				return base;
//        			}
//        			catch(Exception e)
//        			{
//        				e.printStackTrace();
//        			}
//        			return null;
//        		}
	
	/**
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static List<MapServer> getServices(){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_Map_Server); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			List tmpList = root.getChildren("city");
			List<MapServer> tmpList2 = new ArrayList<MapServer>();
			for(int i=0;i<tmpList.size();i++)
			{
				Element element=(Element)tmpList.get(i);
				//element.getChildText("name")
			    String name=element.getChildText("name");
			    String url=element.getChildText("url");
			    String eleUrl=element.getChildText("eleUrl");
			    String annoUrl=element.getChildText("annoUrl");
			    String domUrl=element.getChildText("domUrl");
			    String annoDomUrl=element.getChildText("annoDomUrl");
			    
			    MapServer mapserver = new MapServer();
			    mapserver.setName(name);
			    mapserver.setUrl(url);
			    mapserver.setEleUrl(eleUrl);
			    mapserver.setAnnoUrl(annoUrl);
			    mapserver.setDomUrl(domUrl);
			    mapserver.setAnnoDomUrl(annoDomUrl);
			    tmpList2.add(mapserver);
			}
			return tmpList2;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 
	 * @return
	 */
	public static Hospital getWmtsConfig(){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_WMTS_CONFIG); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			//List<Element> tileList = new ArrayList<Element>();
			//tileList = root.getChildren("DataBase");//.getChild("tile").getChildText("path");
			System.out.println("--------------name:"+root.getChild("name").getText());
			System.out.println("--------------address:"+root.getChild("address").getText());
			System.out.println("--------------lever:"+root.getChild("lever").getText());
			
			Hospital hos = new Hospital();
			String name = root.getChild("name").getText();
			String address = root.getChild("address").getText();
			String lever = root.getChild("lever").getText();
			String docNum = root.getChild("docNum").getText();
			String nursNum = root.getChild("nursNum").getText();
			String phoneNum = root.getChild("phoneNum").getText();
			String corporation = root.getChild("corporation").getText();
			String coors_x = root.getChild("coors_x").getText();
			String coors_y = root.getChild("coors_y").getText();
			hos.setName(name);
			hos.setAddress(address);
			hos.setLever(lever);
			hos.setDocNum(Integer.parseInt(docNum));
			hos.setNursNum(Integer.parseInt(nursNum));
			hos.setPhoneNum(phoneNum);
			hos.setCorporation(corporation);
			hos.setCoors_x(Double.valueOf(coors_x));
			hos.setCoors_y(Double.valueOf(coors_y));
			return hos;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 
	 * @param base
	 * @return
	 */
	public static String setWmtsConfig(Hospital hos){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_WMTS_CONFIG); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			
			root.removeContent(root.getChild("name"));//.removeContent(0);
			root.removeContent(root.getChild("address"));
			root.removeContent(root.getChild("lever"));
			root.removeContent(root.getChild("docNum"));
			root.removeContent(root.getChild("nursNum"));
			root.removeContent(root.getChild("phoneNum"));
			root.removeContent(root.getChild("corporation"));
			root.removeContent(root.getChild("coors_x"));
			root.removeContent(root.getChild("coors_y"));

			Element name = new Element("name");
			name.setText(hos.getName());
			Element address = new Element("address");
			address.setText(hos.getAddress());
			Element lever = new Element("lever");
			lever.setText(hos.getLever());
			Element docNum = new Element("docNum");
			docNum.setText(String.valueOf(hos.getDocNum()));
			Element nursNum = new Element("nursNum");
			nursNum.setText(String.valueOf(hos.getNursNum()));
			Element corporation = new Element("corporation");
			corporation.setText(hos.getCorporation());
			Element phoneNum = new Element("phoneNum");
			phoneNum.setText(hos.getPhoneNum());
			Element coors_x = new Element("coors_x");
			coors_x.setText(String.valueOf(hos.getCoors_x()));
			Element coors_y = new Element("coors_y");
			coors_y.setText(String.valueOf(hos.getCoors_y()));
			
			root.addContent(name);
			root.addContent(address);
			root.addContent(lever);
			root.addContent(docNum);
			root.addContent(nursNum);
			root.addContent(phoneNum);
			root.addContent(corporation);
			root.addContent(coors_x);
			root.addContent(coors_y);
			
			doc.setRootElement(root);
			//文件处理
			XMLOutputter out = new XMLOutputter();
			OutputStream tmpout = new FileOutputStream(DATA_WMTS_CONFIG);
			out.output(doc, tmpout);//new FileOutputStream(DATA_FILE_NAME));
			tmpout.close();
			return "success";

		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
    }
	/**
	 * 
	 * @param base
	 * @return
	 */
	public static String setBaseConfig(BaseConfig base){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_BASE_NAME); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			
			root.removeContent(root.getChild("name"));//.removeContent(0);
			root.removeContent(root.getChild("serverUrl"));
			root.removeContent(root.getChild("dbName"));
			root.removeContent(root.getChild("password"));
			root.removeContent(root.getChild("url"));

			Element dbUser = new Element("name");
			dbUser.setText(base.getDbUser());
			Element serverUrl = new Element("serverUrl");
			serverUrl.setText(base.getServerUrl());
			Element dbName = new Element("dbName");
			dbName.setText(base.getDbName());
			Element password = new Element("password");
			password.setText(base.getDbPassWord());
			Element dbUrl = new Element("url");
			dbUrl.setText(base.getDbUrl());
			
			root.addContent(dbUser);
			root.addContent(serverUrl);
			root.addContent(dbName);
			root.addContent(password);
			root.addContent(dbUrl);

			doc.setRootElement(root);
			//文件处理
			XMLOutputter out = new XMLOutputter();
			OutputStream tmpout = new FileOutputStream(DATA_BASE_NAME);
			out.output(doc, tmpout);//new FileOutputStream(DATA_FILE_NAME));
			tmpout.close();
			return "success";

		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
    }
	
	/**
	 * 
	 * @return
	 */
	public static LeasRent getLeacConfig(){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_LEAC_CONFIG); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			LeasRent lea = new LeasRent();
			String lanBlock = root.getChild("lanBlock").getText();
			String address = root.getChild("address").getText();
			String roomSize = root.getChild("roomSize").getText();
			String nonOcc = root.getChild("nonOcc").getText();
			String landSize = root.getChild("landSize").getText();
			String leaholder = root.getChild("leaholder").getText();
			String propertys = root.getChild("propertys").getText();
			String timLimit = root.getChild("timLimit").getText();
			String startDate = root.getChild("startDate").getText();
			String endDate = root.getChild("endDate").getText();
			String monRent = root.getChild("monRent").getText();
			String yerRent = root.getChild("yerRent").getText();
			String payType = root.getChild("payType").getText();
			String handsel = root.getChild("handsel").getText();
			String penalty = root.getChild("penalty").getText();
			String tel = root.getChild("tel").getText();
			String incExplain = root.getChild("incExplain").getText();
			String remark = root.getChild("remark").getText();
			String nextPayDate = root.getChild("nextPayDate").getText();
			String idCard = root.getChild("idCard").getText();
			String rentStatus = root.getChild("rentStatus").getText();
			String outDays = root.getChild("outDays").getText();
			String coors_x = root.getChild("coors_x").getText();
			String coors_y = root.getChild("coors_y").getText();
			
			lea.setLanBlock(lanBlock);
			lea.setAddress(address);
			lea.setRoomSize(Double.valueOf(roomSize));
			lea.setNonOcc(Double.valueOf(nonOcc));
			lea.setLandSize(Double.valueOf(landSize));
			lea.setLeaholder(leaholder);
			lea.setPropertys(propertys);
			lea.setTimLimit(timLimit);
			lea.setStartDate(startDate);
			lea.setEndDate(endDate);
			lea.setMonRent(Double.valueOf(monRent));
			lea.setYerRent(Double.valueOf(yerRent));
			lea.setPayType(payType);
			lea.setHandsel(Double.valueOf(handsel));
			lea.setPenalty(Double.valueOf(penalty));
			lea.setTel(tel);
			lea.setIncExplain(incExplain);
			lea.setRemark(remark);
			lea.setNextPayDate(nextPayDate);
			lea.setIdCard(idCard);
			lea.setRentStatus(rentStatus);
			lea.setOutDays(outDays);
			lea.setCoors_x(Double.valueOf(coors_x));
			lea.setCoors_y(Double.valueOf(coors_y));
			return lea;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 
	 * @param base
	 * @return
	 */
	public static String setLeacConfig(LeasRent lea){
		SAXBuilder sb = new SAXBuilder();
		try
		{
			InputStream input = new FileInputStream(DATA_LEAC_CONFIG); 
			Document doc = sb.build(input);
			Element root = doc.getRootElement();
			
			root.removeContent(root.getChild("lanBlock"));//.removeContent(0);
			root.removeContent(root.getChild("codNum"));
			root.removeContent(root.getChild("address"));
			root.removeContent(root.getChild("roomSize"));
			root.removeContent(root.getChild("nonOcc"));
			root.removeContent(root.getChild("landSize"));
			root.removeContent(root.getChild("leaholder"));
			root.removeContent(root.getChild("propertys"));
			root.removeContent(root.getChild("timLimit"));
			root.removeContent(root.getChild("startDate"));
			root.removeContent(root.getChild("endDate"));
			root.removeContent(root.getChild("monRent"));
			root.removeContent(root.getChild("yerRent"));
			root.removeContent(root.getChild("payType"));
			root.removeContent(root.getChild("handsel"));
			root.removeContent(root.getChild("penalty"));
			root.removeContent(root.getChild("tel"));
			root.removeContent(root.getChild("linker"));
			root.removeContent(root.getChild("incExplain"));
			root.removeContent(root.getChild("remark"));
			root.removeContent(root.getChild("nextPayDate"));
			root.removeContent(root.getChild("idCard"));
			root.removeContent(root.getChild("busLicense"));
			root.removeContent(root.getChild("orgCode"));
			root.removeContent(root.getChild("rentStatus"));
			root.removeContent(root.getChild("outDays"));
			root.removeContent(root.getChild("holdType"));
			root.removeContent(root.getChild("coors_x"));
			root.removeContent(root.getChild("coors_y"));

			Element lanBlock = new Element("lanBlock");
			lanBlock.setText(lea.getLanBlock());
			Element codNum = new Element("codNum");
			Element address = new Element("address");
			address.setText(lea.getAddress());
			Element roomSize = new Element("roomSize");
			roomSize.setText(String.valueOf(lea.getRoomSize()));
			Element nonOcc = new Element("nonOcc");
			nonOcc.setText(String.valueOf(lea.getNonOcc()));
			Element landSize = new Element("landSize");
			landSize.setText(String.valueOf(lea.getLandSize()));
			Element leaholder = new Element("leaholder");
			leaholder.setText(lea.getLeaholder());
			Element propertys = new Element("propertys");
			propertys.setText(lea.getPropertys());
			Element timLimit = new Element("timLimit");
			timLimit.setText(lea.getTimLimit());
//			Element startDate = new Element("startDate");
//			startDate.setText(lea.getStartDate());
//			Element endDate = new Element("endDate");
//			endDate.setText(lea.getEndDate());
			Element monRent = new Element("monRent");
			monRent.setText(String.valueOf(lea.getMonRent()));
			Element yerRent = new Element("yerRent");
			yerRent.setText(String.valueOf(lea.getYerRent()));
			Element payType = new Element("payType");
			payType.setText(lea.getPayType());
			Element handsel = new Element("handsel");
			handsel.setText(String.valueOf(lea.getHandsel()));
			Element penalty = new Element("penalty");
			penalty.setText(String.valueOf(lea.getPenalty()));
			Element tel = new Element("tel");
			tel.setText(lea.getTel());
			Element linker = new Element("linker");
			Element incExplain = new Element("incExplain");
			incExplain.setText(lea.getIncExplain());
			Element remark = new Element("remark");
			remark.setText(lea.getRemark());
//			Element nextPayDate = new Element("nextPayDate");
//			nextPayDate.setText(lea.getNextPayDate());
			Element idCard = new Element("idCard");
			idCard.setText(lea.getIdCard());
			Element busLicense = new Element("busLicense");
			Element orgCode = new Element("orgCode");
			Element rentStatus = new Element("rentStatus");
			rentStatus.setText(lea.getRentStatus());
			Element outDays = new Element("outDays");
			outDays.setText(lea.getOutDays());
			Element holdType = new Element("holdType");
			
			Element coors_x = new Element("coors_x");
			coors_x.setText(String.valueOf(lea.getCoors_x()));
			Element coors_y = new Element("coors_y");
			coors_y.setText(String.valueOf(lea.getCoors_y()));
			
			root.addContent(lanBlock);
			root.addContent(codNum);
			root.addContent(address);
			root.addContent(roomSize);
			root.addContent(nonOcc);
			root.addContent(landSize);
			root.addContent(leaholder);
			root.addContent(propertys);
			root.addContent(timLimit);
//			root.addContent(startDate);
//			root.addContent(endDate);
			root.addContent(monRent);
			root.addContent(yerRent);
			root.addContent(payType);
			root.addContent(handsel);
			root.addContent(penalty);
			root.addContent(tel);
			root.addContent(linker);
			root.addContent(incExplain);
			root.addContent(remark);
//			root.addContent(nextPayDate);
			root.addContent(idCard);
			root.addContent(busLicense);
			root.addContent(orgCode);
			root.addContent(rentStatus);
			root.addContent(outDays);
			root.addContent(holdType);
			root.addContent(coors_x);
			root.addContent(coors_y);
			
			doc.setRootElement(root);
			//文件处理
			XMLOutputter out = new XMLOutputter();
			OutputStream tmpout = new FileOutputStream(DATA_LEAC_CONFIG);
			out.output(doc, tmpout);//new FileOutputStream(DATA_FILE_NAME));
			tmpout.close();
			return "success";

		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
    }
}
