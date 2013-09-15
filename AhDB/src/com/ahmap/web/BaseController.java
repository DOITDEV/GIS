package com.ahmap.web;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahmap.base.ReadXml;
import com.ahmap.cons.CommonConstant;
import com.ahmap.domain.BaseConfig;
import com.ahmap.domain.Hospital;
import com.ahmap.domain.LeaContract;
import com.ahmap.domain.User;

	@Controller
	@RequestMapping("/Config")
	public class BaseController {
		protected static final String ERROR_MSG_KEY = "errorMsg";

		/**
		 * 获取保存在Session中的用户对象
		 * 
		 * @param request
		 * @return
		 */
		protected User getSessionUser(HttpServletRequest request) {
			return (User) request.getSession().getAttribute(
					CommonConstant.USER_CONTEXT);
		}
		/**
		 * 保存用户对象到Session中
		 * @param request
		 * @param user
		 */
		protected void setSessionUser(HttpServletRequest request,User user) {
			request.getSession().setAttribute(CommonConstant.USER_CONTEXT,
					user);
		}
		
		/**
		 * 获取基于应用程序的url绝对路径
		 * 
		 * @param request
		 * @param url
		 *            以"/"打头的URL地址
		 * @return 基于应用程序的url绝对路径
		 */
		public final String getAppbaseUrl(HttpServletRequest request, String url) {
			Assert.hasLength(url, "url不能为空");
			Assert.isTrue(url.startsWith("/"), "必须以/打头");
			return request.getContextPath() + url;
		}
		 
		@RequestMapping("/getWmtsConfig")
		public @ResponseBody Hospital getWmtsConfig(){   
			Hospital hos = ReadXml.getWmtsConfig();
			return hos;
		} 
		 
		@RequestMapping("/setWmtsConfig")
		public @ResponseBody String setWmtsConfig(HttpEntity<Hospital> hos) 
		{
			return ReadXml.setWmtsConfig((Hospital) hos.getBody());
		} 
		//flzhao
		@RequestMapping("/getLeaConConfig")
		public @ResponseBody LeaContract getLeaConConfig(){   
			LeaContract lea = ReadXml.getLeacConfig();
			return lea;
		} 
		 
		@RequestMapping("/setLeaConConfig")
		public @ResponseBody String setLeaConConfig(HttpEntity<LeaContract> lea) 
		{
			return ReadXml.setLeacConfig((LeaContract) lea.getBody());
		} 
		
}
