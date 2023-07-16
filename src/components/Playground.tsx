import { useState, useEffect } from "react";
import "reactflow/dist/style.css";
import Split from "react-split";
import EditorView from "./EditorView";
import { useLocalStorage } from "react-use";
import type { DMMF } from "@prisma/generator-helper";
import FlowView from "./FlowView";
import { fromUrlSafeB64 } from "../utils";
import { ErrorTypes, SchemaError } from "../utils/types";
import { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import CopyButton from "./CopyButton";
import axios from "axios";
import { Mode } from "../utils/types";

const initialPrisma = `
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

const initialJson = JSON.stringify(
  {
    nodes: [
      {
        id: 1,
        type: "client",
        label: "Client",
      },
      {
        id: 2,
        type: "client",
        label: "Server",
      },
    ],
    connections: [
      {
        id: 1,
        type: "getData",
        source: 1,
        target: 2,
      },
    ],
  },
  null,
  2
);

function Playground() {
  // const [storedText, setStoredText] = useLocalStorage("json.text", initialJson);
  // const [mode, setMode] = useState<Mode>(Mode.JSON);
  // const [dmmf, setDMMF] = useState<string>(null);
  const [storedText, setStoredText] = useLocalStorage(
    "prisma.text",
    initialPrisma
  );
  const [text, setText] = useState(storedText!);
  const [schemaErrors, setSchemaErrors] = useState<SchemaError[]>([]);
  const [dmmf, setDMMF] = useState<DMMF.Datamodel | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    setStoredText(text);

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
    // setDMMF(text);
  }, [text]);

  useEffect(() => {
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
      <div className="">
        {/* <div className="w-full flex justify-around">
          <button onClick={() => setMode(Mode.JSON)}>JSON</button>
          <button onClick={() => setMode(Mode.PRISMA)}>PRISM</button>
        </div> */}
        <EditorView
          //   mode={mode}
          value={text}
          onChange={(val) => setText(val!)}
        />
        <div>
          <CopyButton input={text} />
        </div>
      </div>
      <div style={{ width: "100%", height: "100vh" }}>
        <FlowView dmmf={dmmf} />
      </div>
    </Split>
  );
}

export default Playground;
