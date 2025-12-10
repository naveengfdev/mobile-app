import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const createTodo = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
    });
    return todoId;
  },
});
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    await ctx.db.patch(args.id, { completed: !todo.completed });
    return todo;
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const deletedTodo = await ctx.db.delete(args.id);
    return deletedTodo;
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), title: v.string() },
  handler: async (ctx, args) => {
    const updatedTodo = await ctx.db.patch(args.id, { title: args.title });
    return updatedTodo;
  },
});

export const deleteAllTodos = mutation({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }
    return "All todos deleted";
  },
});
