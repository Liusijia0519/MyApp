package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;

import com.gary.operation.domain.CdrHistory;

public interface CdrHistoryMapper {
	public List<HashMap<String, Object>> selectZhangqiCombo();
	
	int deleteByPrimaryKey(Integer id);

    int insert(CdrHistory record);

    int insertSelective(CdrHistory record);

    CdrHistory selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CdrHistory record);

    int updateByPrimaryKey(CdrHistory record);

	public List<CdrHistory> getDataByZhangqi(String zhangqi);

	public List<CdrHistory> getAppAndLocation(String zhangqi);

	public List<CdrHistory> getLocationTotalFee(String zhangqi);
}