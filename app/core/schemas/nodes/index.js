const createSchema = {
    type: 'object',
    required: [ 'data' ],
    properties: {
        data: {
            type: 'object',
            required: [ 'attributes' ],
            properties: {
                attributes: {
                    type: 'object',
                    required: [ 'name' ],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 255
                        }
                    }
                }
            }
        }
    }
};

module.exports = {
    createSchema
};
