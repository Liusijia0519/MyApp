package com.gary.operation.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.gary.base.core.PageBounds;
import com.gary.base.system.SystemException;
import com.gary.base.system.SystemResource;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.operation.domain.PartnerBase;
import com.gary.operation.domain.SystemFile;
import com.gary.operation.mapper.PartnerBaseMapper;
import com.gary.operation.mapper.SystemFileMapper;

@Service
public class ProcessService {
	
	@Autowired
	private SystemFileMapper fileMapper;
	@Autowired
	private PartnerBaseMapper partnerbasemapper;
	@Transactional
	public void saveInvoice(String trackid,MultipartFile[] invoice){
		int result = 0;
		if(invoice != null && invoice.length > 0) {
			for (MultipartFile mf : invoice) {
				if(mf.isEmpty()) {
					continue;
				}
				SystemFile file = new SystemFile();
				file.setId(UUID.randomUUID().toString());
				file.setFileid(trackid);
				file.setFilename(mf.getOriginalFilename());
				try {
					file.setFilebyte(mf.getBytes());
				} catch (IOException e) {
					throw new SystemException("上传附件出错");
				}
				result += fileMapper.insert(file);
			}
		}
		if(result <= 0) {
			throw new SystemException("数据保存失败");
		}
	}

	public DataAndTotal selectFile(HashMap<String, Object> innerMap,
			GridParameter param) {
		Object list = fileMapper.select(innerMap, param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}

	public SystemFile getFileByPrimaryKey(String id) {
		
		return fileMapper.selectByPrimaryKey(id);
	}
	/**
	 * 根据id删除文件
	 * @param id
	 * @return
	 */
	public int deleteFileById(String id) {
		int result = 0;
		result = fileMapper.deleteByPrimaryKey(id);
		if(result <= 0) {
			throw new SystemException("数据删除失败");
		}
		return result;
	}
	/**
	 * 获取当前用户的DeveloperId
	 * @return
	 */
	public String getUserDeveloperId() {
		//当前登录用户id
		String userid = SystemResource.getSystemUser().getId();
		List<HashMap<String, Object>> list = partnerbasemapper.getChannelIDByUserID(userid);
		if(list.size()==1){
			return list.get(0).get("ChannelID").toString();
		}
		else {
			return null;
		}
	}
}
