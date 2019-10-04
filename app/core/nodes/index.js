module.exports = {
    init
};

/**
 * init initializes a nodes module with a specific
 * Neo4j session in scope.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Object}
 */
function init(session) {
    return {
        allAsync: allAsync(session),
        createAsync: createAsync(session),
        deleteAllAsync: deleteAllAsync(session)
    };

}

/**
 * allAsync returns a callback with a given Neo4j session in
 * scope to query the graph for all nodes.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Function}
 */
function allAsync(session) {
    return async () => {
        const result = await session.run(
            'MATCH (n) RETURN n'
        );

        return result.records
            .map(neo4jToObject);
    };

}

/**
 * createAsync returns a callback with a given Neo4j session in
 * scope to create a node with a provided name.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Function}
 */
function createAsync(session) {
    return async (name) => {
        const result = await session.run(
            'CREATE (n:Person {name: $name}) RETURN n',
            { name }
        );

        const singleRecord = result.records[0];
        return neo4jToObject(singleRecord);
    };

}

/**
 * deleteAllAsync returns a callback with a given Neo4j session in
 * scope to delete all nodes in the graph.
 *
 * @param {Object} session - a Neo4j session
 *
 * @returns {Function}
 */
function deleteAllAsync(session) {
    return async () => {
        await session.run(
            'MATCH (n) DETACH DELETE n'
        );

        return true;
    };

}

/**
 * neo4jToObject returns a basic node object given
 * a raw neo4j record.
 *
 * @param {Object} record - a neo4j node record
 *
 * @returns {Object}
 */
function neo4jToObject(record) {
    const clean = record.get(0);
    return {
        id: clean.identity.toInt(),
        attributes: clean.properties
    };
}
