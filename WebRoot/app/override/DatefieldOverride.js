Ext.override(Ext.form.field.Date, {
    remoteFormat: "Y-m-d H:i:s",
    setValue: function (val) {
        if (val && typeof (val) == "string") {
            val = Ext.Date.parse(val, this.remoteFormat, false);
        }
        this.callParent(arguments);
    }
});
