Ext.define('MyApp.view.business.home.Notification', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_home_notification',
	frame : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			store : Ext.create('MyApp.store.business.NotificationMyReceiveStore', {
				autoLoad : false
			}),
			columns : [ {
				text : 'id',
				dataIndex : 'id',
				hidden: true,
				flex : 1
			}, {
				text : 'NotificationID',
				dataIndex : 'NotificationID',
				hidden: true
			}, {
				text : '标题',
				dataIndex : 'BiaoTi',
              	renderer : function(val, metaData, record) {
                    if (record.get('XinXiLeiXing') == 1) {
                        return '<span style="color:' + '#cf4c35' + ';">' + val + '</span>';
                    }
                    return val;
                },
				flex : 4
			}, {
				text : '发布日期',
				dataIndex : 'FaBuRiQi',
				flex : 2
			}, {
				text : '信息类型',
				dataIndex : 'XinXiLeiXing',
				renderer: function(value) {
					return value == 0 ? '系统提示' : '紧急通知';
				},
				flex : 1
			}]
		});
		me.callParent(arguments);
		me.store.proxy.extraParams = {searchParam: Ext.JSON.encode({ShiFouYeuBi:0})};
		me.store.load();
	}
});