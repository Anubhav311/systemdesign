import listTree from "@iconify/icons-gg/list-tree";
import { Icon } from "@iconify/react";
import { ElkNode } from "elkjs/lib/elk.bundled";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  OnNodesChange,
} from "reactflow";

import EnumNode from "./EnumNode";
import ModelNode from "./ModelNode";
import RelationEdge from "./RelationEdge";
import { dmmfToElements } from "../utils/dmmfToElements";
import { getLayout } from "../utils/layout";
import { DMMFToElementsResult } from "../utils/types";

import type { DMMF } from "@prisma/generator-helper";
import { jsonToElements } from "../utils/jsonToElements";
import ClientNode from "./ClientNode";

const nodeTypes = {
  model: ModelNode,
  enum: EnumNode,
  client: ClientNode,
};

const edgeTypes = {
  relation: RelationEdge,
};

const FlowView = ({ dmmf }: FlowViewProps) => {
  // TODO: move to controlled nodes/edges, and change this to generate a NodeChanges[] as a diff so that positions gets preserved.
  // Will be more complex but gives us better control over how they're handled, and makes storing locations EZ.
  // https://reactflow.dev/docs/guides/migrate-to-v10/#11-controlled-nodes-and-edges
  const [layout, setLayout] = useState<ElkNode | null>(null);
  const [nodes, setNodes] = useState<DMMFToElementsResult["nodes"]>([]);
  const [edges, setEdges] = useState<DMMFToElementsResult["edges"]>([]);
  // const [nodes, edges, loading] = useJsonToGraph(dmmf);

  useEffect(() => {
    const { nodes, edges } = dmmf
      ? jsonToElements(dmmf)
      : // ? dmmfToElements(dmmf, layout)
        ({ nodes: [], edges: [] } as DMMFToElementsResult);
    // See if `applyNodeChanges` can work here?
    setNodes(nodes);
    setEdges(edges);
  }, [dmmf, layout]);

  const refreshLayout = useCallback(async () => {
    const layout = await getLayout(nodes, edges);
    setLayout(layout);
  }, [nodes, edges]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodes) => applyNodeChanges(changes, nodes as any) as any),
    [setNodes]
  );
  console.log(nodes);
  console.log(edges);
  return (
    <>
      <ReactFlow
        // nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        minZoom={0.05}
        onNodesChange={onNodesChange}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={4}
          color="currentColor"
          className="text-gray-200"
        />
        <Controls>
          <ControlButton title="Disperse nodes" onClick={refreshLayout}>
            <Icon icon={listTree} />
          </ControlButton>
          {/* <DownloadButton /> */}
        </Controls>
      </ReactFlow>
      <svg width="0" height="0">
        <defs>
          <marker
            id="prismaliser-one"
            markerWidth="12.5"
            markerHeight="12.5"
            // eslint-disable-next-line react/no-unknown-property
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeWidth="3"
              strokeLinecap="square"
              fill="none"
              points="-10,-8 -10,8"
            />
          </marker>

          <marker
            id="prismaliser-many"
            markerWidth="12.5"
            markerHeight="12.5"
            // eslint-disable-next-line react/no-unknown-property
            viewBox="-10 -10 20 20"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="text-gray-400 stroke-current"
              strokeLinejoin="round"
              strokeLinecap="square"
              strokeWidth="1.5"
              fill="none"
              points="0,-8 -10,0 0,8"
            />
          </marker>
        </defs>
      </svg>
    </>
  );
};

export interface FlowViewProps {
  dmmf: string;
  // dmmf: DMMF.Datamodel | null;
}

export default FlowView;

function useJsonToGraph(json: string) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (json !== undefined) {
      const parentObject = JSON.parse(json);

      const getProblem = async () => {
        setLoading(true);
        const nodes = parentObject.nodes.map((object, idx) => {
          const node = { ...object, data: { label: object.label } };
          delete node.label;
          return node;
        });
        setNodes(nodes);
        const edges = parentObject.connections.map((object, idx) => {
          const edge = { ...object };
          return edge;
        });
        setEdges(edges);
        setLoading(false);
      };

      getProblem();
    }
  }, [json]);
  return { nodes, edges, loading };
}
