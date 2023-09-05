"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import TodoNode from "./TodoNode";
import { TodoInterface, TodoUpdateInterface } from "@/utils/types";

const nodeTypes = { textUpdater: TodoNode };

interface Props {
  todos: TodoInterface[];
  handleDelete: (id: string) => void;
  handleStatusChange: (id: string, isCompleted: boolean) => void;
  handleUpdate: (id: string, data: TodoUpdateInterface) => void;
}
function Flow({
  todos,
  handleDelete,
  handleStatusChange,
  handleUpdate,
}: Props) {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const newTodoNodes: Node[] = [];
    todos.forEach(({ _id, text, description, completed }) => {
      let newTodo: Node = {
        id: _id,
        position: { x: 100, y: 100 },
        data: {
          id: _id,
          text,
          description,
          completed,
          handleStatusChange: () => handleStatusChange(_id, !completed),
          handleDelete: () => handleDelete(_id),
          handleUpdate: (data: TodoUpdateInterface) => handleUpdate(_id, data),
        },
        type: "textUpdater",
      };
      newTodoNodes.push(newTodo);
    });
    setNodes(newTodoNodes);
  }, [todos]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log({ connection });
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div style={{ height: 500 }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
