package com.gary.operation.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gary.base.core.PageBounds;
import com.gary.operation.domain.Previewtrack;
public interface PreviewtrackMapper {
	public List<Previewtrack> select(Map<String, Object> parms, PageBounds bounds);
	
    int deleteByPrimaryKey(String id);

    int insert(Previewtrack record);

    int insertSelective(Previewtrack record);

    Previewtrack selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Previewtrack record);

    int updateByPrimaryKey(Previewtrack record);
    //获取该账期存在的行数,判断是否存在该账期
    int getCountByZhangqi(String zhangqi);

	public HashMap<String, Object> getTrackMapById(String trackId);

	public List<HashMap<String, Object>> getZhangqiComboByTrack();
}