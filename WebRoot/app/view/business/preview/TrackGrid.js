
Ext.define('MyApp.view.business.preview.TrackGrid', {
	extend : 'MyApp.base.BaseGridPanel',
	xtype : 'business_preview_TrackGrid',
	frame : true,
	split: true,//可拖拽拉宽度
	title : '账期',
	collapsible : true,// 可伸缩
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			store : Ext.create('MyApp.store.business.PreviewTrackStore', {
				autoLoad : true 
			}),
			 
			columns : [ {
				text : 'id',
				hidden:true,
				dataIndex : 'id',
				flex : 1
			}, {
				text : '帐期',
				dataIndex : 'name',
				flex : 1.3
			}, {
				text : '渠道或开发者名称',
				dataIndex : 'developername',
				flex : 3
			}, {
				text : '渠道或开发者ID',
				hidden:true,
				dataIndex : 'developerid',
				flex : 1.5
			}, {
				text : '审核状态',
				dataIndex : 'trackstatus',
				flex : 2,
				renderer: function(value){
			        if (value == 0) {
			            return '编辑';
			        }
			        if (value == 1) {
			            return '发布';
			        }
			        if (value == 1.5) {
			            return '<span style="color:red;">发布被驳回</span>';
			        }
			        if (value == 2) {
			            return '开发者已确认';
			        }
			        if (value == 3) {
			            return '<span style="color:#FF9900;">发票已上传</span>';
			        }
			        if (value == 3.5) {
			            return '发票被驳回';
			        }
			        if (value == 4) {
			            return '<span style="color:#00FF00;">运营商已确认</span>';
			        }
			    }
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				ui : 'footer',
				dock : 'top',
				defaults : {
					scale : 'medium',
					xtype : 'button'
				},
				items : [ {
					text : '获取账期',
					iconCls : 'action-calculator-24',
					action : 'import'
				}

				]
			} ]
		});
		me.callParent(arguments);
	},
	plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>审核描述:</b> {trackdescription}</p><br>'
        )
    }]
});