import * as React from "react";
import { PaymentCard } from "../components";
import { ModeToggle } from "../components/ModeToggle";

function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-full mx-auto my-0 py-0 px-4 gap-8">
      <ModeToggle />
      <h1 className="text-4xl font-bold text-center">
        Please, add new credit card
      </h1>
      <PaymentCard />
    </div>
  );
}

export default App;
