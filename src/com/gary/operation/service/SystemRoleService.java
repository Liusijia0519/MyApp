package com.gary.operation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.operation.domain.SystemAction;
import com.gary.operation.domain.SystemMenu;
import com.gary.operation.domain.SystemRole;
import com.gary.operation.domain.SystemRoleAction;
import com.gary.operation.domain.SystemRoleMenu;
import com.gary.operation.mapper.SystemActionMapper;
import com.gary.operation.mapper.SystemMenuMapper;
import com.gary.operation.mapper.SystemRoleMapper;


@Service
public class SystemRoleService {

	@Autowired
	private SystemRoleMapper roleMapper;
	
	@Autowired
	private SystemMenuMapper menuMapper;
	
	@Autowired
	private SystemActionMapper actionMapper;
	
	//查询全部角色
	public List<SystemRole> selectSystemRole() {
		return roleMapper.selectSystemRole(null);
	}
	
	//新增或修改角色
	@Transactional
	public void insertOrUpdate(List<SystemRole> records) {
		for (SystemRole systemRole : records) {
			roleMapper.insertOrUpdate(systemRole);
		}
	}
	
	//查询菜单下的操作集合
	public List<HashMap<String, Object>> selectSystemActionTree(String node, String roleId) {
		List<String> actionIds = roleMapper.selectActionIdListByRoleId(roleId);
		SystemMenu menu = menuMapper.selectMenuById(node);
		List<SystemAction> actions = actionMapper.selectActionList(menu.getSpringController());
		List<HashMap<String, Object>> actionMap = new ArrayList<HashMap<String,Object>>();
		for (SystemAction ac : actions) {
			for (int i = 0; i < actionIds.size(); i++) {
				String actionId = actionIds.get(i);
				if(ac.getId().equals(actionId)) {
					ac.setUsed(true);
					actionIds.remove(i);
					break;
				}
			}
			HashMap<String, Object> am = new HashMap<String, Object>();
			am.put("id", ac.getId());
			am.put("text", ac.getDescription());
			am.put("methodName", ac.getMethodName());
			am.put("springController", ac.getSpringController());
			am.put("leaf", true);
			am.put("iconCls", "action-toothed-16");
			am.put("nodeType", "action");
			am.put("checked", ac.isUsed());
			actionMap.add(am);
		}
		return actionMap;
	}
	
	//查询菜单树
	public List<HashMap<String, Object>> selectSystemMenuTree(String node, String roleId) {
		List<SystemMenu> menulist = menuMapper.selectSystemMenu();
		List<String> menuIds = roleMapper.selectMenuIdListByRoleId(roleId);
		for (SystemMenu m : menulist) {
			for (int i = 0; i < menuIds.size(); i++) {
				String menuId = menuIds.get(i);
				if(m.getId().equals(menuId)) {
					m.setUsed(true);
					menuIds.remove(i);
					break;
				}
			}
		}
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
				n.put("checked", m.isUsed());
				n.put("nodeType", "menu");
				node.add(n);
				if(!m.isLeaf()) {
					List<HashMap<String, Object>> cls = processMenu(menus, m.getId());
					n.put("children", cls);
				}
			}
		}
		return node;
	}
	
	//批量保存权限菜单与操作
	@SuppressWarnings("rawtypes")
	@Transactional
	public void saveMenuAction(List<HashMap> records, String roleId) {
		for (int i = 0; i < records.size(); i++) {
			HashMap binder = records.get(i);
			boolean checked = Boolean.valueOf(binder.get("checked").toString());
			if(binder.get("nodeType").equals("action")) {
				SystemRoleAction action = new SystemRoleAction();
				action.setId(UUID.randomUUID().toString());
				action.setRole_id(roleId);
				action.setAction_id(binder.get("id").toString());
				if(checked) {
					roleMapper.insertRoleAction(action);
				} else {
					roleMapper.deleteRoleAction(action);
				}
			} else if(binder.get("nodeType").equals("menu")) {
				SystemRoleMenu menu = new SystemRoleMenu();
				menu.setId(UUID.randomUUID().toString());
				menu.setRole_id(roleId);
				menu.setMenu_id(binder.get("id").toString());
				if(checked) {
					roleMapper.insertRoleMenu(menu);
				} else {
					roleMapper.deleteRoleMenu(menu);
				}
			}
		}
	}
	
	//删除角色,菜单角色表,操作权限角色表,用户角色表
	@Transactional
	public void deleteRole(String roleId) {
		roleMapper.deleteRoleById(roleId);
		roleMapper.deleteRoleMenuByRoleId(roleId);
		roleMapper.deleteRoleActionByRoleId(roleId);
		roleMapper.deleteRoleUserByRoleId(roleId);
	}
	
}
