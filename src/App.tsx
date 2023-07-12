import { useState, useEffect } from "react";
import "./App.css";
import "reactflow/dist/style.css";
import Split from "react-split";
import Graph from "./components/Graph";
import CodeEditor from "./components/CodeEditor";
import { ReactFlowProvider } from "reactflow";
import EditorView from "./components/EditorView";
import { useDebounce, useLocalStorage } from "react-use";
import type { DMMF } from "@prisma/generator-helper";
import FlowView from "./components/FlowView";
import { fromUrlSafeB64 } from "./utils";
import { ErrorTypes, SchemaError } from "./utils/types";
import { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import useFetch from "use-http";
import CopyButton from "./components/CopyButton";
import axios from "axios";

const initial = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id Int @id @default(autoincrement())
  createdAt DateTime @default(now())
  email String @unique
  name String?
  role Role @default(USER)
  posts Post[]
}

model Post {
  id Int @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean @default(false)
  title String @db.VarChar(255)
  author User? @relation(fields: [authorId], references: [id])
  authorId Int?
}

enum Role {
  USER
  ADMIN
}
`.trim();

function App() {
  const [storedText, setStoredText] = useLocalStorage(
    "prismaliser.text",
    initial
  );
  const [text, setText] = useState(storedText!);
  const [schemaErrors, setSchemaErrors] = useState<SchemaError[]>([]);
  const [dmmf, setDMMF] = useState<DMMF.Datamodel | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    const fetchData = async () => {
      if (!text) return;
      const resp = await axios({
        method: "POST",
        url: "http://localhost:5000/getDmmf",
        data: {
          schema: text,
        },
      });
      setDMMF(resp.data);
    };

    fetchData();
  }, [text]);

  // useDebounce(submit, 1000, [text]);

  useEffect(() => {
    // Set error squiggles in the editor if we have any
    if (!monaco) return;

    const markers = schemaErrors.map<editor.IMarkerData>((err) => ({
      message: err.reason,
      startLineNumber: Number(err.row),
      endLineNumber: Number(err.row),
      startColumn: 0,
      endColumn: 9999,
      severity: 8,
    }));
    const [model] = monaco.editor.getModels();

    monaco.editor.setModelMarkers(model, "prismaliser", markers);
  }, [monaco, schemaErrors]);

  useEffect(() => {
    // Populate state from a shared link if one is present
    const params = new URLSearchParams(window.location.search);

    if (params.has("code")) {
      const code = params.get("code")!;
      const decoded = fromUrlSafeB64(code);

      setText(decoded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Split className="split" sizes={[25, 75]}>
      {/* <CodeEditor /> */}
      <div className="">
        <EditorView value={text} onChange={(val) => setText(val!)} />
        <div>
          <CopyButton input={text} />

          {/* <button type="button" className="button floating" onClick={format}>
            Format
          </button> */}
        </div>
      </div>
      <div style={{ width: "100%", height: "100vh" }}>
        <FlowView dmmf={dmmf} />
      </div>

      {/* <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider> */}
    </Split>
  );
}

export default App;
