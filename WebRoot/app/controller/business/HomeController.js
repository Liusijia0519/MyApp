/**
 * @class MyApp.controller.business.HomeController
 * @extends Ext.app.Controller
 * @description 首页
 * @author 葛新
 */
Ext.define('MyApp.controller.business.HomeController', {
	extend : 'Ext.app.Controller',

	//stores : [ 'business.NotificationMyReceiveStore'],

	//models : [ 'system.DepartmentModel'],

	views : ['business.home.ModelEntrance'
			],

	refs : [ {//刘思家
		ref : 'InformationManagerFormWin',
		selector : 'business_informationManager_informationManagerFormWin',
		autoCreate : true,
		xtype : 'business_informationManager_informationManagerFormWin'
	},{
		ref : 'InformationManagerGrid',//刘思家
		selector : 'business_home_information'
	},{
		ref: 'NotificationDetailFormWin',
		selector : 'business_home_notificationDetail',
		autoCreate : true,
		xtype : 'business_home_notificationDetail'
	},{
		ref : 'NotificationGrid',
		selector : 'business_home_notification'
	}],

	init : function() {
		var me = this;
		me.control({
			'business_home_information' : {//刘思家(信息上报管理表格双击事件)
				itemdblclick: me.editInformationManager
			},
			'business_informationManager_informationManagerFormWin button[action=save]' : {
				click : me.saveInformationManager
				//刘思家(保存信息)
			},
			'business_informationManager_informationManagerFormWin button[action=notWarn]' : {
				click : me.notWarn
				//刘思家( 不再提醒)
			},
			'business_home_notification': {
				itemdblclick: me.handlernotificationClick
			},
			'business_home_notificationDetail button[action=yuebi]' : {
				click: me.handlerYueBi
			}
			
		});
	},//刘思家
	editInformationManager:function(){
		var me=this;
		var grid = me.getInformationManagerGrid();
		var winform=me.getInformationManagerFormWin();
		winform.show();
		var form = winform.down('baseFormPanel');
		form.load({
					url : 'InformationController.do?method=getInformationById',
					params : {
						id : grid.getSelectedRecordId()
					},
					success: function() {
						form.down("#fieldcontainer business_informationManager_fileDataview").loadById(grid.getSelectedRecordId());//加载附件
					}
				});
		winform.setTitle("信息数据处理");
	},
	saveInformationManager:function(){
		Ext.Msg.show({
			title:'提示信息',
			msg: '确定保存数据吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: this.doSave,
			scope: this
    	});
	},
	doSave: function(buttonId) {
    	if(buttonId == 'ok') {
    		var me = this;
    		me.getInformationManagerFormWin().down('baseFormPanel').submit({
    			url:'InformationController.do?method=insertOrUpdateInformation',
				success: function() {
					me.getInformationManagerFormWin().close();
					me.getInformationManagerGrid().loadPage(1);
				}
			});
    	}
    },
    /**
     * 不再提醒
     */
    notWarn:function(){
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定不再提醒该条信息吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: this.doNotWarn,
			scope: this
    	});
    },
    doNotWarn:function(buttonId){
    	if(buttonId == 'ok') {
    		var me = this;
    		Ext.Ajax.request({
    			url:'InformationController.do?method=notWarn',
    		    mask: true,
    		    params: {
    		    	id: me.getInformationManagerFormWin().down('baseFormPanel').getFieldValue('id')
    		    },
    		    success: function(response){
    		    	me.getInformationManagerFormWin().close();
					me.getInformationManagerGrid().loadPage(1);
    		    }
    		});
    	}
    },
    
    handlernotificationClick: function(grid, record, item, index, e, eOpts) {
    	var form = this.getNotificationDetailFormWin().show();
    	var recordId = record.get('NotificationID');
    	form.down('baseFormPanel').load({
			url : 'NotificationController.do?method=selectByPrimaryKey',
			params: {
		        id: recordId
		    },
			success: function() {
				form.down("#fieldcontainer business_notification_fileDataview").loadById(recordId);
			}
		});	
    },
    
    handlerYueBi: function() {
    	var me = this;
    	Ext.Msg.show({
			title:'提示信息',
			msg: '确定阅毕该条通知公告吗?',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.QUESTION,
			fn: this.doYuebiReceive,
			scope: this
    	});
    },
    doYuebiReceive: function(buttonId) {
    	if(buttonId == "ok") {
    		var me = this;
    		Ext.Ajax.request({
    		    url: 'NotificationController.do?method=yuebi',
    		    mask: true,
    		    params: {
    		    	id: me.getNotificationGrid().getSelectedRecordId()
    		    },
    		    success: function(response){
    		        var text = response.responseText;
    		        var result = Ext.JSON.decode(text);
    		        if(result.success) {
    		        	me.getNotificationGrid().loadPage(1);
    		        }
    		    }
    		});    
    	}
    }
});
