"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  onAddTodo: (todoText: string, todoDescription: string) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, onClose, onAddTodo }) => {
  const [todoText, setTodoText] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleClose = () => {
    setTodoText("");
    onClose();
  };

  const handleAddTodo = () => {
    onAddTodo(todoText, todoDescription);
    setTodoText("");
    setTodoDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
      <DialogTitle>Add a New Todo</DialogTitle>
      <DialogContent style={{ paddingTop: "20px" }}>
        <Box>
          <TextField
            autoFocus
            label="Todo"
            fullWidth
            variant="outlined"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </Box>
        <Box style={{ paddingTop: "30px" }}>
          <TextField
            autoFocus
            label="Todo"
            fullWidth
            multiline
            variant="outlined"
            value={todoDescription}
            rows={4}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddTodo} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoModal;
