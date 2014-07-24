/**
 * @class MyApp.controller.business.PrmController
 * @extends Ext.app.Controller
 * @description PRM数据管理
 * @author 刘思家
 */

Ext.define('MyApp.controller.business.PrmController', {
	extend : 'Ext.app.Controller',
	
	views : ['business.prm.ModelEntrance',
	         'business.prm.Grid',
	         'business.prm.CataGrid',
	         'business.prm.FormWin'/*,
	         'business.'+business+'.HuifuWin'*/
	         ],

	refs : [{
				ref : 'FormWin',
				selector : 'business_prm_FormWin',
				autoCreate : true,
				xtype : 'business_prm_FormWin'
			}, {
				ref : 'Grid',
				selector : 'business_prm_Grid'
			}, {
				ref : 'CataGrid',
				selector : 'business_prm_CataGrid'
			}/*, {
				ref : 'ActionPanel',
				selector : 'business_'+business+'_actionPanel'
			}, {
				ref : 'HuifuWin',
				selector : 'business_' + business + '_HuifuWin',
				autoCreate : true,
				xtype : 'business_' + business + '_HuifuWin'
			}*/],
			

	init : function() {
		var me = this;
		me.control({

					'business_prm_Grid button[action=import]' : {
						click : me.importPrm
						// 导入数据
					},
					'business_prm_CataGrid button[action=search]' : {
						click : me.search
						// 查询账期
					},'business_prm_CataGrid' : {
						select : me.searchHistory
						// 查询省份详细账目
					},
					'business_prm_FormWin button[action=save]' : {
						click : me.save
						// 保存
					}/*,
					'business_minyizhengji_actionPanel button[action=edit]' : {
						click : me.edit
						// 编辑联系人
					},
					'business_minyizhengji_actionPanel button[action=update]' : {
						click : me.update
						// 更改发布状态
					},
					'business_minyizhengji_actionPanel button[action=delete]' : {
						click : me.delete
						// 删除
					},
					'business_minyizhengji_actionPanel button[action=empty]' : {
						click : me.emptySearchItem
						// 清空条件
					},
					'business_minyizhengji_actionPanel button[action=search]' : {
						click : me.search
						// 高级查询
					},
					'business_minyizhengji_actionPanel button[action=huifu]' : {
						click : me.huifu
						// 民意回复
					}*/

					
				});
	},
	getUrl : function(method){
		return 'PrmController.do?method=' + method;
	},
	/**
	 * 导入数据
	 */
	importPrm:function(){
		this.getFormWin().down('baseFormPanel').resetFields();
		this.getFormWin().show();
	},
	/**
	 * 高级查询CataGrid
	 */
	search:function(){
		var param = {};
		param.name = this.getCataGrid().down('#name').getValue();
    	//var param = this.getActionPanel().getValues(false,true);
    	this.getCataGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	this.getCataGrid().refresh();
    	var param1 = {};
		param.pid = this.getCataGrid().down('#name').getValue();
    	this.getGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	this.getGrid().refresh();
	},
	/**
	 * 查询省份详细账目
	 */
	searchHistory:function(grid, record, index, eOpts){
		var param = {};
		param.pid = record.data.name;
    	this.getGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
    	this.getGrid().refresh();
	},
	
	/**
	 * 新建
	 */
	/*showAddWin : function() {
		this.getFormWin().down('baseFormPanel').resetFields();
		this.getFormWin().show();
	},*/
	/**
	 * 导入数据保存
	 */
	save : function() {
		var me = this;
		var form = me.getFormWin().down('baseFormPanel');
		if(!form.isValid()){//验证没通过 返回
			return;
		}
		//var file = form.getFieldValue('excel');
		//表单值的数组
		var file = form.getForm().getFields().items;
		//每个文件不是excel类型并且不是''   就返回
        if(!me.checkFileExt(file[0].rawValue,/.xlsx|.xls/i)&&file[0].rawValue!='')
        {
        	Ext.popup.Msg('提示信息', "请选择excel类型文件上传(.xlsx|.xls)");
            return;
        }
        //判断大小(不支持IE9以下版本)
        /*if(file[0].fileInputEl.dom.files.length>0&&(file[0].fileInputEl.dom.files[0].size)/1024>=500){
        	Ext.popup.Msg('提示信息', "只能上传500K以下文件,请调整后上传");
            return;
        }*/
		form.submit({
					url : me.getUrl('importData'),
					success : function(response) {
						me.getFormWin().hide();
						me.getGrid().refresh();
						me.getCataGrid().refresh();
					},
					failure:function(response){  
						Ext.popup.Msg('提示信息', "请选择正确的Excel导入");
					    }  
				});
	},
	/**
	 * 检查文件类型
	 */
	checkFileExt:function (extstr,exg)
	{
	    var extstr = extstr.substring(extstr.lastIndexOf(".")).toLowerCase();
	    if (!extstr.match(exg)) {
	        return false;
	    }
	    return true;
	}
	
});
