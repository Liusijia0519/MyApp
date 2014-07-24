
Ext.define('MyApp.view.business.partner.Grid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_partner_Grid',
	// frame : true,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			store : Ext.create('MyApp.store.business.PartnerBaseStore', {
				autoLoad : true
			}),
			columns : [ {
				text : 'id',
				hidden:true,
				dataIndex : 'id',
				flex : 1
			},{
				text : 'userid',
				hidden:true,
				dataIndex : 'userid',
				flex : 1
			}, {
				text : '供应商编号',
				dataIndex : 'pcode',
				flex : 1
			}, {
				text : '供应商名称',
				dataIndex : 'name',
				flex : 1
			}, {
				text : '开发者或渠道ID',
				dataIndex : 'channelid',
				flex : 1
			}, {
				text : '结算比例',
				dataIndex : 'payratio',
				flex : .5
			}, {
				text : '渠道',
				dataIndex : 'ischannel',
				region:'center',
                xtype: 'actioncolumn',
                width: 50,
                items: [ {
                    getClass: function(v, meta, rec) {
                        if (rec.get('ischannel') == 1) {
                            return 'businessIcons-accept';
                        } else {
                            return 'businessIcons-delete';
                        }
                    }
                }]
			} ]
		});
		me.callParent(arguments);
	}
});