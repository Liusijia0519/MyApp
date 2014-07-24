package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.PrmCatalog;

public interface PrmCatalogMapper {
	public List<PrmCatalog> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(PrmCatalog record);

    int insertSelective(PrmCatalog record);

    PrmCatalog selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PrmCatalog record);

    int updateByPrimaryKey(PrmCatalog record);

	int deleteByZhangqi(String zhangqi);

	public List<HashMap<String, Object>> getZhangqiCombo();
}