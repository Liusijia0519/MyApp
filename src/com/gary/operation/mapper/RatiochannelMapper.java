package com.gary.operation.mapper;

import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.Ratiochannel;

public interface RatiochannelMapper {
	public List<Ratiochannel> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);
    
    int deleteByChannelID(String channelid);

    int insert(Ratiochannel record);

    int insertSelective(Ratiochannel record);

    Ratiochannel selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Ratiochannel record);

    int updateByPrimaryKey(Ratiochannel record);
}