import * as React from "react";
import "./styles.css";
import { CounterButton, Link } from "@repo/ui";

function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-full mx-auto my-0 py-0 px-4">
      <h1 className="w-[500px] text-4xl text-7xl">
        Adicione método de pagamento
      </h1>
      <CounterButton />
      <p className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://vitejs.dev/" newTab>
          Vite
        </Link>
      </p>
    </div>
  );
}

export default App;
