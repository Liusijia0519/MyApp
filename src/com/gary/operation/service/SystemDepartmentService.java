package com.gary.operation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.operation.domain.SystemDepartment;
import com.gary.operation.mapper.SystemDepartmentMapper;


@Service
public class SystemDepartmentService {
	
	@Autowired
	private SystemDepartmentMapper mapper;
	
	//查询所有有效部门 已树结构返回
	@Cacheable(value="SystemDepartment")
	public List<SystemDepartment> selectAvailablDepartment() {
		List<SystemDepartment> depts = mapper.selectAvailablDepartment();
		return processDepartmentTree(depts, "root");
	}
	
	@Cacheable(value="SystemDepartment", key="#parentId")
	public List<HashMap<String, Object>> getCanSelectDeptTree(String parentId) {
		List<SystemDepartment> depts = mapper.selectAvailablDepartment();
		return processTree(depts, parentId);
	}
	
	//查询部门集合 以树结构返回
	public List<SystemDepartment> getDepartmentTree() {
		List<SystemDepartment> depts = mapper.selectAllDepartment(null);
		return processDepartmentTree(depts, "root");
	}
	
	//批量新增或者编辑
	@Transactional
	public void insertOrUpdateDept(List<SystemDepartment> records) {
		for (int i = 0; i < records.size(); i++) {
			mapper.insertOrUpdate(records.get(i));
		}
	}
	
	//将部门转化为树结构
	private List<HashMap<String, Object>> processTree(List<SystemDepartment> depts, String parentID) {
		List<HashMap<String, Object>> node = new ArrayList<HashMap<String,Object>>();
		for (SystemDepartment d : depts) {
			if(parentID.equals(d.getParentId().trim())) {
				HashMap<String, Object> n = new HashMap<String, Object>();
				n.put("id", d.getId());
				n.put("text", d.getDepartmentName());
				n.put("checked", false);
				n.put("leaf", true);
				node.add(n);
			}
		}
		return node;
	}
	
	//将部门转化为树结构
	private List<SystemDepartment> processDepartmentTree(List<SystemDepartment> depts, String parentID) {
		List<SystemDepartment> node = new ArrayList<SystemDepartment>();
		for (SystemDepartment d : depts) {
			if(parentID.equals(d.getParentId().trim())) {
				node.add(d);
				if(!d.isLeaf()) {
					List<SystemDepartment> cls = processDepartmentTree(depts, d.getId());
					if(cls.isEmpty()) {
						d.setLeaf(true);
					}
					d.setChildren(cls);
				}
			}
		}
		return node;
	}
}
