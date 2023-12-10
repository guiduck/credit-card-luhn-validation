import * as React from "react";
import { PaymentCard } from "../components";
import { ModeToggle } from "../components/ModeToggle";
import { Snackbar } from "../components/Snackbar";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Icons } from "../components/Icons";

function App(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-full mx-auto my-0 py-0 px-4 gap-8">
      <Snackbar />
      <ModeToggle />
      <h1 className="text-2xl font-bold text-center">
        Add a new payment method to your account.
      </h1>
      <RadioGroup className="grid grid-cols-3 gap-4" defaultValue="card">
        <div>
          <RadioGroupItem className="peer sr-only" id="card" value="card" />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor="card"
          >
            <Icons.card />
            Card
          </Label>
        </div>

        <div>
          <RadioGroupItem className="peer sr-only" id="paypal" value="paypal" />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor="paypal"
          >
            <Icons.paypal className="mb-3 h-6 w-6" />
            Paypal
          </Label>
        </div>

        <div>
          <RadioGroupItem className="peer sr-only" id="apple" value="apple" />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor="apple"
          >
            <Icons.apple className="mb-3 h-6 w-6" />
            Apple
          </Label>
        </div>
      </RadioGroup>
      <PaymentCard />
    </div>
  );
}

export default App;
