Ext.define('MyApp.store.TreeMenuStore', {
    extend: 'Ext.data.TreeStore',
    storeId : "treeSotreMenu",
    root: {
        expanded: true,
        children: [
            { text: "detention", leaf: true },
            { text: "homework", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "algebra", leaf: true}
            ] },
            { text: "buy lottery tickets", leaf: true }
        ]
    }
    /*proxy: {
        type: 'ajax',
        url: '/users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    autoLoad: true*/
});