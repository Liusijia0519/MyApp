Ext.define("MyApp.base.BaseTextArea", {
	extend: "Ext.form.field.TextArea",
	xtype: "BaseTextArea",
	
	editor: null,
	
	initComponent: function() {
        this.callParent();
        this.on("afterrender", this.handlerAfterrender);
    },
    
    handlerAfterrender: function(txa, eOpts) {
		var editor = CKEDITOR.replace(txa.getInputId());  
		CKFinder.setupCKEditor(editor,'/ckeditor/');
		txa.editor = editor;
    },
    
    getSubmitValue: function() {
    	this.editor.updateElement();
    	return this.callParent();
    },
    
    setValue: function(value) {
    	if(value) {
    		this.editor.setData(value);
    	} else {
    		if(this.editor != null) {
    			this.editor.setData("");
    		}
    	}
    	return this.callParent(arguments);
    }
});