package com.gary.operation.mapper;

import com.gary.operation.domain.PartnerDetail;

public interface PartnerDetailMapper {
    int deleteByPrimaryKey(String id);

    int insert(PartnerDetail record);

    int insertSelective(PartnerDetail record);

    PartnerDetail selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PartnerDetail record);

    int updateByPrimaryKey(PartnerDetail record);
}