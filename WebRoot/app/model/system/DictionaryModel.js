Ext.define('MyApp.model.system.DictionaryModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', mapping: 'id'},
		{name: 'text', mapping: 'text'},
		{name: 'parentId', mapping: 'parentId'},
		{name: 'index', mapping: 'index'},
		{name: 'dictionaryTypeCode', mapping: 'dictionaryTypeCode'},
		{name: 'availabl',mapping: 'availabl'}
    ]
});