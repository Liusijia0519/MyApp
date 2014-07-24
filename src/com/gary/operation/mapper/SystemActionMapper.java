package com.gary.operation.mapper;

import java.util.List;

import com.gary.operation.domain.SystemAction;

public interface SystemActionMapper {

	public List<SystemAction> selectActionList(String springController);
	
	public List<SystemAction> selectAllActionList();
	
	public int insert(SystemAction action);
	
	public int delete(String id);
	
	public int deleteRoleAction(String actionId);
}
