Ext.override(Ext.data.proxy.Proxy, {
	
    batch: function(options, /* deprecated */listeners) {
        var me = this,
            useBatch = me.batchActions,
            batch,
            records,
            actions, aLen, action, a, r, rLen, record;

        if (options.operations === undefined) {
            // the old-style (operations, listeners) signature was called
            // so convert to the single options argument syntax
            options = {
                operations: options,
                listeners: listeners
            };
        }

        if (options.batch) {
            if (Ext.isDefined(options.batch.runOperation)) {
                batch = Ext.applyIf(options.batch, {
                    proxy: me,
                    listeners: {}
                });
            }
        } else {
            options.batch = {
                proxy: me,
                listeners: options.listeners || {}
            };
        }

        if (!batch) {
            batch = new Ext.data.Batch(options.batch);
        }

        batch.on('complete', Ext.bind(me.onBatchComplete, me, [options], 0));

        actions = me.batchOrder.split(',');
        aLen    = actions.length;

        for (a = 0; a < aLen; a++) {
            action  = actions[a];
            records = options.operations[action];

            if (records) {
                if (useBatch) {
                    batch.add(new Ext.data.Operation({
                        action  : action,
                        records : records,
                        mask: options.mask ? options.mask : undefined
                    }));
                } else {
                    rLen = records.length;

                    for (r = 0; r < rLen; r++) {
                        record = records[r];

                        batch.add(new Ext.data.Operation({
                            action  : action,
                            records : [record],
                            mask: options.mask ? options.mask : undefined
                        }));
                    }
                }
            }
        }

        batch.start();
        return batch;
    }
});
