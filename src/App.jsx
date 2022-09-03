import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import BudgetList from "./components/budget/BudgetList.jsx";

function App() {

  return (
    <>
      <Container className="my-4">
        <BudgetList />
      </Container>
    </>
  );
}

export default App;
