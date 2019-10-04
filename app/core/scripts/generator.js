const request = require('request');

/**
 * SPARCITY_FACTOR determines how dense the graph will be
 * if <= 0.5 no nodes will be connected. For large
 * graphs is quite sensitive.
 */
const SPARCITY_FACTOR = 0.501;

/**
 * MATRIX_SIZE determines the size of each adjacency matrix.
 * A max size of 500 nodes is enforced.
 */
const MATRIX_SIZE = 500;

/**
 * MATRIX_CT determines the number of adjacency matrices to
 * send to the API. Graphs larger than 500 nodes will
 * need to utilize multiple matrices. Note that there
 * will be no group overlap between adjacency
 * matrices.
 */
const MATRIX_CT = 2;

/**
 * Generates MATRIX_CT square adjacency matrices of size
 * MATRIX SIZE via the API. Utilizes the SPARCITY_FACTOR
 * to determine how sparse each resulting graph is.
 *
 * Once all matrices are created, makes a request to get
 * number of groups in full graph.
 *
 * Finally deletes the existing graph.
 */
let p = createMatrixAsync(MATRIX_SIZE);

let ct = 1;
while (ct < MATRIX_CT) {
    p = p.then(() => createMatrixAsync(MATRIX_SIZE));
    ct++;
}

p.then(getGroupsAsync)
    .then(console.log)
    .then(deleteNodesAsync)
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

/**
 * generateRandomMatrix generates a random undirected adjacency matrix
 * of a given size (max. 500 nodes). Not that every node is considered
 * connected to itself for the 'KNOWS' relationship defined by the
 * API.
 *
 * @param {Number} size - the number of nodes to generate for the adjacency
 *                        matrix
 *
 * @returns {Array<Array<Number>>}
 */
function generateRandomMatrix(size = 500) {
    size = Math.min(500, size);

    const res = [];
    for (let i = 0; i < size; i++) {
        const stamp = new Array(size)
            .fill(0)
            .map((_, innerIdx) => {
                if (innerIdx === i) {
                    return 1;
                }

                if (innerIdx < i) {
                    return res[innerIdx][i];
                }

                return Math.round(Math.random() * SPARCITY_FACTOR);
            });

        res.push(stamp);
    }

    return res;
}

/**
 * createMatrixAsync makes a request to the API to generate a
 * graph from a single adjacency matrix of a given size.
 *
 * @param {Number} size - number of nodes in adjacency matrix
 *
 * @returns {Promise}
 */
function createMatrixAsync(size = 500) {
    var options = {
        uri: 'http://localhost:3000/matrix',
        method: 'POST',
        json: {
            data: generateRandomMatrix(size)
        }
    };

    return new Promise(
        (resolve, reject) => {
            request(
                options,
                (error, response) => {
                    if (!error && response.statusCode === 204) {
                        return resolve(true);
                    }

                    return reject(error);
                }
            );

        }
    );

}

/**
 * getGroupsAsync retrieves groups stats for the given graph
 * associated with the API.
 *
 * @returns {Promise}
 */
function getGroupsAsync() {
    var options = {
        uri: 'http://localhost:3000/groups',
        method: 'GET'
    };

    return new Promise(
        (resolve, reject) => {
            request(
                options,
                (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        return resolve(body);
                    }

                    return reject(error);
                }
            );

        }
    );

}

/**
 * deleteNodesAsync deletes the current graph associated with the
 * API.
 *
 * @returns {Promise}
 */
function deleteNodesAsync() {
    var options = {
        uri: 'http://localhost:3000/nodes',
        method: 'DELETE'
    };

    return new Promise(
        (resolve, reject) => {
            request(
                options,
                (error, response) => {
                    if (!error && response.statusCode == 204) {
                        return resolve(true);
                    }

                    return reject(error);
                }
            );

        }
    );
}
