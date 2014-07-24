package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.Previewresult;

public interface PreviewresultMapper {
	public List<Previewresult> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(Previewresult record);

    int insertSelective(Previewresult record);

    Previewresult selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Previewresult record);

    int updateByPrimaryKey(Previewresult record);

	public List<Previewresult> getResultMapList(String trackId);

	public List<Previewresult> getAllAppMoneyByZhangqi(String zhangqi);
}