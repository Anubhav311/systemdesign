import { Edge, Node } from "reactflow";

export const jsonToElements = (json: string) => {
  if (json === undefined) return;
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

  const x = {
    nodes: [
      parentObject.nodes.map((object, idx) => {
        const node = {
          ...object,
          data: { label: object.label },
          position: { x: 300, y: 50 },
        };
        delete node.label;
        return node;
      }),
      //   ...data.enums.map((enumData) => generateEnumNode(enumData, layout)),
      //   ...[...data.models, ...implicitManyToMany].map((model) =>
      //     generateModelNode(model, relations, layout)
      //   ),
    ],
    edges: [
      parentObject.connections.map((object, idx) => {
        const edge = { ...object };
        return edge;
      }),
      //   ...enumFields.map(generateEnumEdge),
      //   ...Object.entries(relations).flatMap(generateRelationEdge),
    ],
  };
  return x;
};
