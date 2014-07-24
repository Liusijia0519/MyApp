package com.gary.operation.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aspose.cells.Cell;
import com.aspose.cells.Row;
import com.aspose.cells.RowCollection;
import com.gary.base.system.SystemException;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.operation.domain.PrmCatalog;
import com.gary.operation.domain.PrmHistory;
import com.gary.operation.mapper.PrmHistoryMapper;
import com.gary.operation.mapper.PrmCatalogMapper;

;;

@Service
public class PrmService {
	@Autowired
	private PrmHistoryMapper prmhistorymapper;
	@Autowired
	private PrmCatalogMapper prmcatalogmapper;

	public DataAndTotal select(Map<String, Object> searchParam,
			GridParameter param) {
		Object list = prmhistorymapper.select(searchParam,
				param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}
	public DataAndTotal selectPrmCatalog(Map<String, Object> searchParam,
			GridParameter param) {
		Object list = prmcatalogmapper.select(searchParam,
				param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}

	// 插入或者更新PrmCatalog
	public void insertOrUpdate(PrmCatalog record) {
		int result = 0;

		if (!StringUtils.isNotEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			// record.setCreatetime(new Date());
			// record.setCreateuser(SystemResource.getSystemUser().getRealName());
			result = prmcatalogmapper.insert(record);
		} else {
			result = prmcatalogmapper.updateByPrimaryKeySelective(record);
		}

		if (result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}

	// 插入或者更新PrmHistory
	public void insertOrUpdateHistory(PrmHistory record) {
		int result = 0;

		if (!StringUtils.isNotEmpty(record.getId())) {
			record.setId(UUID.randomUUID().toString());
			// record.setCreatetime(new Date());
			// record.setCreateuser(SystemResource.getSystemUser().getRealName());
			result = prmhistorymapper.insert(record);
		} else {
			result = prmhistorymapper.updateByPrimaryKeySelective(record);
		}

		if (result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}

	/**
	 * 获取需要统计的数据(每个省的每条数据)
	 * 
	 * @param collection
	 *            excel的行集合
	 * @param zhangqi
	 *            账期,因为账期一样,所以传进来
	 * @return list
	 */
	public List<PrmHistory> getExcelData(RowCollection collection,
			String zhangqi) {
		// 存放取出来的数据
		List<PrmHistory> list = new ArrayList<PrmHistory>();
		// i=7 是从第8行开始循环
		for (int i = 7; i < collection.getCount(); i++) {
			Row row = collection.get(i);
			// 有几列就拿几列 然后放入到一个List当中
			Cell province = row.get(0);// 省份
			Cell AmountReceivable = row.get(2);// 应收
			Cell AmountReceived = row.get(12);// 实收

			PrmHistory a = new PrmHistory();
			// 账期都一样
			a.setPid(zhangqi);
			// 省份
			a.setProvince(province.getValue().toString());
			// 应收
			a.setAmountreceivable(doubleToBigDecimal(AmountReceivable
					.getDoubleValue()));
			// 实收
			a.setAmountreceived(doubleToBigDecimal(AmountReceived
					.getDoubleValue()));
			list.add(a);
		}
		return list;
	}
	/**
	 * 把list里面的每条数据按省份分组,同时把应收金额和实收金额累加
	 * @param list每个省的每条数据的集合
	 * @param zhangqi 账期(写死传进来)
	 * @return 按省份分组后的实体key=省份,val=实体
	 */
	public HashMap<String,PrmHistory> listToMap(List<PrmHistory> list,String zhangqi){
		HashMap<String,PrmHistory> map=new HashMap<String,PrmHistory>();
		for (PrmHistory r : list) {
			if (map.containsKey(r.getProvince())) {
				PrmHistory ph=map.get(r.getProvince());
				//累加应收
				BigDecimal b1 = new BigDecimal(ph.getAmountreceivable().add(r.getAmountreceivable()).doubleValue());
				ph.setAmountreceivable(b1);
				//累加实收
				BigDecimal b2 = new BigDecimal(ph.getAmountreceived().add(r.getAmountreceived()).doubleValue());
				ph.setAmountreceived(b2);
			} else {
				PrmHistory ph=new PrmHistory();
				//累加应收
				BigDecimal b1 = new BigDecimal(ph.getAmountreceivable().add(r.getAmountreceivable()).doubleValue());
				ph.setAmountreceivable(b1);
				//累加实收
				BigDecimal b2 = new BigDecimal(ph.getAmountreceived().add(r.getAmountreceived()).doubleValue());
				ph.setAmountreceived(b2);
				ph.setProvince(r.getProvince());
				ph.setPid(zhangqi);
				map.put(r.getProvince(), ph);
			}
		}
		return map;
	}
	/**
	 * 按省份遍历map,插入数据库
	 * @param map
	 * @param record主表里面要插入的一条实体
	 */
	@Transactional
	public void eachMapToDb(HashMap<String,PrmHistory> map,PrmCatalog record){
		for (String key : map.keySet()) {
			PrmHistory r = new PrmHistory();
		    r = map.get(key);
		    //插从表
		    insertOrUpdateHistory(r);
		}
		//插主表
		insertOrUpdate(record);
	}
	/**
	 * double转成decimal(保留两位小数)
	 * @param d
	 * @return BigDecimal
	 */
	public BigDecimal doubleToBigDecimal(double d) {
		BigDecimal bg = new BigDecimal(d);
		return bg.setScale(2, BigDecimal.ROUND_HALF_UP);
	}
	/**
	 * 根据账期把要导入的相同账期数据都删除
	 * @param zhangqi
	 */
	@Transactional
	public void deleteZhangqi(String zhangqi) {
		prmhistorymapper.deleteByZhangqi(zhangqi);
		prmcatalogmapper.deleteByZhangqi(zhangqi);
	}
	public String getNowDate(){
		String date="";
		Date dt = new Date();
		SimpleDateFormat d = new SimpleDateFormat("yyyy-MM-dd");
		date = d.format(dt);
		return date;
	}
	/**
	 * 查询prm表里的所有账期作为combo
	 * @return
	 */
	public List<HashMap<String, Object>> getZhangqiCombo() {		
		return prmcatalogmapper.getZhangqiCombo();
	}
}
