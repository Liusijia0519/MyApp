/**
 * @class MyApp.controller.business.PreviewController
 * @extends Ext.app.Controller
 * @description 账期发布审核
 * @author 刘思家
 */
//var business = 'preview';
//var table = 'Preview';

Ext.define('MyApp.controller.business.PreviewController', {
	extend : 'Ext.app.Controller',
	//查看图片
	requires:['MyApp.ux.dataview.DataViewWin'],
	
	views : ['business.preview.ModelEntrance',
	         'business.preview.TrackGrid',
	         'business.preview.ResultGrid',
	         'business.preview.FormWin',
	         'business.preview.CheckInvoiceFormWin',
	         'business.preview.ExportAllAppFormWin'
	         ],

	refs : [{
				ref : 'TrackGrid',
				selector : 'business_preview_TrackGrid'
			},{
				ref : 'ResultGrid',
				selector : 'business_preview_ResultGrid'
			},{
				ref : 'FormWin',
				selector : 'business_preview_FormWin',
				autoCreate : true,
				xtype : 'business_preview_FormWin'
			},{
				ref : 'UploadInvoiceFormWin',
				selector : 'business_preview_UploadInvoiceFormWin',
				autoCreate : true,
				xtype : 'business_preview_UploadInvoiceFormWin'
			},{
				ref : 'CheckInvoiceFormWin',
				selector : 'business_preview_CheckInvoiceFormWin',
				autoCreate : true,
				xtype : 'business_preview_CheckInvoiceFormWin'
			},{
				ref : 'ExportAllAppFormWin',
				selector : 'business_preview_ExportAllAppFormWin',
				autoCreate : true,
				xtype : 'business_preview_ExportAllAppFormWin'
			}],
			

	init : function() {
		var me = this;
		me.control({
					'business_preview_TrackGrid button[action=import]' : {
						click : me.importTrack
						// 获取账期
					},
					'business_preview_TrackGrid' : {
						select : me.loadResultGrid
						// 选择左面grid刷新右面grid
					},
					'business_preview_FormWin button[action=saveImport]' : {
						click : me.saveImport
						// 保存获取的账期
					},
					'business_preview_ResultGrid button[action=saveResult]' : {
						click : me.saveResult
						// 保存Result表的修改
					},
					'business_preview_ResultGrid button[action=publishResult]' : {
						click : me.publishResult
						// 发布结算单
					},
					'business_preview_ResultGrid button[action=operatorsChecked]' : {
						click : me.operatorsChecked
						// 运营商确认(确认发票)
					},
					'business_preview_ResultGrid button[action=viewInvoice]' : {
						click : me.viewInvoice
						// 查看发票
					},
					'business_preview_CheckInvoiceFormWin button[action=passInvoice]' : {
						click : me.passOrRejectInvoice
						// 通过发票(最终确认入账)
					},
					'business_preview_CheckInvoiceFormWin button[action=rejectInvoice]' : {
						click : me.passOrRejectInvoice
						// 驳回发票
					},
					'business_preview_ResultGrid button[action=exportPartnerResult]' : {
						click : me.exportPartnerResult
						// 导出合作伙伴的结算单
					},
					'business_preview_ResultGrid button[action=exportAllApp]' : {
						click : me.exportAllApp
						// 导出所有app的excel
					},
					'business_preview_ExportAllAppFormWin button[action=saveExportAllApp]' : {
						click : me.saveExportAllApp
						// 确认导出所有app
					}
				});
	},
	getUrl : function(method){
		return 'PreviewController.do?method=' + method;
	},
	/**
	 * 获取账期窗体
	 */
	importTrack:function(){
		this.getFormWin().down('baseFormPanel').resetFields();
		this.getFormWin().show();
	},
	/**
	 * 保存获取的账期
	 */
	saveImport:function(){
		var me = this;
		var form = me.getFormWin().down('baseFormPanel');
		if(!form.isValid()){//验证没通过 返回
			return;
		}
		var zhangqi = form.getFieldValue('zhangqi');
		Ext.Ajax.request({
		    url : me.getUrl('saveImport'),
		    mask: true,
		    params: {
		    	zhangqi: zhangqi
		    },
		    success: function(response){
		    	var text = response.responseText;
		        if(Ext.JSON.decode(text).success) {
		        	me.getFormWin().hide();
			    	me.getTrackGrid().loadPage(1);
		        }
		    	
		    }
		});
	},
	/**
	 * 选择左面grid刷新右面grid
	 */
	loadResultGrid:function(grid, record, index, eOpts){
		var me = this;
		me.getResultGrid().setTitle(record.data.name + '-' + record.data.developername)
		var param = {};
		param.pid = record.data.id;
		me.getResultGrid().getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
		me.getResultGrid().refresh();
	},
	/**
	 * 保存Result表的修改
	 */
	saveResult:function(){
		var me = this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一位开发者的结算表");
			return;
		}
		//如果不是编辑状态,并且不是发布被驳回状态,就不让保存.
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='0'&&state!='1.5'){
			Ext.popup.Msg('提示信息', "该结算单已发布");
			return;
		}
		var stroe = me.getResultGrid().getStore();
        var updateRecords = stroe.getUpdatedRecords();//获得修改过的数据
        if(updateRecords.length==0){
			Ext.popup.Msg('提示信息', "没有修改的数据,无需保存");
			return;
		}
        var updateParams = [];
        Ext.each(updateRecords, function (item) {
            updateParams.push(item.data);
        });
        Ext.Ajax.request({
        	url : me.getUrl('saveResult'),
		    mask: true,
		    params: {
		    	"paramList":Ext.JSON.encode(updateParams)
		    },
            success: function () {
            	me.getResultGrid().loadPage(1);
            }
        })
	},
	/**
	 * 发布结算表
	 */
	publishResult:function(){
		var me=this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请选择一位开发者的结算表");
			return;
		}
		//如果不是编辑状态,并且不是发布被驳回状态,就不让发布.
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='0'&&state!='1.5'){
			Ext.popup.Msg('提示信息', "该结算单已发布");
			return;
		}
		Ext.Msg.show({
			title:'提示信息',
			msg: '确定发布该开发者的结算表吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: function(buttonId){
				if(buttonId == 'ok'){
					var me = this;
					var id = me.getTrackGrid().getSelectedRecordId();
					var trackstatus = '1';
					this.updateTrack(id,trackstatus)
				}
			},
			scope: this
    	});
	},
	/**
	 * 运营商确认
	 */
	operatorsChecked:function(){
		var me = this;
		if (!me.getTrackGrid().isSelected()) {
			Ext.popup.Msg('提示信息', "请在左侧选择一张结算表");
			return;
		}
		//不是已上传发票状态就不需要最终确认
		var state = me.getTrackGrid().getSelectedCellValue('trackstatus');
		if(state!='3'){
			Ext.popup.Msg('提示信息', "无需确认结算表");
			return;
		}
		//把id付给CheckInvoiceFormWin
		var win = me.getCheckInvoiceFormWin();
		
		win.id = me.getTrackGrid().getSelectedRecordId();
		var title = me.getTrackGrid().getSelectedCellValue('name')+'-'+me.getTrackGrid().getSelectedCellValue('developername');
		win.setTitle(title);
		win.down('baseFormPanel').resetFields();
		win.show();
	},
	/**
	 * 更新track的状态
	 */
	updateTrack:function(id,trackstatus){
		var me = this;
		Ext.Ajax.request({
			url:me.getUrl('updatePreviewTrack'),
		    mask: true,
		    params: {
		    	id: id,
		    	trackstatus : trackstatus
		    },
		    success: function(response){
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
		var win = Ext.create('MyApp.ux.dataview.DataViewWin',{}).show();
		//参数 加载该结算单的发票
		var param= {};
		param.fileid=me.getTrackGrid().getSelectedRecordId();
		win.loadImg(param);
	},
	/**
	 * 通过发票(最终确认入账)---驳回发票   修改track状态
	 */
	passOrRejectInvoice:function(btn){
		var me = this ;
		Ext.Ajax.request({
			url:me.getUrl('updatePreviewTrack'),
		    mask: true,
		    method : 'POST',
		    params: {
		    	id: me.getCheckInvoiceFormWin().id,
		    	trackstatus : btn.state,
		    	trackdescription : me.getCheckInvoiceFormWin().down('baseFormPanel').getFieldValue('note')
		    },
		    success: function(response){
		    	me.getCheckInvoiceFormWin().hide();
				me.getTrackGrid().refresh();
		    }
		});
	},
	/**
	 * 导出合作伙伴的计算单
	 */
	exportPartnerResult:function(){
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
			fn: this.doExportPartnerResult,
			scope: this
    	});
	},
	doExportPartnerResult:function(buttonId){
		var me = this;
		if(buttonId == "ok") {
    		Ext.Ajax.request({
    		    url: me.getUrl('importPartnerResult'),
    		    mask: true,
    		    params: {
    		    	trackId: me.getTrackGrid().getSelectedRecordId()
    		    },
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        var excelname = me.getResultGrid().title + '结算单';
    		        if(result.success) {
    		        	location.href = 'PreviewController.do?method=sendToBrowser&excelname='+encodeURI(encodeURI(excelname))+'&key=' + result.data;
    		        }
    		    }
    		});
    	}
	},
	/**
	 * 导出所有app的excel
	 */
	exportAllApp:function(){
		this.getExportAllAppFormWin().down('baseFormPanel').resetFields();
		this.getExportAllAppFormWin().show();
	},
	/**
	 * 确认导出所有app到excel
	 */
	saveExportAllApp:function(){
		var me = this;
		var form = me.getExportAllAppFormWin().down('baseFormPanel');
		if(!form.isValid()){//验证没通过 返回
			return;
		}
		var zhangqi = form.getFieldValue('zhangqi');
		Ext.Ajax.request({
    		    url: me.getUrl('savaExportAllApp'),
    		    mask: true,
    		    params: {
    		    	zhangqi: zhangqi
    		    },
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        if(result.success) {
    		        	location.href = 'PreviewController.do?method=sendToBrowser&excelname='+encodeURI(encodeURI(zhangqi+'所有应用结算单'))+'&key=' + result.data;
    		        }
    		    }
		});
	}
});
