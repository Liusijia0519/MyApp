Ext.define("MyApp.base.stateCombo", {
	extend : 'Ext.form.field.ComboBox',
	xtype : 'stateCombo',
	editable: false,
	queryMode : 'local',
	displayField : 'text',
	valueField : 'code',
	initComponent : function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['code','text'],
			data:[
				{'code' : 0,'text' : this.xinJian}, 
				{'code' : 1,'text' : this.shenYue},
				{'code' : 2,'text' : this.daiBan},
				{'code' : 3,'text' : this.faBu}
			]
		});
		this.bindStore(store);
		this.callParent(arguments);
	}
});