import { adjacencyList } from "./adjList";
  
  export const bfs = (nodes, lines, startNodeId, animateBFS) => {
    const adjList = adjacencyList(nodes, lines);
    const visited = new Set();
    const queue = [startNodeId];
    const traversalOrder = [];
    const edges = [];
  
    while (queue.length > 0) {
      const node = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        traversalOrder.push(node);
        adjList[node].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            edges.push({ source: node, dest: neighbor });
          }
        });
      }
    }
  
    animateBFS(traversalOrder, edges);
  };