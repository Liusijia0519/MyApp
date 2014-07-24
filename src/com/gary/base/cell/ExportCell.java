package com.gary.base.cell;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aspose.cells.Workbook;
import com.gary.base.annotation.Action;
import com.gary.base.system.SystemResource;

public abstract class ExportCell {
	
	private static final Map<String, Workbook> temporaryWorkBook = Collections.synchronizedMap(new HashMap<String, Workbook>());

	protected void setResponseHeader(HttpServletResponse response, String fileName) throws UnsupportedEncodingException {
		String contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		response.setContentType(contentType);
		response.setCharacterEncoding("UTF-8");
		//fileName = URLEncoder.encode(fileName, "UTF-8");
		//fileName = URLDecoder.decode(fileName, "UTF-8");
		response.addHeader("content-disposition", "attachment;filename=" + fileName);
	}

	protected Workbook getWorkbookDesigner(String designerPath) throws Exception {
		String realPath = SystemResource.getRealPath(designerPath);
		Workbook wb = new Workbook(realPath);
		return wb;
	}
	
	protected String saveToTemporaryWorkBook(Workbook workbook) {
		String key = UUID.randomUUID().toString();
		temporaryWorkBook.put(key, workbook);
		return key;
	}

	@Action("下载数据")
	@RequestMapping(params="method=sendToBrowser")
	public void sendToBrowser(HttpServletResponse response, String key ,String excelname)
			throws IOException, Exception {
		ByteArrayOutputStream bos = null;
		ByteArrayInputStream bis = null;
		try {
			setResponseHeader(response, excelname + ".xls");
			Workbook workbook = temporaryWorkBook.get(key);
			bos = new ByteArrayOutputStream();
			workbook.save(bos, workbook.getFileFormat());
			bis = new ByteArrayInputStream(bos.toByteArray());
			HSSFWorkbook hxb = new HSSFWorkbook(bis);
			hxb.removeSheetAt(hxb.getNumberOfSheets() - 1);
			hxb.setActiveSheet(0);
			hxb.write(response.getOutputStream());
		} finally {
			temporaryWorkBook.remove(key);
			bos.close();
			bis.close();
		}
	}

}
