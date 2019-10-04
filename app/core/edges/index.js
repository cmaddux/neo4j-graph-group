module.exports = {
    init
};

function init(session) {
    return {
        createAsync: createAsync(session)
    };

}

function createAsync(session) {
    return (n1ID, n2ID) => {
        return session.run(
            'MATCH (a:Person),(b:Person) \
             WHERE ID(a) = toInteger($n1ID) \
             AND ID(b) = toInteger($n2ID) \
             MERGE (a)-[r:KNOWS]-(b) RETURN type(r)',
            {
                n1ID,
                n2ID
            }
        );

    };

}
