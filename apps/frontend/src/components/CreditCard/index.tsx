import React from "react";
import { Card } from "../ui/card";

export function CreditCard(): JSX.Element {
  return (
    <Card className="w-100 h-full min-h-[250px] bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn">Buy Now</button>
        </div>
      </div>
    </Card>
  );
}
