package com.gary.operation.controller.manage;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletResponse;

import com.gary.base.utli.ChinaMoney;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.aspose.cells.Workbook;
import com.gary.base.cell.ExportCell;
import com.gary.base.cell.MapDataSource;
import com.aspose.cells.WorkbookDesigner;
import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.system.SystemException;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.CdrHistory;
import com.gary.operation.domain.Previewresult;
import com.gary.operation.domain.Previewtrack;
import com.gary.operation.service.PartnerService;
import com.gary.operation.service.PreviewService;
import com.gary.operation.service.ProcessService;

@Controller
@RequestMapping("/PreviewController.do")
public class PreviewController extends ExportCell{
	
	@Autowired
	private PreviewService service;
	
	@ResponseBody
	@Action("查询selectPreviewtrack")
	@RequestMapping(params = "method=selectPreviewtrack")
	public Object selectPreviewtrack(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.selectPreviewtrack(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}
	
	@ResponseBody
	@Action("查询selectPreviewresult")
	@RequestMapping(params = "method=selectPreviewresult")
	public Object selectPreviewresult(GridParameter param, @Json MapDataBinder searchParam) {
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = service.selectPreviewresult(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}
	
	@ResponseBody
	@Action("从CDR_HISTORY表里面获取账期数据作为combo用")
	@RequestMapping(params="method=selectZhangqiCombo")
	public Object selectZhangqiCombo() {
		return service.selectZhangqiCombo();
	}
	
	@ResponseBody
	@Action("从track表里面获取账期数据作为combo用用来导出所有app")
	@RequestMapping(params="method=getZhangqiComboByTrack")
	public Object getZhangqiComboByTrack() {
		return service.getZhangqiComboByTrack();
	}
	
	@ResponseBody
	@Action("获取账期数据,从每条数据抽取,重新组合,冲到结算单里面")
	@RequestMapping(params="method=saveImport")
	public Object saveImport(String zhangqi) throws ParseException {
		//判断是否存在该账期，如果存在就不能再获取。
		if (service.isHaveZhagnqi(zhangqi)) {
			throw new SystemException("已经存在该账期，无需再次获取。");
		} 
		//获取每个app的PRM应收 key=应用 val=PRM应收
		HashMap<String,BigDecimal> prmmap= service.getProviceAndPrm(zhangqi);
		//数据获取 开发者,app 应收和 group by 开发者 app分组
		List<CdrHistory> list = service.getDataByZhangqi(zhangqi);
		//插入数据库
		service.eachListIntoTable(list,zhangqi,prmmap);
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("更新结算表")
	@RequestMapping(params="method=saveResult")
	public Object saveResult(@Json List<Previewresult> paramList) {
		service.saveResult(paramList);
		return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("更新track表")
	@RequestMapping(params="method=updatePreviewTrack")
	public Object updatePreviewTrack(String id, String trackstatus, String trackdescription){
		service.updatePreviewTrack(id,trackstatus,trackdescription);
		return JsonResult.SUCCESS;
	}
	/**
	 * 导出合作伙伴的计算单
	 * param trackId 结算单(track)ID
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(params="method=importPartnerResult")
	public Object importPartnerResult(String trackId) throws Exception,ParseException{
		HashMap<String, Object> track = service.getTrackMap(trackId);
		track.put("Name", "帐期：  "+track.get("Name")+"                                                                                                                         单位：元（人民币）");
		HashMap<String, Object> partner = service.getPartnerMap(trackId);
		if (partner==null) {
			throw new SystemException("系統缺少合作伙伴信息,无法导出");
		}
		List<Previewresult> result = service.getResultMapList(trackId);
		//获取实收金额总计,转换成大写导出
		BigDecimal amount = new BigDecimal("0");
		for (Previewresult previewresult : result) {
			amount = amount.add(previewresult.getAmountrecived());
		}
		track.put("ChinaMoney","金额大写： "+ChinaMoney.amountToChinese(amount.doubleValue()));
		track.put("a", "开具发票金额大写：");
		Workbook wb = getWorkbookDesigner("/designer/PartnerResult.xls");
		WorkbookDesigner designer = new WorkbookDesigner();
		designer.setWorkbook(wb);
		designer.setDataSource("track", new MapDataSource(track));
		designer.setDataSource("partner", new MapDataSource(partner));
		designer.setDataSource("result", result);
		designer.process(true);
		String key = saveToTemporaryWorkBook(wb);
		return new JsonResult(key);
		
	}
	/**
	 * 根据账期导出所有app的金额
	 * @param zhangqi
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(params="method=savaExportAllApp")
	public Object savaExportAllApp(String zhangqi) throws Exception ,ParseException{
		HashMap<String, Object> onlyzhangqi = new HashMap<String, Object>();
		onlyzhangqi.put("ZhangQi", "账期："+zhangqi+"                                                                                                                                                                                                                                                 单位：元");
		List<Previewresult> result = service.getAllAppMoneyByZhangqi(zhangqi);
		if (result.size()<=0) {
			throw new SystemException("该账期无数据,无法导出");
		}
		int i = 1;
		for (Previewresult record : result) {
			record.setIndex(i);i++;
		}
		Workbook wb = getWorkbookDesigner("/designer/AllAppMoney.xls");
		WorkbookDesigner designer = new WorkbookDesigner();
		designer.setWorkbook(wb);
		designer.setDataSource("onlyzhangqi", new MapDataSource(onlyzhangqi));
		designer.setDataSource("result", result);
		designer.process(true);
		String key = saveToTemporaryWorkBook(wb);
		return new JsonResult(key);
	}
}
