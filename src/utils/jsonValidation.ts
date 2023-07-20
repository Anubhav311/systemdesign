interface Node {
  id: number;
  type: "client" | "server";
  label: string;
}

interface Edge {
  id: number;
  type: "sendData" | "getData";
  source: number;
  target: number;
}

interface JSONData {
  nodes: Node[];
  edges: Edge[];
}

function isValidJSON(jsonData: any): jsonData is JSONData {
  const requiredRootFields = ["nodes", "edges"];
  const requiredNodesFields = ["id", "type", "label"];
  const requiredEdgesFields = ["id", "type", "source", "target"];

  for (const field of requiredRootFields) {
    if (!(field in jsonData)) {
      console.error(`Required field "${field}" is missing.`);
      return false;
    }
  }

  if (!Array.isArray(jsonData.nodes)) {
    console.error(`"nodes" field should be an array.`);
    return false;
  }

  if (!Array.isArray(jsonData.edges)) {
    console.error(`"edges" field should be an array.`);
    return false;
  }

  for (const node of jsonData.nodes) {
    if (!("id" in node) || !("type" in node) || !("label" in node)) {
      console.error(`Required field(s) in "nodes" array are missing.`);
      return false;
    }

    if (typeof node.id !== "number") {
      console.error(`"id" in "nodes" should be a number.`);
      return false;
    }

    if (!["client", "server"].includes(node.type)) {
      console.error(`"type" in "nodes" should be either "client" or "server".`);
      return false;
    }

    if (typeof node.label !== "string") {
      console.error(`"label" in "nodes" should be a string.`);
      return false;
    }
  }

  for (const edge of jsonData.edges) {
    if (
      !("id" in edge) ||
      !("type" in edge) ||
      !("source" in edge) ||
      !("target" in edge)
    ) {
      console.error(`Required field(s) in "edges" array are missing.`);
      return false;
    }

    if (typeof edge.id !== "number") {
      console.error(`"id" in "edges" should be a number.`);
      return false;
    }

    if (!["sendData", "getData"].includes(edge.type)) {
      console.error(
        `"type" in "edges" should be either "sendData" or "getData".`
      );
      return false;
    }

    if (typeof edge.source !== "number" || typeof edge.target !== "number") {
      console.error(`"source" and "target" in "edges" should be numbers.`);
      return false;
    }
  }

  return true;
}

// Example usage:
const jsonData = {
  nodes: [
    {
      id: 1,
      type: "client",
      label: "Client 1",
    },
  ],
  edges: [
    {
      id: 1,
      type: "sendData",
      source: 1,
      target: 2,
    },
  ],
};

console.log(isValidJSON(jsonData)); // Output: true

export default isValidJSON;
