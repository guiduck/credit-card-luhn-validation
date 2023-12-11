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
  return (
    <Card className="min-h-[580px] min-w-[340px] sm:min-w-[500px] w-[calc(100% - 32px)]">
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
              <TableHead className="w-[30%] text-right">option</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="text-[11px] sm:text-sm">
                  {card.holder}
                </TableCell>
                <TableCell className="min-w-[200px] font-medium">
                  {card.creditCardNumber}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-red-400 text-white py-1 px-2 rounded-sm text-[12px] font-bold"
                    onClick={() => {
                      onCardDelete(card.id!);
                    }}
                    type="button"
                  >
                    {loading ? <Icons.spinner /> : "remove"}
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
