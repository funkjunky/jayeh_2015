var ObjectId = require('mongodb').ObjectID;

var config = {
    mongo_url: 'mongodb://localhost:27017/jayeh',
    collections: {
        article: {
            create: {
                auth: 'publisher',
            },
            edit:   {
                auth: 'publisher',
            },
            delete: {
                auth: 'publisher',
            },
        },
        comment: {
            create: {
                auth: true,
                before: function(dbh, ctx, next) {
                    ctx.data.created_at = Date.now();
                    ctx.data.updated_at = Date.now();
                    next();
                },
            },
            edit: {
                auth: 'admin',
                before: function(dbh, ctx, next) {
                    ctx.data.updated_at = Date.now();
                    next();
                },
            },
            delete: {
                auth: 'admin',
            },
            find: {
                auth: false,
                after: function(dbh, ctx, next) {
                    var count = ctx.result.length;
                    ctx.result.forEach(function(comment) {
                        var user = dbh.collection('users').findOne({_id: ObjectId(comment.user_id)}, function(comment, err, user) {
                            comment.user = user;
                            if(!--count) {
                                next();
                                console.log('comments result: ', ctx.result);
                            }
                        }.bind(this, comment));
                    });
                },
            },
        },
    },
    groups: {
        admin: ['publisher'],
    },
}

module.exports = config;
