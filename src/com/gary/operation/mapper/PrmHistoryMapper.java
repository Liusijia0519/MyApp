package com.gary.operation.mapper;

import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.PrmHistory;

public interface PrmHistoryMapper {
	public List<PrmHistory> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(PrmHistory record);

    int insertSelective(PrmHistory record);

    PrmHistory selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PrmHistory record);

    int updateByPrimaryKey(PrmHistory record);

	int deleteByZhangqi(String zhangqi);

	public List<PrmHistory> getProvinceMoney(String zhangqi);
}