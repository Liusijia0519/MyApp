package com.gary.operation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.operation.domain.SystemDictionary;
import com.gary.operation.domain.SystemDictionaryType;
import com.gary.operation.mapper.SystemDictionaryMapper;
import com.gary.operation.mapper.SystemDictionaryTypeMapper;


@Service
public class SystemDictionaryService {

	@Autowired
	private SystemDictionaryTypeMapper dictionaryTypeMapper;
	
	@Autowired
	private SystemDictionaryMapper dictionaryMapper;
	
	/**
	 * 根据字典编码清除对应字典数据缓存
	 * @param code 字典编码
	 */
	@CacheEvict(value={"SystemDictionaryCache","SystemDictionaryTreeCache"}, key="#code")
	public void evictSystemDictionaryCache(String code) {
		
	}
	
	/**
	 * 查询有效树形字典
	 * @param code 字典编码
	 * @return 字典数据集
	 */
	@Cacheable(value="SystemDictionaryTreeCache", key="#code")
	public List<SystemDictionary> selectAvailablTreeByCode(String code) {
		List<SystemDictionary> list = dictionaryMapper.selectAvailablDictionaryByCode(code);
		processLevel(list);
		return processTree(list, "root");
	}
	
	/**
	 * 查询有效普通字典
	 * @param code 字典编码
	 * @return 字典数据集
	 */
	@Cacheable(value="SystemDictionaryCache", key="#code")
	public List<SystemDictionary> selectAvailablComboByCode(String code) {
		List<SystemDictionary> list = dictionaryMapper.selectAvailablDictionaryByCode(code);
		processLevel(list);
		return list;
	}
	
	/**
	 * 把字典的level附加上
	 * @param list 字典集合
	 * @return void
	 */
	private void processLevel(List<SystemDictionary> list )
	{
		for(int i=1;i<=20;i++){  //处理10次，10级，够了。
				for (SystemDictionary d : list) {
					//if (d.getLevel()>0) continue; //无需处理的跳过
					if (d.getParentId().equals("root"))
					{
					   d.setLevel(1);
					 
					}
					else
						
					{
						for (SystemDictionary d2 : list) {
							if (d2.getId().equals(d.getParentId()))
							{
						        SystemDictionary parent =d2; //找爸爸
								if (parent.getLevel()>=1)
								{
									 d.setLevel(parent.getLevel()+1);
								}
							}
						}
					}
			
				}
		}
	}
	
	/**
	 * 查询所有字典类别集合
	 * @return 字典类别数据集
	 */
	public List<SystemDictionaryType> selectDictionaryType() {
		return dictionaryTypeMapper.selectDictionaryType();
	}
	
	/**
	 * 根据字典编码查询树形字典
	 * @param code 字典编码
	 * @return 字典数据集
	 */
	public List<SystemDictionary> selectDictionaryTreeByCode(String code) {
		List<SystemDictionary> list = dictionaryMapper.selectDictionaryByCode(code);
		return processTree(list, "root");
	}
	
	/**
	 * 查询全部普通字典
	 * @param code 字典编码
	 * @return 字典数据集
	 */
	public List<SystemDictionary> selectDictionaryComboByCode(String code) {
		List<SystemDictionary> list = dictionaryMapper.selectDictionaryByCode(code);
		return list;
	}
	
	/**
	 * 批量新增编辑字典数据
	 * @param records 字典数据集合
	 * @Transactional 开启事物
	 */
	@Transactional
	public void insertOrUpdateDictionary(List<SystemDictionary> records) {
		for (int i = 0; i < records.size(); i++) {
			dictionaryMapper.insertOrUpdateDictionary(records.get(i));
		}
	}
	
	
	/**
	 * 将字典结果集转换为树形结构
	 * @param list
	 * @param parentId
	 * @return 转换后的结果集
	 */
	private List<SystemDictionary> processTree(List<SystemDictionary> list, String parentId) {
		List<SystemDictionary> node = new ArrayList<SystemDictionary>();
		for (SystemDictionary d : list) {
			if(parentId.equals(d.getParentId().trim())) {
				node.add(d);
				if(!d.isLeaf()) {
					List<SystemDictionary> cls = processTree(list, d.getId());
					if(cls.isEmpty()) {
						d.setLeaf(true);
					}
					d.setChildren(cls);
				}
			}
		}
		return node;
	}
	
	

 
	//参数：文章分类ID或文本
	//返回：递归返回本分类及子孙分类的树形集合。
	//lyh add
	public SystemDictionary selectCategorysDeepTree(String categoryID) {
		List<SystemDictionary> list =  ((SystemDictionaryService)AopContext.currentProxy()).selectAvailablTreeByCode("ArticleCategory");
		for (SystemDictionary d : list) {
			if (d.getId().equals(categoryID) || d.getText().equals(categoryID))
			{
				return d;
			}
			SystemDictionary result = selectCategorysTree_doing(d,categoryID);
			if (result!=null) 
				return result;
			else
				continue;
		}	
		return null;
	}
	//递归子函数
	private SystemDictionary  selectCategorysTree_doing(SystemDictionary node, String categoryID)
	{
		if (node.getId().equals(categoryID) || node.getText().equals(categoryID)) return node;
		for (SystemDictionary d : node.getChildren()) {
			if (d.getId().equals(categoryID) || d.getText().equals(categoryID))
			{
				return d;
			}
			SystemDictionary result = selectCategorysTree_doing(d,categoryID);
			if (result!=null) 
				return result;
			else
				continue;
		}
		return null;
	}
	
	
	
