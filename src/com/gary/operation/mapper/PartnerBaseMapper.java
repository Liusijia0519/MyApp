package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.PartnerBase;

public interface PartnerBaseMapper {
	public List<PartnerBase> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(PartnerBase record);

    int insertSelective(PartnerBase record);

    PartnerBase selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PartnerBase record);

    int updateByPrimaryKey(PartnerBase record);

	public List<PartnerBase> selectAllUserPayratio();

	public HashMap<String, Object> getPartnerMap(String trackId);
	
	public List<HashMap<String, Object>> getChannelIDByUserID(String userid);
}