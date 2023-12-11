import React from "react";
import { Card, CardContent } from "../ui/card";
import type { CardModel } from "../../models/cardModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Icons } from "../Icons";

interface CardListProps {
  cards: CardModel[];
  onCardDelete: (cardId: string) => Promise<void>;
  loading?: boolean;
}

export function CardList({
  cards,
  onCardDelete,
  loading,
}: CardListProps): JSX.Element {
  const maskCreditCardNumber = (cardNumber: string) => {
    const lastFourDigits = cardNumber.slice(-8, -4);
    return `**** **** ${lastFourDigits} ****`;
  };
  return (
    <Card className="min-h-[480px] min-w-[340px] sm:min-w-[500px] w-[calc(100% - 32px)]">
      <CardContent className="flex flex-col gap-6">
        {/* <CreditCard
            className="mt-[-150px]"
            cvc={cvc}
            expiration={getDate()}
            flipped={flipped}
            holder={name}
            number={cardNumber}
          /> */}

        <Table className="w-full">
          <TableCaption className="mt-6">
            A list of your registered credit cards.
          </TableCaption>
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead className="w-[30%]">Holder</TableHead>
              <TableHead className="w-[30%]">Number</TableHead>
              <TableHead className="w-[30%] text-right pr-4">option</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="text-[11px] sm:text-sm">
                  {card.holder}
                </TableCell>
                <TableCell className="min-w-[200px] font-medium">
                  {maskCreditCardNumber(card.creditCardNumber)}
                </TableCell>
                <TableCell className="text-right flex justify-end">
                  {/* not implemented yet */}
                  {/* <button
                    className="bg-green-300 h-[18px] w-[58px] text-center flex items-center justify-center dark:text-black dark:bg-yellow-100 mb-[2px]  text-white px-2 rounded-sm text-[12px] font-bold"
                    disabled
                    type="button"
                  >
                    <p>use</p>
                  </button> */}
                  <button
                    className="bg-red-400 h-[18px] w-[58px] text-center flex items-center justify-center text-white px-2 rounded-sm text-[12px] font-bold"
                    onClick={() => {
                      onCardDelete(card.id!);
                    }}
                    type="button"
                  >
                    <p>{loading ? <Icons.spinner /> : "remove"}</p>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
