/**
 * @class MyApp.ux.upload.FileSelectButton
 * @extends Ext.form.field.File
 * @description 扩展ExtJs filefield组件 支持多选
 * @author 葛新
 */
Ext.define("MyApp.ux.upload.FileSelectButton", {
	extend: 'Ext.form.field.File',
	xtype: 'fileSelectButton',
	
	buttonOnly: true,
	buttonText: '选择文件',
	buttonConfig: {
        iconCls: 'action_add_16'
	},

	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.addEvents('fileselected');
		me.on('afterrender', me.handlerAfterrender, me);
		me.on('change', me.handlerChange, me);
	},

	handlerAfterrender: function() {
		this.fileInputEl.dom.setAttribute('multiple', '1');
	},
	
	handlerChange: function(file, value, eOpts) {
		var fileList = file.fileInputEl.dom.files;
		this.fireEvent('fileselected', file, fileList);
	}
});