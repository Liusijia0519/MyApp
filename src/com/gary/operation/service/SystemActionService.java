package com.gary.operation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.base.interceptor.RightsKey;
import com.gary.operation.domain.SystemAction;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.mapper.SystemActionMapper;
import com.gary.operation.mapper.SystemMenuMapper;

@Service
public class SystemActionService {

	@Autowired
	private SystemActionMapper actionMapper;
	
	@Autowired
	private SystemMenuMapper menuMapper;
	
	//查询系统需要权限验证的操作  结果被缓存
	@Cacheable(value="SystemActionCache")
	public Map<RightsKey, SystemAction> getRightsMap() {
		List<SystemAction> actionlist = actionMapper.selectAllActionList();
		Map<RightsKey, SystemAction> rightsMap = new HashMap<RightsKey, SystemAction>();
		for (SystemAction ac : actionlist) {
			RightsKey key = new RightsKey();
			key.setSpringController(ac.getSpringController());
			key.setMethodName(ac.getMethodName());
			rightsMap.put(key, ac);
		}
		return rightsMap;
	}
	
	//查询所有托管权限
	public List<SystemAction> selectActionList(String springController) {
		return actionMapper.selectActionList(springController);
	}
	
	//新增或编辑
	@Transactional
	@CacheEvict(value="SystemActionCache",allEntries=true)
	public void insertOrUpdate(List<SystemAction> records) {
		for (SystemAction systemAction : records) {
			if(systemAction.isChecked()) {
				actionMapper.insert(systemAction);
			} else {
				//删除System_Action表
				actionMapper.delete(systemAction.getId());
				//同时删除System_Role_Action表
				actionMapper.deleteRoleAction(systemAction.getId());
			}
		}
	}
	
	//根据ID查询菜单实体
	public SystemMenu selectMenuById(String id) {
		return menuMapper.selectMenuById(id);
	}
	
	//查询菜单树
	public List<HashMap<String, Object>> selectSystemMenuTree(String node) {
		List<SystemMenu> menulist = menuMapper.selectSystemMenu();
		return processMenu(menulist, node);
	}
	
	//转换为树结构
	private List<HashMap<String, Object>> processMenu(List<SystemMenu> menus, String parentId) {
		List<HashMap<String, Object>> node = new ArrayList<HashMap<String, Object>>();
		for (SystemMenu m : menus) {
			if(parentId.equals(m.getParentId().trim())) {
				HashMap<String, Object> n = new HashMap<String, Object>();
				n.put("id", m.getId());
				n.put("text", m.getMenuName());
				n.put("springController", m.getSpringController());
				node.add(n);
				if(!m.isLeaf()) {
					List<HashMap<String, Object>> cls = processMenu(menus, m.getId());
					n.put("children", cls);
				}
			}
		}
		return node;
	}
}
