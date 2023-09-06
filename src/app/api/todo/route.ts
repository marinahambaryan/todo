import { TodoUpdateInterface } from "@/utils/types";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db().collection("todos");
  try {
    const todos = await collection.find().toArray();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  const { text, description } = await req.json();

  try {
    const todo = {
      text,
      description,
      completed: false,
      position: { x: 100, y: 100 },
    };
    console.log({ todo });
    const data = await collection.insertOne(todo);
    return NextResponse.json(
      { ...todo, _id: data.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id, text, description, completed, position } = await req.json();
  const client = await clientPromise;
  const collection = client.db().collection("todos");
  try {
    let newTodo: TodoUpdateInterface = {};

    const todo = await collection.findOne({
      _id: new ObjectId(id),
    });
    if (!todo) throw Error("Could not find todo");

    if (text && todo.text !== text) {
      newTodo.text = text;
    }
    if (description && todo.description !== description) {
      newTodo.description = description;
    }
    if (completed !== undefined && todo.completed !== completed) {
      newTodo.completed = completed;
    }
    if (
      position &&
      (todo.position.x !== position.x || todo.position.y !== position.y)
    ) {
      newTodo.position = position;
    }
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: newTodo });
    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const client = await clientPromise;
  const collection = client.db().collection("todos");

  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(error, { status: 500 });
  }
}
