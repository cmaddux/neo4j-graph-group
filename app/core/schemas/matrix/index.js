const createSchema = {
    type: 'object',
    required: [ 'data' ],
    properties: {
        data: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    type: 'number',
                    enum: [0, 1]
                }
            }
        }
    }
};

module.exports = {
    createSchema
};
