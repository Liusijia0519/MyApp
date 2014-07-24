

Ext.define('MyApp.view.business.partner.Form', {
	extend : 'MyApp.base.BaseFormPanel',
	xtype : 'business_partner_Form',
	border : true,
	autoScroll : true,
	defaults : {
		readOnly:true
		//labelAlign: 'top',
		//labelWidth: 100,
		//labelStyle: 'font-weight:bold',
		//columnWidth : 1,
		//margin : 5,
		//xtype : 'textfield'
	},
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    fieldDefaults: {
        labelAlign: 'top',
        //labelWidth: 100
        labelStyle: 'font-weight:bold'
    },
    defaults : {
		//readOnly:true,
		xtype: 'textfield'
	},
	/*layout : {
		type : 'column'
	},*/
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items: [/*{
                xtype: 'fieldcontainer',
                fieldLabel: 'Your Name',
                //labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'textfield',
                fieldDefaults: {
                    labelAlign: 'top'
                },

                items: [{
                    flex: 1,
                    name: 'firstName',
                    itemId: 'firstName',
                    fieldLabel: '反对法'
                }, {
                    width: 30,
                    name: 'middleInitial',
                    fieldLabel: 'MI',
                    margins: '0 0 0 5'
                }, {
                    flex: 2,
                    name: 'lastName',
                    fieldLabel: 'Last',
                    margins: '0 0 0 5'
                }]
            },*/ {
				xtype : 'hidden',
				name : 'id'
			},{
				fieldLabel : '供应商类型',
				vtype : 'chinese',
				maxLength : 20,
				name : 'pcatalog'
			},{
				fieldLabel : '纳税登记编号',
				vtype:'alphanum',
				maxLength : 20,
				name : 'taxcode'
			},{
				fieldLabel : '国家',
				maxLength : 15,
				vtype : 'chinese',
				name : 'country'
			},{
				fieldLabel : '省份',
				maxLength : 20,
				vtype : 'chinese',
				name : 'province'
			},{
				fieldLabel : '城市',
				maxLength : 20,
				vtype : 'chinese',
				name : 'city'
			},{
				fieldLabel : '地点名称',
				maxLength : 50,
				vtype : 'noPunctuation',
				name : 'address'
			},{
				fieldLabel : '地址行1',
				maxLength : 50,
				vtype : 'noPunctuation',
				name : 'address1'
			},{
				fieldLabel : '地址行2',
				maxLength : 50,
				vtype : 'noPunctuation',
				name : 'address2'
			},{
				xtype : 'fieldcontainer',
				fieldLabel : '是否关联交易方',
				defaultType : 'radiofield',
				defaults : {
					flex : 1
				},
				layout : 'hbox',
				items : [ {
					boxLabel : '是',
					checked : true,
					name : 'related',
					inputValue : 1
				}, {
					boxLabel : '否',
					name : 'related',
					inputValue : 0
				} ]
			},{
				fieldLabel : '银行所属省',
				maxLength : 20,
				vtype : 'chinese',
				name : 'bankprovince'
			},{
				fieldLabel : '银行所属市',
				maxLength : 20,
				vtype : 'chinese',
				name : 'bankcity'
			},{
				fieldLabel : '银行名称',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'bankname'
			},{
				fieldLabel : '分行名称',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'bankbranch'
			},{
				fieldLabel : '银行帐号',
				vtype:'number',
				maxLength : 30,
				name : 'bankaccount'
			},{
				fieldLabel : '银行帐户名称',
				maxLength : 30,
				vtype : 'chinese',
				name : 'bankaccountname'
			},{
				fieldLabel : '银行中间码（帐户后缀）',
				vtype:'number',
				maxLength : 10,
				name : 'bankmidcode'
			},{
				fieldLabel : '银行收款行联行号（辅助帐户参考）',
				vtype:'number',
				maxLength : 30,
				name : 'bankrecivedcode'
			},{
				fieldLabel : 'CNAPS行号（代理地点代码）',
				vtype:'alphanum',
				maxLength : 30,
				name : 'bankcnaps'
			},{
				fieldLabel : '发票类型',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billtype'
			},{
				fieldLabel : '付款币种',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billcurrency2'
			},{
				fieldLabel : '发票币种',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billcurrency'
			},{
				fieldLabel : '支付组',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billpaygroup'
			},{
				fieldLabel : '付款条件',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billcondition'
			},{
				fieldLabel : '匹配选项',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billmatch'
			},{
				fieldLabel : '自助发票付款方式',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billautotyp'
			},{
				fieldLabel : '自助发票汇总层',
				maxLength : 20,
				vtype : 'noPunctuation',
				name : 'billautopayment'
			}],
			buttons: [{
                text: '保存',
                action : 'update'
            }]
		});
		me.callParent(arguments);
	}
});