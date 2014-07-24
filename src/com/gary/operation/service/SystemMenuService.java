package com.gary.operation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.operation.domain.SystemMenu;
import com.gary.operation.mapper.SystemMenuMapper;


@Service
public class SystemMenuService {

	@Autowired
	private SystemMenuMapper mapper;
	
	public List<SystemMenu> selectSystemMenuTree() {
		List<SystemMenu> menus = mapper.selectSystemMenu();
		return processMenu(menus, "root");
	}
	
	@Transactional
	@CacheEvict(value="SystemMenuCache", allEntries=true)
	public void insertOrUpdateMenu(List<SystemMenu> records) {
		for (int i = 0; i < records.size(); i++) {
			mapper.insertOrUpdateMenu(records.get(i));
		}
	}
	
	/**
	 * 将菜单转换为树形结构
	 * @param menus
	 * @param parentId
	 * @return
	 */
	private List<SystemMenu> processMenu(List<SystemMenu> menus, String parentId) {
		List<SystemMenu> node = new ArrayList<SystemMenu>();
		for (SystemMenu m : menus) {
			if(parentId.equals(m.getParentId().trim())) {
				node.add(m);
				if(!m.isLeaf()) {
					List<SystemMenu> cls = processMenu(menus, m.getId());
					if(cls.isEmpty()) {
						m.setLeaf(true);
					}
					m.setChildren(cls);
				}
			}
		}
		return node;
	}
}
