import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  FitViewOptions,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import { jsonToElements } from "../utils/jsonToElements";

// import CustomNode from './CustomNode';

// const initialNodes: Node[] = [
//   { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
// ];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

// const defaultEdgeOptions: DefaultEdgeOptions = {
//   animated: true,
// };

// const nodeTypes: NodeTypes = {
//   custom: CustomNode,
// };

// import "./text-updater-node.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };
export interface FlowViewProps {
  json: string;
}

function Flow({ json }: FlowViewProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const nodes = jsonToElements(json);
    //   : ({ nodes: [], edges: [] } as DMMFToElementsResult);
    // See if `applyNodeChanges` can work here?
    setNodes(nodes);
    // setEdges(edges);
  }, [json]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

export default Flow;
