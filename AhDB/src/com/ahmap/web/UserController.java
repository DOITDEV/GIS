package com.ahmap.web;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ahmap.domain.User;
import com.ahmap.domain.UserClass;
import com.ahmap.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController{
	
	@Autowired
	private UserService userService;
	 
	@RequestMapping("/getAllUser")  
	public @ResponseBody List<User> getAllUser() throws Exception
    {   
		List<User> userList = userService.getAllUser();
		return userList;
	} 
	
	@RequestMapping("/getAllUserClass")  
	public @ResponseBody List<UserClass> getAllUserClass(){   
		List<UserClass> userList = userService.getAllUserClass();
		return userList;
	} 
	
	/**
	 * 登录判断
	 * @param userName
	 * @param password
	 * @return
	 */
	@RequestMapping("/hasUser")  
	public @ResponseBody  String hasUser(HttpServletRequest request,String userName, String password) {
		HttpSession session = request.getSession();
		User dbUser = userService.findUserByName(userName);
//		if (dbUser == null) {
//			return "false";//"用户名或密码错误"; "用户名不存在
//		} else if (!dbUser.getPassword().equals(password)) {
//			return "false";//mav.addObject("errorMsg", "用户密码不正确");
//		} 
		if(!userService.hasMatchUser(userName, password))
		{
			return "false";
		}
		else{
			//写入session
			if(session.getAttribute("user")==null)
			{
				session.setAttribute("test", "ddd");
				session.setAttribute("user", userName);
				session.setAttribute("userType", dbUser.getUserType());
			}
			else
			{
				session.removeAttribute("user");
				session.setAttribute("user", userName);
				session.setAttribute("userType", dbUser.getUserType());
			}
			return String.valueOf(dbUser.getUserType());
		}
	}
	
	/**
	 * 用户注销
	 * @return
	 */
	@RequestMapping("/loginOut")  
	public @ResponseBody  String loginOut(HttpServletRequest request) {
		HttpSession session = request.getSession();
			if(session.getAttribute("user")!=null)
			{
				//添加用户退出日志
				//userService.logOut(session.getAttribute("user").toString(), Integer.parseInt(session.getAttribute("userType").toString()));
				session.removeAttribute("user");
				session.removeAttribute("userType");
				return "true";
			}
			else
			{
				return "true";
			}
	}
	
	
	@RequestMapping("/getUserByName")  
	public @ResponseBody User getUserByName(HttpServletRequest request,@RequestParam("userName")String userName){
		User user = userService.findUserByName(request.getParameter("userName"));
		return user;
	} 
	
	@RequestMapping("/getAllUserByClass")  
	public @ResponseBody List<User> getAllUserByClass(HttpServletRequest request,@RequestParam("userClass")String userClass){   
		List<User> userList = userService.findUserByClass(request.getParameter("userClass"));
		return userList;
	} 
	
	@RequestMapping("/addUser")  
	public @ResponseBody  String addUser(HttpEntity<User> requestEntity) throws UnsupportedEncodingException{ 
		 User user = requestEntity.getBody(); 
		 String temp_str="";  
		 Date dt = new Date();  
		 user.setCreateTime(dt);     
		 System.out.println(user.getDepart());
		 return	 userService.addUser(user); 
	} 
	
	@RequestMapping("/deleteUser")  
	public  @ResponseBody String deleteUser(HttpServletRequest request,@RequestParam("userName")String userName){   
		System.out.println(request.getParameter("userName"));
		userService.deleteUser(request.getParameter("userName"));
		return "success";
	} 
	
	@RequestMapping("/updateUser")  
	public  @ResponseBody String updateUser(HttpEntity<User> requestEntity){    
		User user = requestEntity.getBody(); 
		userService.updateUser(user);
		return "success";
	}
	
}
