"use client";
import { useState, useMemo } from "react";
import { Handle, Position } from "reactflow";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { TodoUpdateInterface } from "@/utils/types";

interface Props {
  data: {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    handleDelete: () => void;
    handleUpdate: (data: TodoUpdateInterface) => boolean;
    handleStatusChange: () => void;
  };
  isConnectable: boolean;
}

function TodoNode({ data, isConnectable }: Props) {
  const {
    id,
    text,
    description,
    completed,
    handleDelete,
    handleUpdate,
    handleStatusChange,
  } = data;

  const [newText, setNewText] = useState(text);
  const [newDescription, setNewDescription] = useState(description);

  const onUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();
    let updatedTodo = {
      text: newText,
      description: newDescription,
    };
    try {
      await handleUpdate(updatedTodo);
    } catch (error) {
      console.error({ error });
    }
  };

  const onStatusChange = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await handleStatusChange();
    } catch (error) {
      console.error({ error });
    }
  };

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDelete();
  };

  const isEditted = useMemo(() => {
    return text !== newText || description !== newDescription;
  }, [newText, newDescription, text, description]);

  return (
    <Box
      style={{
        background: completed ? `rgba(59,130,246,.5)` : "000",
        border: "1px solid #000",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <>
        <Handle
          type="target"
          id="a"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Box>
          <Typography>
            {isEditted && "Save in order to apply the changes"}
          </Typography>
          <Box style={{ display: "flex", justifyContent: "end" }}>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box>
            <TextField
              label="Text"
              id="outlined-size-normal"
              defaultValue={text}
              onChange={(e) => setNewText(e.target.value)}
              style={{ width: "100%" }}
            />
          </Box>
          <Box style={{ paddingTop: "20px" }}>
            <TextField
              label="Description"
              id="outlined-size-normal"
              defaultValue={description}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{ width: "100%" }}
            />
          </Box>
          {isEditted && (
            <Button
              onClick={onUpdate}
              color="primary"
              variant="outlined"
              style={{ marginTop: "10px", width: "100%" }}
            >
              Save
            </Button>
          )}
          <Button
            onClick={onStatusChange}
            color="primary"
            variant="contained"
            style={{ marginTop: "10px", width: "100%" }}
          >
            Mark as {completed ? "ToDo" : "Complete"}
          </Button>
        </Box>

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </>
    </Box>
  );
}

export default TodoNode;
