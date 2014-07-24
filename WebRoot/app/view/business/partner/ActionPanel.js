
Ext.define('MyApp.view.business.partner.ActionPanel', {
	extend : 'Ext.form.Panel',
	xtype : 'business_partner_actionPanel',
	frame : true,
	layout : {
		type : 'column'
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			defaults : {
				columnWidth : .25,
				//labelWidth:60,
				margin : 5,
				xtype : 'textfield'
			},
			items : [ {
				fieldLabel : '供应商编号',
				maxLength : 50,
				vtype : 'alphanum',//只能字母数字
				labelWidth : 80,
				name : 'pcode'
			},{
				fieldLabel : '供应商名称',
				maxLength : 100,
				vtype : 'chinese',
				labelWidth : 80,
				name : 'name'
			},{
				fieldLabel : '开发者或渠道ID',
				maxLength : 50,
				vtype : 'alphanum',//只能字母数字
				name : 'channelid'
			},{
				xtype : 'radiogroup',
				fieldLabel : '是否渠道',
				items : [ {
					xtype : 'radiofield',
					inputValue : 1,
					name : 'ischannel',
					//checked : true,
					boxLabel : '是'
				}, {
					xtype : 'radiofield',
					inputValue : 0,
					name : 'ischannel',
					boxLabel : '否'
				} ]
			}/*, {
				xtype:'datefield',
				format:'Y-m-d',
				fieldLabel : '开始日期',
				name : 'starttime'
			},{
				xtype:'datefield',
				format:'Y-m-d',
				fieldLabel : '结束日期',
				name : 'endtime'
			}*/],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'top',
				ui : 'footer',
				defaults : {
					scale : 'medium',
					iconAlign : 'top',
					xtype : 'button'
				},
				items : [ {
					xtype : 'tbfill'
				}, {
					text : '新增合作伙伴',
					iconCls : 'action_add_24',
					action : 'add'
				}, {
					text : '编辑基本信息',
					iconCls : 'action_eidtfile_24',
					action : 'edit'
				}/*, {
					text : '更改发布状态',
					iconCls : 'action_keyreset_24',
					action : 'update'
				}*/, {
					text : '删除数据',
					iconCls : 'action_delete_24',
					action : 'delete'
				}, {
					text : '清空条件',
					iconCls : 'action-empty-24',
					action : 'empty'
				}, {
					text : '数据条件查询',
					iconCls : 'action_search_24',
					action : 'search'
				}, {
					text : '渠道信息',
					hidden : true,
					iconCls : 'action_detail_24',
					action : 'showChannel'
				},{
					xtype : 'tbfill'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});