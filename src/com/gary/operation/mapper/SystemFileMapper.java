package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.SystemFile;

public interface SystemFileMapper {
	public List<SystemFile> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(SystemFile record);

    int insertSelective(SystemFile record);

    SystemFile selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SystemFile record);

    int updateByPrimaryKeyWithBLOBs(SystemFile record);

    int updateByPrimaryKey(SystemFile record);
}