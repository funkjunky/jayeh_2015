var ObjectId = require('mongodb').ObjectID;

var setTimestamps = function(dbh, ctx, next) {
    if(!ctx.data.created_at)
        ctx.data.created_at = Date.now();
    ctx.data.updated_at = Date.now();
    next();
};

var config = {
    //if things stop working it may be because mongo_url is superceeding url_env
    mongo_url: 'mongodb://localhost:27017/jayeh',
    mongo_url_env: 'MONGOLAB_URI',  //superceds mongo_url. this env well be used in prod
    collections: {
        article: {
            create: {
                auth: ['publisher'],
                before: setTimestamps,
            },
            update:   {
                auth: ['publisher'],
                before: setTimestamps,
            },
            remove: {
                auth: ['publisher'],
            },
        },
        comment: {
            create: {
                auth: true,
                before: setTimestamps,
            },
            update: {
                auth: ['admin'],
                before: setTimestamps,
            },
            remove: {
                auth: ['admin'],
            },
            find: {
                auth: false,
                after: function(dbh, ctx, next) {
                    var count = ctx.result.length;
                    if(count == 0)
                        next();
                    ctx.result.forEach(function(comment) {
                        var user = dbh.collection('users').findOne({_id: ObjectId(comment.user_id)}, function(comment, err, user) {
                            comment.user = user;
                            if(!--count) {
                                console.log('comments result: ', ctx.result);
                                next();
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
