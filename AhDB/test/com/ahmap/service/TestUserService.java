package com.ahmap.service;
import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class TestUserService {
	
	@Autowired
	private UserService userService;
	
	@Test
	public void hasMatchUser(){
		boolean b1 = userService.hasMatchUser("chentao", "123456");
		assertTrue(b1);
	}
	
//	@Test
//	public void findUseByUseName(){
//		User user = userService.findUserByUserName("chentao");
//		assertEquals(user.getUserName(), "chentao");
//	}
}
