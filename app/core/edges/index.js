module.exports = {
    init
};

/**
 * init initializes the edges module with a specific
 * Neo4j session in scope.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Object}
 */
function init(session) {
    return {
        createAsync: createAsync(session)
    };

}

/**
 * createAsync produces a callback to create an edge between
 * two nodes with provided IDs, using scoped session.
 *
 * The relationships is hard-coded as a KNOWS relationship.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Function}
 */
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
