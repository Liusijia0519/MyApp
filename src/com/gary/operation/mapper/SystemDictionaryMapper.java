package com.gary.operation.mapper;

import java.util.List;

import com.gary.operation.domain.SystemDictionary;

public interface SystemDictionaryMapper {

	public List<SystemDictionary> selectDictionaryByCode(String dictionaryTypeCode);
	
	public List<SystemDictionary> selectAvailablDictionaryByCode(String dictionaryTypeCode);
	
	public int insertOrUpdateDictionary(SystemDictionary dictionary);
}
