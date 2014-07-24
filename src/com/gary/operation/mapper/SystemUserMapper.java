package com.gary.operation.mapper;

import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.domain.SystemUserRole;

public interface SystemUserMapper {
	
	public SystemUser getSystemUserByNameAndPwd(Map<String, Object> parms);
	
	public List<SystemUser> selectSystemUser(Map<String, Object> parms, PageBounds bounds);
	
	public SystemUser getSystemUserById(String id);
	
	public int insertSystemUser(SystemUser systemUser);
	
	public int updateSystemUser(SystemUser systemUser);
	
	public int updatePassword(SystemUser systemUser);
	
	public int updateState(SystemUser systemUser);
	
	public int insertUserRole(SystemUserRole userRole);
	
	public int deleteUserRole(String userId);
	
	public List<String> selectActionByUserId(String userId);

	public int selectIsHasUser(String username);
}
