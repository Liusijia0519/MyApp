Ext.define('MyApp.model.MenuModel', {
    extend: 'Ext.data.Model',
    fields: ['id',{name:'text', mapping:'menuName'},
             'extController', 'menuClass', 'springController',
             'leaf', 'icon16', 'icon24', 'icon32',
             'icon48', 'order', 'parentID', 'children']
});