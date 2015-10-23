var config = {
    mongo_url: 'mongodb://localhost:27017/jayeh',
    collections: {
        article: {
            created: 'publisher',
            edited:   'publisher',
            deleted: 'publisher',
        },
        comment: {
            created: false,
            edited:   'admin',
            deleted: 'admin',
        },
    },
    groups: {
        admin: ['publisher'],
    },
}

module.exports = config;