	//参数：categoryID
	//返回：父的categoryID
	//lyh add
	public String selectFatherCategoryID(String categoryID) {
		if (categoryID.equals("root")) return "root";
		List<SystemDictionary> list =  ((SystemDictionaryService)AopContext.currentProxy()).selectAvailablComboByCode("ArticleCategory"); //普通列表
		for (SystemDictionary d : list) {
			if (d.getId().equals(categoryID) || d.getText().equals(categoryID))
			{
					return d.getParentId();				
			}
		}	
		return null;
	}
 
	//参数：categoryID
	//返回：祖宗的categoryID,即father为root的那一级的ID
	//lyh add
	public String selectTopLevelCategoryID(String categoryID) {
		String _id=categoryID;
		for(int i=1;i<=100;i++){
			String _id2 = selectFatherCategoryID(_id);
		    if (_id2.equals("root"))
		    {
		    	return _id;
		    }
		    else
		    	_id = _id2;
		}
		return null;
//		String _id2 = selectFatherCategoryID(categoryID);
//	    if (_id2=="root")
//	    {
//	    	return categoryID;
//	    }
//		return selectTopLevelCategoryID(_id2);
	}
 
	//返回的文章分类对象是简单形不是树形
	public SystemDictionary getSimpleCategoryByID(String categoryID)
	{
		List<SystemDictionary> list =  ((SystemDictionaryService)AopContext.currentProxy()).selectAvailablComboByCode("ArticleCategory"); //普通列表
		for (SystemDictionary d : list) {
			if (d.getId().equals(categoryID) || d.getText().equals(categoryID))
			{
				return d;
			}
		}
		return null;
	}
	
	//传入一个节点，返回其儿子节点的第一个有效的叶子 Lyh added
	public SystemDictionary getFirstSonCategoryID(String categoryID)
	{
		SystemDictionary node = getSimpleCategoryByID(categoryID);
		List<SystemDictionary> list =  ((SystemDictionaryService)AopContext.currentProxy()).selectAvailablComboByCode("ArticleCategory"); //普通列表
		for (SystemDictionary d : list) {
			if (d.getParentId().equals(node.getId()))
			{
				return d;
			}
		}
		return null;
	}
	
	
	//传入一个节点，返回其子孙节点的第一个有效的叶子 Lyh added
	public SystemDictionary getFirstLeafCategoryID(String categoryID)
	{
		SystemDictionary _node =getSimpleCategoryByID(categoryID);
    	SystemDictionary _node2 = null;
    	String catid = categoryID;
    	if (_node.isLeaf()) return _node;
		for(int i=1;i<=30;i++){
			_node2 = getFirstSonCategoryID(catid);
			if (_node2==null)  //已经没有儿子了，把_node返回。
			{
				return _node;
			}
			else
			{
				catid = _node2.getId();
				_node = _node2;
			}
		}
		return null;
	}
	
	
	//参数：当前categoryID
	//返回：父的categoryID
	//lyh add
	public List<SystemDictionary> selectSuperInLine(String categoryID) {
		
		int inlevel = getSimpleCategoryByID(categoryID).getLevel(); //传入节点的级别
		String _id = categoryID;
		if (inlevel==4 || inlevel==3)
			_id = categoryID;
		else 
		{
			SystemDictionary leaf = getFirstLeafCategoryID(categoryID); //找叶子
			if (leaf.getLevel()==4)  //传入的是祖辈，当前有效级自动定位到3级，不是4级
				_id = leaf.getParentId();
			else
				_id = leaf.getId();
		}
			
			
		List<SystemDictionary> list = new ArrayList<SystemDictionary>();
		
		list.add(getSimpleCategoryByID(_id));
		
		for(int i=1;i<=100;i++){
			String _id2 = selectFatherCategoryID(_id);
		    if (_id2.equals("root"))
		    {
		    	return list;
		    }
		    else
		    {
		    	
		    	list.add(getSimpleCategoryByID(_id2));
		    
		    	_id = _id2;
		    }
	   }
		
		return list;
	}
	//参数：当前categoryID
	//返回selectSuperInLine排序后的集合
	public List<SystemDictionary> selectSuperInLineOrder(String categoryID) {
		List<SystemDictionary> list = selectSuperInLine(categoryID);
		List<SystemDictionary> Orderlist=new ArrayList<SystemDictionary>(); ;
		for(int i=list.size()-1;i<=list.size()-1 && i>=0;i--){
			
			Orderlist.add(list.get(i));
		}
		
		return Orderlist;
	}
	
}
