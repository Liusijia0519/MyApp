package com.gary.operation.controller.manage;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.aspose.cells.Workbook;
import com.aspose.cells.Worksheet;
import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.system.SystemResource;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.PrmCatalog;
import com.gary.operation.domain.PrmHistory;
import com.gary.operation.service.PrmService;

@Controller
@RequestMapping("/PrmController.do")
public class PrmController {
	@Autowired
	private PrmService service;

	@ResponseBody
	@Action("查询全部")
	@RequestMapping(params = "method=select")
	public Object select(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.select(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}
	@ResponseBody
	@Action("查询全部PrmCatalog")
	@RequestMapping(params = "method=selectPrmCatalog")
	public Object selectPrmCatalog(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.selectPrmCatalog(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}
	@ResponseBody
	@Action("查询账期作为combo")
	@RequestMapping(params="method=getZhangqiCombo")
	public Object getZhangqiCombo() {
		return service.getZhangqiCombo();
	}
	@ResponseBody
	@Action("导入数据")
	@RequestMapping(params = "method=importData")
	public Boolean importData(@RequestParam MultipartFile excel)
			throws IOException, Exception {
		// 获取工作簿Sheet1
		Workbook wk = new Workbook(excel.getInputStream());
		Worksheet sheet = wk.getWorksheets().get(0);
		//如果不是结算单详细信息,就不导入.
		String s=sheet.getCells().get("A1").getStringValue();
		if (!StringUtils.isNotEmpty(s)||!s.equals("结算单详细信息")) {
			return false;
		}
		//账期
		String zhangqi = sheet.getCells().get("B3").getStringValue();
		//删除相同账期数据(删除主表和从表的数据)
		service.deleteZhangqi(zhangqi);
		//先把每个省的每条数据取出来,放进list里面
		List<PrmHistory> list = service.getExcelData(sheet.getCells().getRows(), zhangqi);
		//把list按省份分组,同时把每个省份的应收和实收金额加到一起
		HashMap<String,PrmHistory> map = service.listToMap(list, zhangqi);
		//按省份遍历map,把每条数据存进数据库里面,插入主表表里面一条数据(excel位置写死)
		PrmCatalog record = new PrmCatalog();
		record.setCreatedate(service.getNowDate());
		record.setCreateuser(SystemResource.getSystemUser().getRealName());
		record.setName(sheet.getCells().get("B3").getStringValue());
		record.setAmountreceivable(service.doubleToBigDecimal(sheet.getCells().get("C7").getDoubleValue()));
		record.setAmountreceived(service.doubleToBigDecimal(sheet.getCells().get("M7").getDoubleValue()));
		//遍历插从表,插主表
		service.eachMapToDb(map,record);
		return true;
	}
	
	
}
