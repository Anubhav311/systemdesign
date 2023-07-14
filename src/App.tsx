import { useState, useEffect } from "react";
import "./App.css";
import "reactflow/dist/style.css";
import Split from "react-split";
import EditorView from "./components/EditorView";
import { useLocalStorage } from "react-use";
import type { DMMF } from "@prisma/generator-helper";
import FlowView from "./components/FlowView";
import { fromUrlSafeB64 } from "./utils";
import { ErrorTypes, SchemaError } from "./utils/types";
import { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import CopyButton from "./components/CopyButton";
import axios from "axios";
import Playground from "./components/Playground";

function App() {
  return (
    <div>
      <Playground />
    </div>
  );
}

export default App;
