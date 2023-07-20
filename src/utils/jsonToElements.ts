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
    id: "1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123, label: "node" },
  },
];
export const jsonToElements = (json: string | null): Node[] => {
  if (json === null || json.length < 1) return [];
  console.log("dmmf: ", json);
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
  // const nodes = [
  //   ...parentObject.nodes.map((object: { label: any }, idx: number) => {
  //     const node = {
  //       ...object,
  //       data: { label: object.label },
  //       position: { x: 300, y: 50 },
  //     };
  //     delete node.label;
  //     return { ...node };
  //     // return { ...nodee };
  //   }),
  // ];
  //   edges: [
  //     ...parentObject.connections.map((object, idx) => {
  //       const edge = { ...object };
  //       return { ...edge };
  //       // return { ...edgee };
  //     }),
  //   ],
  // };
  return [...parentObject.nodes];
  // return nodes;
};
