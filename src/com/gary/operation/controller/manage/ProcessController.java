package com.gary.operation.controller.manage;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import sun.rmi.runtime.NewThreadAction;

import com.gary.base.annotation.Action;
import com.gary.base.annotation.Json;
import com.gary.base.core.MapDataBinder;
import com.gary.base.system.SystemException;
import com.gary.base.system.SystemResource;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.base.web.JsonResult;
import com.gary.operation.domain.PartnerBase;
import com.gary.operation.domain.SystemFile;
import com.gary.operation.mapper.PartnerBaseMapper;
import com.gary.operation.mapper.SystemFileMapper;
import com.gary.operation.service.PreviewService;
import com.gary.operation.service.ProcessService;

@Controller
@RequestMapping("/ProcessController.do")
public class ProcessController {
	
	@Autowired
	private ProcessService processService;
	@Autowired
	private PreviewService previewService;
	
	@ResponseBody
	@Action("查询selectPreviewtrack")
	@RequestMapping(params = "method=selectPreviewtrack")
	public Object selectPreviewtrack(GridParameter param, @Json MapDataBinder searchParam) {
		//只看自己的结算单
		if (searchParam.getInnerMap().containsKey("myTrack")) {
			//获取当前用户的DeveloperId
			if(processService.getUserDeveloperId()!=null){
				//只看到自己的结算单
				searchParam.put("developerid","\""+processService.getUserDeveloperId()+"\"");
				//规定看到某些状态的结算单,比如不能看到编辑状态.
				//String[] trackstatusin={"2","3"};
				searchParam.put("trackstatusin","'1','1.5','2','3','3.5','4'");
			}
			else{
				searchParam.put("developerid","随便ID不允许查到");
			}
		}
		System.out.println(searchParam.getInnerMap());
		DataAndTotal dataAndTotal = previewService.selectPreviewtrack(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}

	@ResponseBody
	@Action("保存发票")
	@RequestMapping(params = "method=saveInvoice")
	public Object saveInvoice(String trackid,@RequestParam MultipartFile[] invoice) {
		//保存发票图片到system_file表
		 processService.saveInvoice(trackid, invoice);
		 //更新track表的状态(调用previewService)(已上传发票)
		 previewService.updatePreviewTrack(trackid, "3",null);
		 return JsonResult.SUCCESS;
	}
	
	@ResponseBody
	@Action("查询文件")
	@RequestMapping(params = "method=selectFile")
	public Object selectFile(GridParameter param, @Json MapDataBinder searchParam) {
		DataAndTotal dataAndTotal = processService.selectFile(searchParam.getInnerMap(),
				param);
		return new JsonResult(dataAndTotal);
	}
	@ResponseBody
	@Action("获取文件流")
	@RequestMapping(params = "method=selectFileByteById")
	public void selectFileByteById(String id, HttpServletResponse response) {
		SystemFile file = processService.getFileByPrimaryKey(id);
		if(file != null) {
			try {
				response.setContentType("application/octet-stream");
				//response.setCharacterEncoding("UTF-8");
				//String fileName = URLEncoder.encode(file.getWenjianming(), "UTF-8");
				//response.addHeader("content-disposition", "attachment;filename=" + fileName);
				//response.addHeader("Content-Length", "" + file.getWenjianshuju().length);
				response.getOutputStream().write(file.getFilebyte());
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	@ResponseBody
	@Action("删除文件")
	@RequestMapping(params = "method=deleteFileById")
	public Object deleteFileById(String id){
		processService.deleteFileById(id);
		return JsonResult.SUCCESS;
	}
}
