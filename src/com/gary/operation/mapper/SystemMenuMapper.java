package com.gary.operation.mapper;

import java.util.List;

import com.gary.operation.domain.SystemMenu;

public interface SystemMenuMapper {

	public List<SystemMenu> selectSystemMenu();
	
	public List<SystemMenu> selectSystemMenuByUserId(String user_id);
	
	public SystemMenu selectMenuById(String id);
	
	public int insertOrUpdateMenu(SystemMenu menu);
}
