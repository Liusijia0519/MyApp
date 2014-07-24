package com.gary.operation.controller.manage;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.gary.base.annotation.Action;
import com.gary.base.web.JsonResult;

@Controller
@RequestMapping("/SystemUploadController.do")
public class SystemUploadController {
	
	@ResponseBody
	@Action("系统通用上传")
	@RequestMapping(params="method=uploadFile")
	public Object uploadFile(@RequestParam MultipartFile file) throws IllegalStateException, IOException {
		file.transferTo(new File("D:\\" + file.getOriginalFilename()));
		System.out.println("SystemUploadController.uploadFile()");
		return new JsonResult();
	}
}
