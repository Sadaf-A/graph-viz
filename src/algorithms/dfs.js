import { adjacencyList } from "./adjList";

export const dfs = (nodes, lines, startNodeId, animateDFS) => {
    const adjList = adjacencyList(nodes, lines);
    const visited = new Set();
    const stack = [startNodeId];
    const traversalOrder = [];
    const edges = [];
  
    while (stack.length > 0) {
      const node = stack.pop();
      if (!visited.has(node)) {
        visited.add(node);
        traversalOrder.push(node);
        adjList[node].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
            edges.push({ from: node, to: neighbor });
          }
        });
      }
    }
  
    animateDFS(traversalOrder, edges);
  };