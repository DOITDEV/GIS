package com.ahmap.service;

import java.text.ParseException;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Service;

@Service
public class UpdateJobService extends QuartzJobBean {

	
	private static LeasRentService leasRentService=null;
	
	public static LeasRentService getinstance(){
		if(leasRentService==null){
			leasRentService=new LeasRentService();
		}
		return leasRentService;
	}

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		try {
			getinstance().updateLimitDays();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
