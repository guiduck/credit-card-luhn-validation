import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { cn } from "../utils/cn";
import "./index.css";

interface CreditCardProps {
  className: string;
  flipped: boolean;
  holder: string;
  number: string;
  expiration: string;
  cvc: string;
}
export function CreditCard({
  className,
  flipped,
  holder,
  number,
  expiration,
  cvc,
}: CreditCardProps): JSX.Element {
  const cardClass = useMemo(
    () => (flipped ? "card flipped" : "card"),
    [flipped]
  );
  return (
    <Card
      className={cn(
        `${cardClass} w-100 h-full min-h-[250px] bg-primary text-primary-content rounded-[17px] float`,
        className
      )}
    >
      <div className="front w-full p-4 rounded-[17px]">
        {/* Front side content here */}

        <div className="flex flex-col">
          <div className="absolute top-[30%]">
            <p>card number</p>
            <p>{number.replaceAll("-", " ")}</p>
          </div>

          <div className="absolute top-[50%] left-0">
            <p>card holder</p>
            <p>{holder}</p>
          </div>

          <div className="absolute top-[50%] right-0">
            <p className="absolute right-8">expiration</p>
            <p className="absolute right-8 top-[20px]">{expiration}</p>
          </div>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
      <div className="back p-4 rounded-[17px]">
        {/* Back side content here */}
        <p>Back side content (CVC){cvc}</p>
        <div className="card-actions justify-end" />
      </div>
    </Card>
  );
}
