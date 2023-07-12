import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Handle,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  FitViewOptions,
  DefaultEdgeOptions,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  Instance,
} from "reactflow";
import TextUpdaterNode, { ServerNode } from "./Node";
import "reactflow/dist/style.css";

interface IGraphProps {}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "2",
    type: "serverNode",
    position: { x: 100, y: 100 },
    data: { value: 123 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-2", source: "2", target: "3" },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
const nodeStyle = {};
const isMobileFlow = typeof window !== "undefined" && window.innerWidth < 992;
const isLargeFlow = typeof window !== "undefined" && window.innerWidth > 1250;
const defaultNodes = [];

const defaultEdges = [
  {
    id: "color->hero",
    source: "color",
    target: "hero",
    targetHandle: "color",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: "zoom->hero",
    source: "zoom",
    target: "hero",
    targetHandle: "zoom",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: "shape->hero",
    source: "shape",
    target: "hero",
    targetHandle: "shape",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
];

const edges = [
  { id: "1-2", source: "1", target: "2", type: "step", label: "data" },
];
const nodeTypes = {
  input: TextUpdaterNode,
  value: ServerNode,
};

const Graph: React.FunctionComponent<IGraphProps> = (props) => {
  const { setNodes } = useReactFlow();
  const [value, setValue] = useState(12);

  const nodes: node[] = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello", value: value, onChange: setValue },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World", value: value, onChange: setValue },
      position: { x: 100, y: 100 },
      type: "value",
    },
  ];
  const [nodesState, setNodesState] = useState<Node[]>(nodes);
  const [edgesState, setEdgesState] = useState<Edge[]>(edges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      return setNodesState((nds) => {
        return applyNodeChanges(changes, nds);
      });
    },
    [setNodesState]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      console.log("edges changing");
      return setEdgesState((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdgesState]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdgesState((eds) => addEdge(connection, eds)),
    [setEdgesState]
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "color") {
          n.data = { ...n.data, value: value };
        }
        if (n.id === "hero") {
          n.data = { ...n.data, value };
        }
        return n;
      })
    );
  }, [value]);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // defaultNodes={defaultNodes}
        // defaultEdges={defaultEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        {/* <MiniMap /> */}
        {/* <Panel position="top-left">top-left</Panel>
        <Panel position="top-center">top-center</Panel>
        <Panel position="top-right">top-right</Panel>
        <Panel position="bottom-left">bottom-left</Panel>
        <Panel position="bottom-center">bottom-center</Panel>
        <Panel position="bottom-right">bottom-right</Panel> */}
        <Background gap={12} size={1} />
      </ReactFlow>
      {/* <Flow /> */}
    </div>
  );
};

export default Graph;
type node = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    value: number;
    onChange: React.Dispatch<React.SetStateAction<number>>;
  };
  type: string;
};

function Flow() {
  const { setNodes } = useReactFlow();
  const [value, setValue] = useState(12);

  const nodes: node[] = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello", value: value, onChange: setValue },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World", value: value, onChange: setValue },
      position: { x: 100, y: 100 },
      type: "value",
    },
  ];

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "color") {
          n.data = { ...n.data, value: value };
        }
        if (n.id === "hero") {
          n.data = { ...n.data, value };
        }
        return n;
      })
    );
  }, [value]);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
