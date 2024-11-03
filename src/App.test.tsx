import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("My Budget Planner");
  expect(linkElement).toBeInTheDocument();
});

// test
test('create an expense', () => {
  render(<App />);

  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByRole('button', { name: /save/i });

  fireEvent.change(nameInput, { target: { value: "Golden Apple" } });
  fireEvent.change(costInput, { target: { value: "800" } });
  fireEvent.click(saveButton);

  const expenseName = screen.getByText("Golden Apple");
  const expenseAmount = screen.getByText("$800");
  const totalSpent = screen.getByText("Spent so far: $800");
  const remainingBudget = screen.getByText("Remaining: $200");

  expect(expenseName).toBeInTheDocument();
  expect(expenseAmount).toBeInTheDocument();
  expect(totalSpent).toBeInTheDocument();
  expect(remainingBudget).toBeInTheDocument();
});

test('delete an expense', () => {
  render(<App />);

  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByRole('button', { name: /save/i });

  fireEvent.change(nameInput, { target: { value: "Monitor" } });
  fireEvent.change(costInput, { target: { value: "300" } });
  fireEvent.click(saveButton);

  const deleteButton = screen.getByRole('button', { name: "x" });
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Monitor")).not.toBeInTheDocument();
  expect(screen.queryByText("$300")).not.toBeInTheDocument();

  expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
});

test('budget balance verfication: multiple instances', () => {
  render(<App />);

  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByRole('button', { name: /save/i });

  fireEvent.change(nameInput, { target: { value: "Persona5" } });
  fireEvent.change(costInput, { target: { value: "100" } });
  fireEvent.click(saveButton);

  fireEvent.change(nameInput, { target: { value: "Minecraft" } });
  fireEvent.change(costInput, { target: { value: "50" } });
  fireEvent.click(saveButton);

  expect(screen.getByText("Persona5")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();

  expect(screen.getByText("Minecraft")).toBeInTheDocument();
  expect(screen.getByText("$50")).toBeInTheDocument();

  expect(screen.getByText("Spent so far: $150")).toBeInTheDocument();
  expect(screen.getByText("Remaining: $850")).toBeInTheDocument();
  expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
});

test('edge case: expenses exceed budget', () => {
  render(<App />);

  const nameInput = screen.getByLabelText("Name");
  const costInput = screen.getByLabelText("Cost");
  const saveButton = screen.getByRole('button', { name: /save/i });

  fireEvent.change(nameInput, { target: { value: "Iron Sword" } });
  fireEvent.change(costInput, { target: { value: "200" } });
  fireEvent.click(saveButton);

  fireEvent.change(nameInput, { target: { value: "Mac" } });
  fireEvent.change(costInput, { target: { value: "1200" } });
  fireEvent.click(saveButton);

  expect(screen.getByText("Remaining: $-400")).toBeInTheDocument();
  expect(screen.getByText("Spent so far: $1400")).toBeInTheDocument();
});