package com.gary.operation.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gary.base.system.SystemException;
import com.gary.base.web.DataAndTotal;
import com.gary.base.web.GridParameter;
import com.gary.operation.domain.CdrHistory;
import com.gary.operation.domain.Previewtrack;
import com.gary.operation.domain.Previewresult;
import com.gary.operation.domain.PrmHistory;
import com.gary.operation.mapper.PartnerBaseMapper;
import com.gary.operation.mapper.PreviewtrackMapper;
import com.gary.operation.mapper.PreviewresultMapper;
import com.gary.operation.mapper.CdrHistoryMapper;
import com.gary.operation.mapper.PrmHistoryMapper;

@Service
public class PreviewService {

	@Autowired
	private PreviewtrackMapper previewtrackmapper;
	@Autowired
	private PreviewresultMapper previewresultmapper;
	@Autowired
	private CdrHistoryMapper cdrhistorymapper;
	@Autowired
	private PrmHistoryMapper prmHistorymapper;
	@Autowired
	private PartnerService partnerService;
	@Autowired
	private PartnerBaseMapper partnerBaseMapper;

	public DataAndTotal selectPreviewtrack(Map<String, Object> searchParam,
			GridParameter param) {
		Object list = previewtrackmapper.select(searchParam,
				param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}

	public DataAndTotal selectPreviewresult(Map<String, Object> searchParam,
			GridParameter param) {
		Object list = previewresultmapper.select(searchParam,
				param.getPageBounds());
		return new DataAndTotal(list, param.getPageBounds().getTotal());
	}

	public Object selectZhangqiCombo() {
		Object list = cdrhistorymapper.selectZhangqiCombo();
		return list;
	}
	/**
	 * 获取开发者,app 应收和 group by 开发者 app分组
	 * @param zhangqi
	 * @return
	 */
	public List<CdrHistory> getDataByZhangqi(String zhangqi) {
		List<CdrHistory> list = cdrhistorymapper.getDataByZhangqi(zhangqi);
		return list;
	}

	/**
	 * 遍历list 插入1---N (开发者---应用)表
	 * @param list 开发者(重复) 应用(不重复,金额已相加)
	 * @param zhangqi 账期(插入主表用)
	 * @param prmmap 每个从表里面的每个应用所对应的PRM应收(key=应用val=金额)
	 * @return
	 */
	@Transactional
	public Boolean eachListIntoTable(List<CdrHistory> list, String zhangqi,
			HashMap<String, BigDecimal> prmmap) {
		HashMap<String, Previewtrack> map = new HashMap<String, Previewtrack>();
		for (CdrHistory r : list) {
			if (map.containsKey(r.getDeveloperid())) {
				// 已经存在该开发者,就把id取出来作为外键
				String pid = map.get(r.getDeveloperid()).getId();
				//插从表
				insertResult(pid,r,prmmap);
			} else {//如果不存在开发者,就跳过.>2是为了排除""
				if (r.getDeveloperid()==null||r.getDeveloperid().length()<=2||r.getDevelopername()==null||r.getDevelopername().length()<=2) {
					continue;
				}
				//外键
				String pid = UUID.randomUUID().toString();
				//插主表
				Previewtrack pt = new Previewtrack();
				pt.setId(pid);
				pt.setName(zhangqi);
				pt.setDevelopername(r.getDevelopername());
				pt.setDeveloperid(r.getDeveloperid());
				pt.setTrackstatus("0");
				previewtrackmapper.insert(pt);//执行插入
				//插从表
				insertResult(pid,r,prmmap);
				//新开发者,加到map里面.如果存在该开发者,就不插入主表了.直接通过开发者,把主表id取出来,插到从表里
				map.put(r.getDeveloperid(), pt);
			}
		}
		return true;
	}
	/**
	 * 插入Result表
	 * @param pid 外键
	 * @param r CdrHistory 实体(计算用)
	 * @param prmmap 每个从表里面的每个应用所对应的PRM应收(key=应用val=金额)
	 */
	@Transactional
	private void insertResult(String pid, CdrHistory r,
			HashMap<String, BigDecimal> prmmap) {
		
		Previewresult pr = new Previewresult();
		//主键
		pr.setId(UUID.randomUUID().toString());
		//外键
		pr.setPid(pid);
		//应用名称
		pr.setAppname(r.getAppname());
		//平台结算金额(插入数据库四舍五入成2位小数)
		pr.setAmountplm((new BigDecimal(r.getTotalfee().toString())).setScale(4, BigDecimal.ROUND_HALF_UP));
		//PRM结算金额(取出来的时候是8位小数,插入数据库四舍五入成2位小数)
		pr.setAmountprm(prmmap.get(r.getAppname()+r.getDeveloperid()).setScale(4,BigDecimal.ROUND_HALF_UP));
		//------------------------------>>>>>>>>>>
		//应收实结金额   (prm*[c]([b]0.92*0.7[a])(合作伙伴结算率)
		HashMap<String, BigDecimal> map = partnerService.getAllUserPayratio();
		BigDecimal a = new BigDecimal("0.7");//开发者结算率(a)----如果map里面不存在该开发者或者渠道的结算率 默认就是0.7
		//如果有渠道id   就通过渠道id把他的结算率取出来
		if(StringUtils.isNotEmpty(r.getChannelid())){
			//存在该渠道或者开发者的结算率   才取
			if(map.containsKey(r.getChannelid())){
				a = map.get(r.getChannelid());
			}
		}
		else {//否则就通过开发者id取
			if(map.containsKey(r.getDeveloperid())){
				a = map.get(r.getDeveloperid());
			}
		}
		BigDecimal b = new BigDecimal("0.92");//固定0.92
		BigDecimal c = a.multiply(b);//a*b
		BigDecimal result = prmmap.get(r.getAppname()+r.getDeveloperid()).multiply(c);//prm*c
		pr.setAmountrecived(result.setScale(4, BigDecimal.ROUND_HALF_UP));
		//-----------------------------------<<<<<<<<<
		//退费赔偿
		pr.setAmountreturn(new BigDecimal(0));
		//违规扣费
		pr.setAmountdeduct(new BigDecimal(0));
		//补充结算款
		pr.setAmountaddition(new BigDecimal(0));
		//实结金额(默认跟应收实结金额一样,后期还需要计算修改,退费,扣款等)
		pr.setAmounttotal(pr.getAmountrecived());
		//结算率(内部)------------------prm结算金额/平台结算金额
		BigDecimal ratioinner = pr.getAmountprm().divide(pr.getAmountplm(),4,BigDecimal.ROUND_HALF_UP);
		//BigDecimal ratioinner = new BigDecimal((prmmap.get(r.getAppname()).divide(new BigDecimal(r.getTotalfee().toString()),4,BigDecimal.ROUND_HALF_UP)).toString());
		pr.setRatioinner(ratioinner);
		//实际结算率(外部)-----------------待算---------应收实结金额  /平台结算金额
		BigDecimal ratiooutter = pr.getAmountrecived().divide(pr.getAmountplm(),4,BigDecimal.ROUND_HALF_UP);
		//BigDecimal ratiooutter = new BigDecimal(result.divide(new BigDecimal(r.getTotalfee().toString()),4,BigDecimal.ROUND_HALF_UP).toString());
		pr.setRatiooutter(ratiooutter);
		//------------------->执行插入
		previewresultmapper.insert(pr);
		
	}

	/**
	 * 获取每个app的PRM应收 key=应用+开发者id val=PRM应收(bigdecimal类型保留8位小数) 注意运算过程中 a/b时候百分比会丢失精度
	 * 
	 * @param zhangqi
	 * @return
	 */
	public HashMap<String, BigDecimal> getProviceAndPrm(String zhangqi) {
		//按应用,开发者id,省份分组,金额相加(返回的AppName为AppName+开发者id拼接成的字符攒,为了避免应用重复问题,就是标记用途)
		List<CdrHistory> list = cdrhistorymapper.getAppAndLocation(zhangqi);
		// 存储每个app（所有省）的PRM应收key=appname val= prm应收,这是最后返回的结果
		HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();
		// 每个省的所有应用平台应收key=省 val=应收------->a
		HashMap<String, BigDecimal> previewmap = getpreviewmap(zhangqi);
		// 每个省的所有应用PRM应收key=省 val=应收------->b
		HashMap<String, BigDecimal> prmmap = prmmap(zhangqi);
		//判断--------如果CdrHistory数据省份与PRM数据省份不对应,就提示.否则无法进行计算.(要相除的)
		if(previewmap.size()!=prmmap.size()){
			throw new SystemException("CdrHistory省份数据("+previewmap.size()+")与PRM省份数据("+prmmap.size()+")不对应,请核对数据是否正确.");
		}
		for (CdrHistory r : list) {
			if (map.containsKey(r.getAppname())) {
				BigDecimal a = previewmap.get(r.getLocation());// 该省所有应用平台应收
				BigDecimal b = prmmap.get(r.getLocation());// 该省所 有应用PRM应收
				BigDecimal ab = a.divide(b,8,BigDecimal.ROUND_HALF_UP);// 百分比
				BigDecimal c = new BigDecimal(r.getTotalfee().toString()).multiply(ab);// 该应用在该地区的平台应收(c)*(a/b)
				// 已经存在该app的金额,就把别的省加进去 ----------------------------------> [辽宁 (c)*(a/b)]+[河北 (c)*(a/b)]+等等(其他省)
				// r.getAppname()是原来的,c是该地区新的金额
				BigDecimal d = map.get(r.getAppname()).add(c);
				// 移除原来
				map.remove(r.getAppname());
				// 换成新的
				map.put(r.getAppname(), d.setScale(8, BigDecimal.ROUND_HALF_UP));
			} else {
				BigDecimal a = previewmap.get(r.getLocation());// 该省所有应用平台应收    a
				BigDecimal b = prmmap.get(r.getLocation());// 该省所有应用PRM应收               b
				BigDecimal ab = a.divide(b,8,BigDecimal.ROUND_HALF_UP);// 百分比        (a/b)
				BigDecimal c = new BigDecimal(r.getTotalfee().toString()).multiply(ab);// 该应用在该地区的平台应收(c)*(a/b)
				map.put(r.getAppname(), c.setScale(8, BigDecimal.ROUND_HALF_UP));//四舍五入保留8位小数
			}
		}
		return map;
	}
	/**
	 * 每个省的所有应用平台应收key=省 val=应收
	 * @param zhangqi
	 * @return
	 */
	private HashMap<String, BigDecimal> getpreviewmap(String zhangqi) {
		// 存储数据
		HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();
		// 获取list
		List<CdrHistory> list = cdrhistorymapper.getLocationTotalFee(zhangqi);
		for (CdrHistory r : list) {
			if (r.getLocation()!=null&&r.getLocation().length()>2) {//去掉没有省份的数据(>2是为了排除"")
				map.put(r.getLocation(), new BigDecimal(r.getTotalfee().toString()));//构造函数要string类型,否则注意数值精度丢失
			}
		}
		return map;
	}

	/**
	 * 获取每个省所有app的PRM应收
	 * 
	 * @param zhangqi
	 * @return
	 */
	private HashMap<String, BigDecimal> prmmap(String zhangqi) {
		// 存储数据
		HashMap<String, BigDecimal> map = new HashMap<String, BigDecimal>();
		// 获取list
		List<PrmHistory> list = prmHistorymapper.getProvinceMoney(zhangqi);
		//如果没有PRM数据,就提示未导入
		if (list.size()==0){
			throw new SystemException("该账期的PRM数据不存在,无法进行计算.请导入PRM数据后再获取.");
		}
		for (PrmHistory r : list) {
			if (r.getProvince()!=null&&r.getProvince()!="") {
				map.put("\""+r.getProvince()+"\"", new BigDecimal(r.getAmountreceivable().toString()));//把map的key省份加上"",因为取时候cdr表里面的省份是加""的
			}
		}
		return map;
	}
	/**
	 * 判断PreviewTrack表里是否存在该账期,
	 * @param zhangqi
	 * @return 存在true 不存在false
	 */
	public boolean isHaveZhagnqi(String zhangqi) {
		//返回PreviewTrack表里面,该账期的行数. 如果小于0   证明没有改账期
		int count = previewtrackmapper.getCountByZhangqi(zhangqi);
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 循环更新Previewresult
	 * @param paramList
	 */
	@Transactional
	public int saveResult(List<Previewresult> paramList) {
		int result = 0;
		for (Previewresult pr : paramList) {
			BigDecimal A = pr.getAmountrecived();//应收实结金额
			BigDecimal a = pr.getAmountreturn();//退费赔偿
			BigDecimal b = pr.getAmountdeduct();//违规扣费
			BigDecimal c = pr.getAmountaddition();//补充结算款
			BigDecimal num = (A.add(c)).subtract(a.add(b));//(A+c)-(a+b)
			pr.setAmounttotal(num);
			result = previewresultmapper.updateByPrimaryKeySelective(pr);
		}
		return result;
		
	}
	/**
	 * 更新track表,用于更改状态和审核描述的
	 * @param id
	 * @param trackstatus
	 * @param trackdescription
	 */
	public void updatePreviewTrack(String id, String trackstatus, String trackdescription) {
		Previewtrack pt = previewtrackmapper.selectByPrimaryKey(id);
		if(StringUtils.isNotEmpty(trackstatus)){
			pt.setTrackstatus(trackstatus);
		}
		if(StringUtils.isNotEmpty(trackdescription)){
			pt.setTrackdescription(trackdescription);
		}
		previewtrackmapper.updateByPrimaryKeySelective(pt);
	}
	/**
	 * 获取track一条数据通过id   返回map 用来导出数据
	 * @param trackId
	 * @return
	 */
	public HashMap<String, Object> getTrackMap(String trackId) {
		return previewtrackmapper.getTrackMapById(trackId);
	}
	/**
	 * 根据trackid获取合作伙伴的信息
	 * @param trackId
	 * @return
	 */
	public HashMap<String, Object> getPartnerMap(String trackId) {
		return partnerBaseMapper.getPartnerMap(trackId);
	}
	/**
	 * 根据trackid获取result表的信息 导出excel用
	 * @param trackId
	 * @return
	 */
	public List<Previewresult> getResultMapList(String trackId) {
		return previewresultmapper.getResultMapList(trackId);
	}

	public Object getZhangqiComboByTrack() {
		List<HashMap<String, Object>> list = previewtrackmapper.getZhangqiComboByTrack();
		return list;
	}
	/**
	 * 获取所有的app数据通过账期
	 * @param zhangqi
	 * @return
	 */
	public List<Previewresult> getAllAppMoneyByZhangqi(String zhangqi) {
		List<Previewresult> list = previewresultmapper.getAllAppMoneyByZhangqi(zhangqi);
		return list;
	}
}
