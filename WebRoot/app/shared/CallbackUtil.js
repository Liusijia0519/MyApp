Ext.define("CallbackUtil", {
	statics : {
		deleteNotificationFile : function(cmpId, fileId) {
			Ext.Msg.show({
				title : '提示信息',
				msg : '确定删除附件吗?',
				buttons : Ext.Msg.OKCANCEL,
				icon : Ext.Msg.QUESTION,
				fn : function(buttonId) {
					if(buttonId == "ok") {
						Ext.Ajax.request({
							url : 'NotificationController.do?method=deleteFileByPrimaryKey',
							mask : true,
							params : {
								id : fileId
							},
							success : function(response) {
								Ext.getCmp(cmpId).getStore().reload();
							}
						});						
					}
				}
			});
		},
		
		deleteInformationFile : function(cmpId, fileId) {
			Ext.Msg.show({
				title : '提示信息',
				msg : '确定删除附件吗?',
				buttons : Ext.Msg.OKCANCEL,
				icon : Ext.Msg.QUESTION,
				fn : function(buttonId) {
					if(buttonId == "ok") {
						Ext.Ajax.request({
							url : 'InformationController.do?method=deleteFileByPrimaryKey',
							mask : true,
							params : {
								id : fileId
							},
							success : function(response) {
								Ext.getCmp(cmpId).getStore().reload();
							}
						});						
					}
				}
			});
		},
		
		deletePeriodicalFile : function(cmpId, fileId) {
			Ext.Msg.show({
				title : '提示信息',
				msg : '确定删除附件吗?',
				buttons : Ext.Msg.OKCANCEL,
				icon : Ext.Msg.QUESTION,
				fn : function(buttonId) {
					if(buttonId == "ok") {
						Ext.Ajax.request({
							url : 'PeriodicalController.do?method=deleteFileByPrimaryKey',
							mask : true,
							params : {
								id : fileId
							},
							success : function(response) {
								Ext.getCmp(cmpId).getStore().reload();
							}
						});						
					}
				}
			});
		}
	}
});