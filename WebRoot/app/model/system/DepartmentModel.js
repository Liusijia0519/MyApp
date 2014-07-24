Ext.define('MyApp.model.system.DepartmentModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', mapping: 'id'},
		{name: 'text', mapping: 'departmentName'},
		{name: 'availabl', mapping: 'availabl'},
		{name: 'index',mapping: 'index'}
    ]
});