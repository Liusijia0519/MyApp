Ext.define('MyApp.view.system.user.UserSelectControl', {
    extend: 'Ext.form.field.Trigger',
    xtype: 'system_user_userSelectControl',

    onTriggerClick: function() {
    	var me = this;
    	if(me.userWin == null) {
    		me.userWin = Ext.create("MyApp.view.system.user.UserWindow");
    	}
    	me.userWin.show();
    }
});


