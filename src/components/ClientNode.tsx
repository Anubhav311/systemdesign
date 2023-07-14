import cc from "classcat";
import React, { useState } from "react";
import { Handle, Position } from "reactflow";

import styles from "./Node.module.scss";

import { ClientNodeData } from "../utils/types";

const MAX_VALUES = 12;

const ClientNode = ({ data }: ClientNodeProps) => {
  const [expanded, setExpanded] = useState(false);

  console.log("client node was called: ", data);
  return (
    <div
      className="font-sans bg-white border-2 border-separate border-black rounded-lg"
      style={{ minWidth: 200, maxWidth: 500, borderSpacing: 0 }}
    >
      <p>{data.id}</p>
      <p>{data.type}</p>
      {/* <p>{data.data.label}</p> */}

      <Handle
        className={cc([styles.handle, styles.bottom])}
        type="source"
        position={Position.Bottom}
        isConnectable={false}
      />
    </div>
  );
};

export interface ClientNodeProps {
  data: ClientNodeData;
}

export default ClientNode;
