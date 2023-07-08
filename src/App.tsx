import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "reactflow";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import "./App.css";
import "reactflow/dist/style.css";
import Split from "react-split";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-2", source: "2", target: "3" },
];

function App() {
  const boilerPlate = `function createSystem() {
    // write code here
}`;

  const handleChange = (value: string) => {
    console.log(value.replaceAll("\n", "zzz"));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Split className="split" sizes={[20, 80]}>
      <div className="h-full bg-red" style={{ height: "100%" }}>
        <CodeMirror
          value={boilerPlate}
          theme={vscodeDark}
          onChange={handleChange}
          extensions={[javascript()]}
          style={{ fontSize: "16px" }}
        />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={{ hideAttribution: true }}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </Split>
  );
}

export default App;
