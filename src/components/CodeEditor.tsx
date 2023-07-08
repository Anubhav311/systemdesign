import * as React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

interface ICodeEditorProps {}

const CodeEditor: React.FunctionComponent<ICodeEditorProps> = (props) => {
  const boilerPlate = `function createSystem() {
        // write code here
}`;

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className="h-full bg-red" style={{ height: "100%" }}>
      <CodeMirror
        value={boilerPlate}
        theme={vscodeDark}
        onChange={handleChange}
        extensions={[javascript({ typescript: true })]}
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

export default CodeEditor;
