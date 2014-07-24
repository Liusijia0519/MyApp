Ext.define("MyApp.base.ValueCheckBox", {
	extend : 'Ext.form.FieldContainer',
	xtype : 'valuecheckbox',
	layout: 'checkboxgroup',
	textLabel: '分数',
	fieldName: '',
	checkLabel: '',

	initComponent : function(){
		var me = this;
		Ext.apply(me,{
			items:[{
				xtype: 'checkbox',
				fieldLabel: this.checkLabel,
				margin : '0 40 0 0'
			},{
				xtype: 'numberfield',
				name: this.fieldName,
				minValue: 0,
				fieldLabel: this.textLabel,
				getSubmitValue: function(){
					if(!me.down('checkbox').getValue()){
						return 0;
					}
						return this.processRawValue(this.getRawValue());
				}
			}]
		});
		this.callParent(arguments);
	}
});