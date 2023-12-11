import React, { useMemo } from "react";
import { Card } from "../ui/card";
import { cn } from "../../utils/cn";
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
}: Readonly<CreditCardProps>): JSX.Element {
  const cardClass = useMemo(
    () => (flipped ? "card flipped" : "card"),
    [flipped]
  );

  return (
    <Card
      className={cn(
        `${cardClass} h-full min-h-[250px] max-w-[500px] min-w-[340px] sm:min-w-[70%] mx-auto bg-primary text-primary-content rounded-[17px] float`,
        className
      )}
    >
      {/* Front */}
      <div className="front w-full p-8 rounded-[17px] bg-gradient-to-tl from-indigo-500 from-40% via-purple-500 via-10% to-pink-500 to-90%">
        <div className="flex flex-col top-0 left-0">
          <img
            alt="chip"
            className="absolute w-[15%] top-[15%] left-[5%]"
            src="https://raw.githubusercontent.com/dasShounak/freeUseImages/main/chip.png"
          />

          <div className="absolute top-[45%] left-[5%]">
            <p className="text-[5vw] font-extrabold md:text-3xl invert">
              {number.replaceAll("-", " ")}
            </p>
          </div>

          <div className="absolute top-[70%] left-[5%]">
            <p>card holder</p>
            <p>{holder}</p>
          </div>

          <div className="absolute top-[70%] right-0">
            <p className="absolute right-[5%]">expiration</p>
            <p className="absolute right-[5%] top-[20px]">{expiration}</p>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="back rounded-[17px] bg-gradient-to-tl from-pink-500 from-40% via-purple-500 via-10% to-indigo-500 to-95%">
        <div className="absolute top-[20%] lef-0 w-full h-[20px] max-h-[20%] bg-black" />
        <p className="absolute top-[40%] block left-[50%] my-0 mx-auto mt-4 w-[20%] max-w-[20%] h-[24px] max-h-[10%] bg-white text-black font-bold text-right text-lg">
          {cvc}.
        </p>
        <p className="absolute top-[45%] right-[18%] right-0">(CVC)</p>
        <p className="absolute bottom-[5%] left-[5%] text-sm">
          Designed with ❤ by{" "}
          <a href="https://github.com/guiduck">Guilherme Figueiredo</a>
        </p>
      </div>
    </Card>
  );
}
