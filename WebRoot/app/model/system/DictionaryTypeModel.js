Ext.define('MyApp.model.system.DictionaryTypeModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', mapping: 'id'},
		{name: 'text', mapping: 'text', convert: function(v, rec) {
			if(rec.get('id') == 'root') {
				return v;
			}
			if(rec.get('type') == 'tree') {
				return v + '(树状字典)';
			} 
			if(rec.get('type') == 'combo') {
				return v + '(普通字典)';
			}
			return v;
		}},
		{name: 'code', mapping: 'code'},
		{name: 'type',mapping: 'type'}
    ]
});