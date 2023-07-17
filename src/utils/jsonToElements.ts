import { Edge, Node } from "reactflow";

const nodee = {
  data: {
    dbName: null,
    documentation: undefined,
    name: "Role",
    tyep: "enum",
  },
  height: 128,
  id: "Role",
  position: { x: 0, y: 0 },
  type: "enum",
  width: 200,
};

const edgee = {
  id: "eUser-role-Role",
  source: "Role",
  sourceHandle: "Role",
  target: "User",
  targetHandle: "User-role",
  type: "smoothstep",
};
const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
export const jsonToElements = (json: string): Node[] => {
  // if (json === undefined) return;
  const parentObject = JSON.parse(json);

  //   const nodes = parentObject.nodes.map((object, idx) => {
  //     const node = { ...object, data: { label: object.label } };
  //     delete node.label;
  //     return node;
  //   });

  //   const edges = parentObject.connections.map((object, idx) => {
  //     const edge = { ...object };
  //     return edge;
  //   });

  // const x = {
  //   nodes: [
  //     ...parentObject.nodes.map((object, idx) => {
  //       const node = {
  //         ...object,
  //         data: { label: object.label },
  //         position: { x: 300, y: 50 },
  //       };
  //       delete node.label;
  //       return { ...node };
  //       // return { ...nodee };
  //     }),
  //   ],
  //   edges: [
  //     ...parentObject.connections.map((object, idx) => {
  //       const edge = { ...object };
  //       return { ...edge };
  //       // return { ...edgee };
  //     }),
  //   ],
  // };
  return [...initialNodes];
};
