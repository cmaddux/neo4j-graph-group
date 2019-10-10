A large solution to a simple graph-related coding challenge trying out Node.js fastify and Neo4j.

## Requirements

* Docker and compose
* Node and NPM

## The Problem

Given an adjacency matrix with undirected edges between nodes, determine how many distinct groups of nodes exist. Count an individual node with no edges as its own group.

## The Solution

This uses a containerized Neo4j graph database and a Node.js API (using Fastify) to generate a solution. The API exposes the following endpoints relevant for the problem:

`POST /matrix` - provide a JSON body object containing the adjancency matrix under a `data` key. The API will generate the graph with Neo4j.

`GET /groups` - returns the number of nodes in the graph, number of distinct node groups, and some stats on performance.

Some other helpful endpoints are also exposed:

`GET /nodes` - returns all nodes in the graph

`POST /nodes` - provide a JSON body that looks like this to create a single node, returns info on the new node.

```js
{
    "data": {
        "attributes": {
            "name": "Jim Bob"
        }
    }
}
```

`DELETE /nodes` - deletes all nodes in the graph

`POST /edges/{person_id}/knows/{person_id}` - create a relationship between two nodes by providing their IDs.

## Try it

1. Clone the repo
2. Move into the app/core directory
3. Run `npm install`
4. Run `npm test` to make sure everything OK
5. Move into the repo root directory
6. Run `docker-compose up`
7. Make a `POST /matrix` request 

```
curl -X POST \
http://localhost:3000/matrix \
-H 'Content-Type: application/json' \
-d '{
    "data": [
        [1, 1, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ]
}'
```

* Make a `GET /groups` request

```
curl -X GET http://localhost:3000/groups
```

## Notes

If you want to take a look at the current state of te graph, go to http://localhost:7474, put a cypher query in the search bar and press play button at the top right:

`MATCH (n) RETURN n`

If you want to try to make a large random graph, use the script in `app/core/scripts`. Constants can be modified to change the size of the graph, then run `node generator` to build the graph, calculate and print groups and tear down the graph (by default builds a 1k node graph with random edges).

Note that for large graphs, increasing the `SPARCITY_FACTOR` even just a tiny bit creates a much more interconnected graph and will make it take longer to build the graph.
