package com.gary.operation.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.base.core.PageBounds;
import com.gary.base.system.SystemException;
import com.gary.base.system.SystemResource;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.operation.domain.PartnerBase;
import com.gary.operation.domain.PartnerDetail;
import com.gary.operation.domain.Ratiochannel;
import com.gary.operation.domain.SystemUser;
import com.gary.operation.domain.SystemUserRole;
import com.gary.operation.mapper.PartnerBaseMapper;
import com.gary.operation.mapper.PartnerDetailMapper;
import com.gary.operation.mapper.RatiochannelMapper;
import com.gary.operation.mapper.SystemUserMapper;

@Service
public class PartnerService {
	@Autowired
	private PartnerBaseMapper partnerbasemapper;
	@Autowired
	private PartnerDetailMapper partnerdetailmapper;
	@Autowired
	private RatiochannelMapper ratiochannelmapper;
	@Autowired
	private SystemUserMapper userMapper;
	
	public DataAndTotal select(Map<String, Object> searchParam, GridParameter param) {
		Object list = partnerbasemapper.select(searchParam, param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}
	public DataAndTotal selectRatiochannel(Map<String, Object> searchParam, GridParameter param) {
		Object list = ratiochannelmapper.select(searchParam, param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}
	@Transactional
	public void insertOrUpdate(PartnerBase record) {
		int result = 0;

		if(!StringUtils.isNotEmpty(record.getId())) {
			String id = UUID.randomUUID().toString();
			record.setId(id);
			//record.setChannelid(UUID.randomUUID().toString());
			result = partnerbasemapper.insert(record);
			//在从表里面也插入一行,更新从表时只需要update就可以了
			PartnerDetail pd = new PartnerDetail();
			pd.setId(id);
			result = partnerdetailmapper.insert(pd);
			
		} else {
			result = partnerbasemapper.updateByPrimaryKeySelective(record);
		}
		
		if(result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}
	
	public void updateDetail(PartnerDetail record) {
		int result = 0;

		if(!StringUtils.isNotEmpty(record.getId().toString())) {
			throw new SystemException("数据保存失败");
		} else {
			result = partnerdetailmapper.updateByPrimaryKeySelective(record);
		}
		
		if(result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}
	
	public Object getPartnerDetailById(String id) {
		return partnerdetailmapper.selectByPrimaryKey(id);
	}
	
	public Object getPartnerBaseById(String id) {
		return partnerbasemapper.selectByPrimaryKey(id);
	}
	/**
	 * 删除合作伙伴(三张表)
	 * @param id
	 * @param channelid
	 * @return
	 */
	@Transactional
	public int deletePartnerByPrimaryKey(String id, String channelid) {
		int a = partnerbasemapper.deleteByPrimaryKey(id);
		int b = partnerdetailmapper.deleteByPrimaryKey(id);
		int c = ratiochannelmapper.deleteByChannelID(channelid);
		return a+b+c;
	}
	
	public int deleteChannelByPrimaryKey(String id) {
		return ratiochannelmapper.deleteByPrimaryKey(id);
	}
	@Transactional
	public int insertOrUpdateChannel(List<Ratiochannel> paramList) {
		int result = 0;
		for (Ratiochannel ratiochannel : paramList) {
			if(!StringUtils.isNotEmpty(ratiochannel.getId().toString())) {
				ratiochannel.setId(UUID.randomUUID().toString());
				result = ratiochannelmapper.insert(ratiochannel);								
			} else {
				result = ratiochannelmapper.updateByPrimaryKeySelective(ratiochannel);
			}
		}
		return result;
	}
	//新增用户
	@Transactional
	public void insertSystemUser(SystemUser systemUser) {
		int result = 0;
		result = userMapper.insertSystemUser(systemUser);
		//删除角色
		userMapper.deleteUserRole(systemUser.getId());
		//重新绑定角色
		for (int i = 0; i < systemUser.getRoles().length; i++) {
			SystemUserRole userRole = new SystemUserRole();
			userRole.setId(UUID.randomUUID().toString());
			userRole.setUser_id(systemUser.getId());
			userRole.setRole_id(systemUser.getRoles()[i]);
			userMapper.insertUserRole(userRole);
		}
		
		if(result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}
	/**
	 * 获取所有合作伙伴的结算率map<key=Channelid,val=Payratio>
	 * @return
	 */
	public HashMap<String, BigDecimal> getAllUserPayratio() {
		List<PartnerBase> list = partnerbasemapper.selectAllUserPayratio();
		if(list.size()==0){
			throw new SystemException("未获取到patnerbase表的数据");
		}
		HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();
		for (PartnerBase partnerBase : list) {
			map.put(partnerBase.getChannelid(), partnerBase.getPayratio());
		}
		return map;
	}
}
