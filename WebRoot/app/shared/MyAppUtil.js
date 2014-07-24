MyAppUtil = function() {
	var uuid;
	return {
		guid : function() {
			return uuid.generate();
		},
		
		init: function() {
			uuid = Ext.create("Ext.data.UuidGenerator");
		}
	};
}();

Ext.onReady(MyAppUtil.init, MyAppUtil);