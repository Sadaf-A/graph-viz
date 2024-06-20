export const adjacencyList = (nodes, lines) => {
    const list = {};
    nodes.forEach(node => list[node.id] = []);
    lines.forEach(line => {
      list[line.source].push(line.dest);
      list[line.dest].push(line.source);
    });
    return list;
  };