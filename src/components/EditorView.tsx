import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

import * as prismaLanguage from "../utils/languageConfig";

const EditorView = ({ value, onChange }: EditorViewProps) => {
  const monaco = useMonaco();

  // for monaco configuration
  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "http://myserver/foo-schema.json", // id of the first schema
            fileMatch: ["*"], // associate with our model
            schema: {
              type: "object",
              properties: {
                p1: {
                  enum: ["v1", "v2"],
                },
                p2: {
                  $ref: "http://myserver/bar-schema.json", // reference the second schema
                },
              },
            },
          },
          {
            uri: "http://myserver/bar-schema.json", // id of the first schema
            schema: {
              type: "object",
              properties: {
                q1: {
                  enum: ["x1", "x2"],
                },
              },
            },
          },
        ],
      });
    }
  }, [monaco]);

  // for prisma configuration
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "prisma" });
      monaco.languages.setLanguageConfiguration(
        "prisma",
        prismaLanguage.config
      );
      monaco.languages.setMonarchTokensProvider(
        "prisma",
        prismaLanguage.language
      );
    }
  }, [monaco]);

  return (
    <Editor
      height="100vh"
      language="json"
      // language="prisma"
      theme="vs-dark"
      // theme="light"
      loading="Loading..."
      path="schema.prisma"
      options={{
        minimap: { enabled: false },
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        scrollBeyondLastLine: false,
      }}
      // value={JSON.stringify(
      //   {
      //     p1: "v3",
      //     p2: false,
      //   },
      //   null,
      //   2
      // )}
      value={value}
      onChange={onChange}
    />
  );
};

export interface EditorViewProps {
  value: string;
  onChange: (text?: string) => void;
}

export default EditorView;
