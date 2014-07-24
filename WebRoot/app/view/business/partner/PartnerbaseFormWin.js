
Ext.define('MyApp.view.business.partner.PartnerbaseFormWin', {
			extend : 'Ext.window.Window',
			xtype : 'business_partner_PartnerbaseFormWin',
			height : 310,
			width : 500,
			layout : {
				type : 'fit'
			},
			title : '编辑合作伙伴基本信息',

			initComponent : function() {
				var me = this;

				Ext.applyIf(me, {
							items : [{
										xtype : 'baseFormPanel',
										border : false,
										defaults : {
											columnWidth : 1,
											margin : 10,
											xtype : 'textfield',
											allowBlank : false,
											afterLabelTextTpl : requiredTpl
										},
										layout : {
											type : 'column'
										},
										autoScroll : true,
										bodyPadding : 10,
										title : '',
										items : [{
													xtype : 'hidden',
													name : 'id'
												}, {
													xtype : 'hidden',
													name : 'userid'
												}, {
													fieldLabel : '供应商编号',
													vtype : 'alphanum',//只能字母数字
													name : 'pcode'
												}, {
													fieldLabel : '供应商名称',
													name : 'name'
												}, {
													fieldLabel : '开发者或渠道ID',
													vtype : 'alphanum',//只能字母数字
													name : 'channelid'
												}, {
													xtype : 'fieldcontainer',
													fieldLabel : '是否渠道',
													defaultType : 'radiofield',
													defaults : {
														flex : 1
													},
													layout : 'hbox',
													items : [{
																boxLabel : '是',
																checked : true,
																name : 'ischannel',
																inputValue : 1
															}, {
																boxLabel : '否',
																name : 'ischannel',
																inputValue : 0
															}]
												}, {
													xtype : 'numberfield',
													name : 'payratio',
													fieldLabel : '结算比例',
													maxValue : 1,
													minValue : 0,
													step : 0.1,
													value : 0
												}]
									}],
							dockedItems : [{
										xtype : 'toolbar',
										dock : 'bottom',
										ui : 'footer',
										defaults : {
											scale : 'medium',
											xtype : 'button',
											margin : '0 3 0 3'
										},
										items : [{
													xtype : 'tbfill'
												}, {
													text : '保存数据',
													action : 'save',
													iconCls : 'action_save_24'
												}, {
													xtype : 'tbfill'
												}]
									}]
						});

				me.callParent(arguments);
			}

		});