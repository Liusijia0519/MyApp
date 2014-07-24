package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;

import com.gary.operation.domain.SystemDepartment;

public interface SystemDepartmentMapper {

	public List<SystemDepartment> selectAllDepartment(HashMap<String, Object> param);
	
	public List<SystemDepartment> selectAvailablDepartment();
	
	public int insertOrUpdate(SystemDepartment department);
	
	public SystemDepartment selectByPrimaryKey(String id);
}
