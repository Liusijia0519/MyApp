/**
 * @class MyApp.controller.business.PrmController
 * @extends Ext.app.Controller
 * @description PRM数据管理
 * @author 刘思家
 */

Ext.define('MyApp.controller.business.ProcessController', {
	extend : 'Ext.app.Controller',
	
	requires:['MyApp.ux.dataview.DataViewWin'],
	
	views : ['business.process.ModelEntrance',
	         'business.process.TrackGrid',
	         'business.process.ProcessResultGrid',
	         'business.process.CheckTrackFormWin',
	         'business.process.UploadInvoiceFormWin'
	         ],

	refs : [{
				ref : 'TrackGrid',
				selector : 'business_process_TrackGrid'
			},{
				ref : 'ProcessResultGrid',
				selector : 'business_process_ProcessResultGrid'
			},{
				ref : 'CheckTrackFormWin',
				selector : 'business_process_CheckTrackFormWin',
				autoCreate : true,
				xtype : 'business_process_CheckTrackFormWin'
			},{
				ref : 'UploadInvoiceFormWin',
				selector : 'business_process_UploadInvoiceFormWin',
				autoCreate : true,
				xtype : 'business_process_UploadInvoiceFormWin'
			}],
			

	init : function() {
		var me = this;
		me.control({
					'business_process_TrackGrid' : {
						select : me.loadProcessResultGrid
						// 选择左面grid刷新右面grid
					},
					'business_process_ProcessResultGrid button[action=checkTrack]' : {
						click : me.checkTrack
						// 开发者确认发布的结算表
					},
					'business_process_CheckTrackFormWin button[action=passTrack]' : {
						click : me.updateTrackstatus//确认发布的结算单
						// 更改Track的状态
					},
					'business_process_CheckTrackFormWin button[action=submitQuestion]' : {
						click : me.updateTrackstatus//驳回发布的结算单
						// 更改Track的状态
					},
					'business_process_ProcessResultGrid button[action=uploadInvoice]' : {
						click : me.uploadInvoice
						// 上传发票
					},
					'business_process_UploadInvoiceFormWin button[action=save]' : {
						click : me.updateInvoice
						//保存上传的发票
					},
					'business_process_TrackGrid button[action=viewInvoice]' : {
						click : me.viewInvoice
						// 查看发票
					},
					'business_process_ProcessResultGrid button[action=importPartnerResult]' : {
						click : me.importPartnerResult
						// 导出合作伙伴的结算单
					}
				});
	},
	getUrl : function(method){
		return 'ProcessController.do?method=' + method;
	},
	/**
	 * 选择左面grid刷新右面grid
	 */
	loadProcessResultGrid:function(grid, record, index, eOpts){
		var me = this;
		me.getProcessResultGrid().setTitle(record.data.name + '-' + record.data.developername)
		var param = {};
		param.pid = record.data.id;
		me.getProcessResultGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
		me.getProcessResultGrid().refresh();
	},
	/**
	 * 弹出开发者确认发布的结算表窗体（并传值）
	 */
	checkTrack:function(){
		var me = this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请在左侧选择一张结算表");
			return;
		}
		//不是发布状态并且不是发布被驳回的就不需要确认
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='1'){
			Ext.popup.Msg('提示信息', "无需确认结算表");
			return;
		}
		//把id付给CheckTrackFormWin
		me.getCheckTrackFormWin().id = me.getTrackGrid().getSelectedRecordId();
		var title = '账期：'+me.getTrackGrid().getSelectedCellValue('name');
		me.getCheckTrackFormWin().setTitle(title);
		me.getCheckTrackFormWin().down('baseFormPanel').resetFields();
		me.getCheckTrackFormWin().show();
	},
	/**
	 * 更改Track的状态
	 */
	updateTrackstatus : function(btn){
		var me = this ;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请在左侧选择一张结算表");
			return;
		}
		Ext.Ajax.request({
			//调用PreviewController里面的方法
			url:'PreviewController.do?method=updatePreviewTrack',
		    mask: true,
		    method : 'POST',
		    params: {
		    	id: me.getCheckTrackFormWin().id,
		    	trackstatus : btn.state,
		    	trackdescription : me.getCheckTrackFormWin().down('baseFormPanel').getFieldValue('note')
		    },
		    success: function(response){
		    	me.getCheckTrackFormWin().hide();
				me.getTrackGrid().refresh();
		    }
		});
	},
	/**
	 * 上传发票
	 */
	uploadInvoice:function(){
		var me = this ;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请在左侧选择一张结算表");
			return;
		}
		//不是开发者确认状态和发票被驳回状态就不能上传发票
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='2'&&state!='3.5'){
			Ext.popup.Msg('提示信息', "该状态不能上传发票");
			return;
		}
		me.getUploadInvoiceFormWin().down('baseFormPanel').resetFields();
		me.getUploadInvoiceFormWin().setTitle('账期：'+me.getTrackGrid().getSelectedCellValue('name'));
		me.getUploadInvoiceFormWin().show();
		//发票外键
		me.getUploadInvoiceFormWin().trackid = me.getTrackGrid().getSelectedRecordId();
	},
	/**
	 * 保存发票
	 */
	updateInvoice:function(){
		var me = this;
		var form = me.getUploadInvoiceFormWin().down('baseFormPanel');
		if(!form.isValid()){//验证没通过 返回
			return;
		}
		//var file = form.getFieldValue('invoice');
		//表单值的数组
		var file = form.getForm().getFields().items;
		for (var i in file){
			//每个文件不是图片类型并且不是''   就返回
	        if(!me.checkFileExt(file[i].rawValue,/.jpg|.gif|.png|.bmp/i)&&file[i].rawValue!='')
	        {
	        	Ext.popup.Msg('提示信息', "请选择图片类型文件上传(.jpg|.gif|.png|.bmp)");
	            return;
	        }
	        //判断图片大小,此方法不支持IE9一下版本
/*	        if(file[i].fileInputEl.dom.files.length>0&&(file[i].fileInputEl.dom.files[0].size)/1024>=1024){
	        	Ext.popup.Msg('提示信息', "只能上传1M以下图片,请调整后上传");
	            return;
	        }*/
	    }
		form.submit({
			url : me.getUrl('saveInvoice'),
			params:{
				trackid : me.getUploadInvoiceFormWin().trackid
			},
			success : function() {
				me.getUploadInvoiceFormWin().hide();
				me.getTrackGrid().refresh();
			}
		});
	},
	/**
	 * 查看发票
	 */
	viewInvoice:function(){
		var me = this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请在左侧选择一张结算表");
			return;
		}
		//不是已上传发票状态就没有发票
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='3'&&state!='3.5'){
			Ext.popup.Msg('提示信息', "发票暂未上传");
			return;
		}
		//弹出发票窗体
		var win = Ext.create('MyApp.ux.dataview.DataViewWin',{
			canDelete : true,
			state : state//传状态 只有3.5(发票被驳回时候才能删除)
		}).show();
		//参数 加载该结算单的发票
		var param= {};
		param.fileid=me.getTrackGrid().getSelectedRecordId();
		win.loadImg(param);
	},
	/**
	 * 检查是否是图片类型
	 */
	checkFileExt:function (extstr,exg)
	{
	    var extstr = extstr.substring(extstr.lastIndexOf(".")).toLowerCase();
	    if (!extstr.match(exg)) {
	        return false;
	    }
	    return true;
	},
	/**
	 * 导出合作伙伴的计算单
	 */
	importPartnerResult:function(){
		var me = this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一位开发者的结算表");
			return;
		}
		//如果不是编辑状态,并且不是发布被驳回状态,就不让保存.
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='4'){
			Ext.popup.Msg('提示信息', "运营商未确认该结算单");
			return;
		}
		Ext.Msg.show({
			title:'提示信息',
			msg: '确定导出该结算单吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: this.doImportPartnerResult,
			scope: this
    	});
	},
	doImportPartnerResult:function(buttonId){
		var me = this;
		if(buttonId == "ok") {
    		Ext.Ajax.request({
    		    url: 'PreviewController.do?method=importPartnerResult',
    		    mask: true,
    		    params: {
    		    	trackId: me.getTrackGrid().getSelectedRecordId()
    		    },
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        var excelname = me.getProcessResultGrid().title + '结算单';
    		        if(result.success) {
    		        	location.href = 'PreviewController.do?method=sendToBrowser&excelname='+encodeURI(encodeURI(excelname))+'&key=' + result.data;
    		        }
    		    }
    		});
    	}
	}
});
