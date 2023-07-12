import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }) {
  const { label = "", value = 0, onChange } = data;

  return (
    <div className="border-2 border-solid border-black p-3">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input
          id="text"
          name="text"
          onChange={(evt) => onChange(evt.target.value)}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}

export function ServerNode({ data }) {
  const { label = "", value = 0, onChange } = data;

  return (
    <div className="border-2 border-solid border-black p-3">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{label}</p>
        <p>{value}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}

export default TextUpdaterNode;
