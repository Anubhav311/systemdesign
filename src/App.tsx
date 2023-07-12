import { useState } from "react";
import "./App.css";
import "reactflow/dist/style.css";
import Split from "react-split";
import Graph from "./components/Graph";
import CodeEditor from "./components/CodeEditor";
import { ReactFlowProvider } from "reactflow";
import EditorView from "./components/EditorView";
import { useDebounce, useLocalStorage } from "react-use";

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

  return (
    <Split className="split" sizes={[25, 75]}>
      {/* <CodeEditor /> */}
      <EditorView value={text} onChange={(val) => setText(val!)} />

      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </Split>
  );
}

export default App;
