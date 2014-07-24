Ext.define("MyApp.base.YesNoCombo", {
	extend : 'Ext.form.field.ComboBox',
	xtype : 'yesNoCombo',
	editable: false,
	yesText : '是',
	noText : '否',
	queryMode : 'local',
	displayField : 'text',
	valueField : 'code',
	initComponent : function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['code','text'],
			data:[
				{'code' : 0,'text' : this.noText}, 
				{'code' : 1,'text' : this.yesText}
			]
		});
		this.bindStore(store);
		this.callParent(arguments);
	}
});