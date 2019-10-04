const request = require('request');

const SPARCITY_FACTOR = 0.501;
const MATRIX_SIZE = 500;
const MATRIX_CT = 2;

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
                    if (!error && response.statusCode == 204) {
                        return resolve(true);
                    }

                    return reject(error);
                }
            );

        }
    );

}

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
