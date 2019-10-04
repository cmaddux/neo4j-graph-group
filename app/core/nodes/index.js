module.exports = {
    init
};

function init(session) {
    return {
        createAsync: createAsync(session)
    };

}

function createAsync(session) {
    return async (name) => {
        const result = await session.run(
            'CREATE (n:Person {name: $name}) RETURN n',
            { name }
        );

        const singleRecord = result.records[0];
        return singleRecord.get(0);
    };

}
