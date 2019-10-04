module.exports = {
    init
};

function init(session) {
    return {
        allAsync: allAsync(session),
        createAsync: createAsync(session)
    };

}

function allAsync(session) {
    return async () => {
        const result = await session.run(
            'MATCH (n) RETURN n'
        );

        return result.records
            .map(item => {
                const clean = item.toObject();
                return {
                    id: clean.identity.toInt(),
                    attributes: clean.properties
                };

            });
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
