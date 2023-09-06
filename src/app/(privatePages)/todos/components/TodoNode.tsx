"use client";
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => {
    setIsEditModeOn((prevState) => !prevState);
  };

  const onUpdate = async () => {
    let updatedTodo = {
      text: newText,
      description: newDescription,
    };
    setLoading(true);
    try {
      await handleUpdate(updatedTodo);
      setIsEditModeOn(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const onStatusChange = async () => {
    try {
      setLoading(true);
      await handleStatusChange();
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        background: completed ? `rgba(59,130,246,.5)` : "000",
        border: "1px solid #000",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Handle
            type="target"
            id="a"
            position={Position.Top}
            isConnectable={isConnectable}
          />
          <Box>
            <Box style={{ display: "flex", justifyContent: "end" }}>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>

              <IconButton aria-label="delete" onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              {isEditModeOn ? (
                <TextField
                  label="Text"
                  id="outlined-size-normal"
                  defaultValue={text}
                  onChange={(e) => setNewText(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <Typography variant="h5">{text}</Typography>
              )}
            </Box>
            <Box style={{ paddingTop: "20px" }}>
              {isEditModeOn ? (
                <TextField
                  label="Description"
                  id="outlined-size-normal"
                  defaultValue={description}
                  onChange={(e) => setNewDescription(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <Typography variant="subtitle1">{description}</Typography>
              )}
            </Box>
            {isEditModeOn && (
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
      )}
    </Box>
  );
}

export default TodoNode;
