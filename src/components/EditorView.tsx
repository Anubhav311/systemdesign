import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

import * as prismaLanguage from "../utils/languageConfig";

const EditorView = ({ value, onChange }: EditorViewProps) => {
  const monaco = useMonaco();

  // for monaco configuration
  // useEffect(() => {
  //   if (monaco) {
  //     monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  //       validate: true,
  //       schemas: [
  //         {
  //           uri: "http://myserver/foo-schema.json", // id of the first schema
  //           fileMatch: ["*"], // associate with our model
  //           schema: {
  //             type: "object",
  //             properties: {
  //               nodes: {
  //                 type: "array",
  //                 items: {
  //                   type: "object",
  //                   properties: {
  //                     id: {
  //                       type: "number",
  //                       minimum: 0,
  //                     },
  //                     type: {
  //                       enum: ["client", "server"],
  //                     },
  //                     label: {
  //                       type: "string",
  //                       minLength: 1,
  //                     },
  //                   },
  //                   required: ["id", "type", "label"],
  //                 },
  //               },
  //               connections: {
  //                 type: "array",
  //                 items: {
  //                   type: "object",
  //                   properties: {
  //                     id: {
  //                       type: "number",
  //                       minimum: 0,
  //                     },
  //                     type: {
  //                       enum: ["sendData", "getData"],
  //                     },
  //                     source: {
  //                       type: "number",
  //                       minimum: 0,
  //                     },
  //                     target: {
  //                       type: "number",
  //                       minimum: 0,
  //                     },
  //                   },
  //                   required: ["id", "type", "source", "target"],
  //                 },
  //               },
  //             },
  //             required: ["nodes", "connections"],
  //           },
  //         },
  //         {
  //           uri: "http://myserver/bar-schema.json", // id of the first schema
  //           schema: {
  //             type: "object",
  //             properties: {
  //               q1: {
  //                 enum: ["x1", "x2"],
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     });
  //   }
  // }, [monaco]);

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
      // language="json"
      language="prisma"
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
