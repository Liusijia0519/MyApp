
Ext.define('MyApp.view.business.process.TrackGrid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_process_TrackGrid',
	//frame : true,
	split : true,
	//border:false,
	title:'账期',
	collapsible:true,//可伸缩
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			 store : Ext.create('MyApp.store.business.ProcessTrackStore', {
			 autoLoad : false
			 }),
			columns : [ {
				text : 'id',
				hidden:true,
				dataIndex : 'id',
				flex : 1
			},{
				text : 'developerid',
				hidden:true,
				dataIndex : 'developerid',
				flex : 1
			}, {
				text : '帐期',
				dataIndex : 'name',
				flex : 1
			}, {
				text : '开发者名称',
				hidden:true,
				dataIndex : 'developername',
				flex : 3
			}, {
				text : '审核状态',
				dataIndex : 'trackstatus',
				flex : 1,
				renderer: function(value){
			        if (value == 0) {
			            return '编辑';
			        }
			        if (value == 1) {
			            return '<span style="color:#FF9900;">发布</span>';
			        }
			        if (value == 1.5) {
			            return '发布被驳回';
			        }
			        if (value == 2) {
			            return '<span style="color:#FF9900;">开发者已确认</span>';
			        }
			        if (value == 3) {
			            return '发票已上传';
			        }
			        if (value == 3.5) {
			            return '<span style="color:red;">发票被驳回</span>';
			        }
			        if (value == 4) {
			            return '<span style="color:#00FF00;">运营商已确认</span>';
			        }
			    }
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				//ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [ {
					text : '查看发票',
					iconCls : 'action_updateRecord_24',
					action : 'viewInvoice'
				}

				]
			} ]
		});
		me.callParent(arguments);
		var param = {};
    	param.myTrack = true;
		me.getStore().proxy.extraParams = {searchParam: Ext.JSON.encode(param)};
		me.store.load();
	},
	plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p>审核描述：{trackdescription}</p>'
        )
    }]
});