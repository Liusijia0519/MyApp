Ext.define('MyApp.view.business.home.Information', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_home_information',
	frame : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			store : Ext.create('MyApp.store.business.HomeInformationManagerStore', {
				autoLoad : false
			}),
			columns : [{
				text : 'id',
				dataIndex : 'id',
				hidden:true,
				flex : 1
			},  {
				text : '标题',
				dataIndex : 'wenjianbiaoti',
				renderer: function (val, metaData,record) {
                    if (record.data.xinxiliebie == 1) {
                        return '<span style="color:red;font-weight:bold;">' + val + '</span>';
                    } 
                    return val;
                },
				flex : 3
			},{
				text : '上报日期',
				dataIndex : 'shangbaoriqi',
				flex : 2
			},{
				text : '信息类别',
				dataIndex : 'xinxiliebie',
				flex : 1,
				renderer: function (val, metaData,record) {
                    if (val == 1) {
                        return '紧急';
                    } 
                    else{
                    	return '普通';
                    }
                }
			}]
		});
		me.callParent(arguments);
		me.store.proxy.extraParams = {searchParam: Ext.JSON.encode({shifotishi:1})};
		me.store.load();
	}
});