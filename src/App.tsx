import "./App.css";
import "reactflow/dist/style.css";
import Split from "react-split";
import Graph from "./components/Graph";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <Split className="split" sizes={[20, 80]}>
      <CodeEditor />
      <Graph />
    </Split>
  );
}

export default App;
