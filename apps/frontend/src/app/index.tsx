import React, { useEffect, useState } from "react";
import { PaymentCard } from "../components";
import { ModeToggle } from "../components/ModeToggle";
import { Snackbar } from "../components/Snackbar";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Icons } from "../components/Icons";
import { Separator } from "../components/ui/separator";
import { deleteUserCard, getUserCards } from "../services/cardServices";
import { useSnackbar } from "../hooks/useSnackbar";
import { CardList } from "../components/CardList";
import { cardMock } from "../mocks/cardMock";
import type { CardModel } from "../models/cardModel";

function App(): JSX.Element {
  const [cardView, setCardView] = useState<"new" | "existing">("new");

  const [cardList, setCardList] = useState<CardModel[] | undefined>();

  const [loading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const updateCardList = async () => {
    setLoading(true);
    try {
      const result = await getUserCards();
      if (result?.type === "success") {
        setCardList(result.data?.map((card) => ({ ...card, id: card._id })));
      }
    } catch (exception) {
      snackbar(exception as string, 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (cardId: string) => {
    setLoading(true);
    try {
      const result = await deleteUserCard(cardId);
      snackbar(
        result.msg ||
          (result.type === "success"
            ? "Card was deleted!"
            : "There was a problem, try again later"),
        3000,
        result.type
      );
      if (result.type === "success") {
        await updateCardList();
      }
    } catch (exception) {
      snackbar(exception as string, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cardView === "new") return;
    updateCardList().catch((exception) => {
      console.error(exception as string);
    });
  }, [cardView]);

  return (
    <div className="min-h-screen flex flex-col py-8 items-center justify-center max-w-full mx-auto my-0 py-0 px-4 gap-8">
      <Snackbar />

      <header>
        <div className="w-screen pt-2 pb-2 pl-8 z-[1] flex items-center justify-center fixed top-0 left-0 h-[60px] border-slate-900 bg-white dark:bg-slate-950 dark:border-white border-b-2 shadow-md">
          <div className="max-w-[635px] w-full flex justify-between">
            <h1 className="text-3xl text-start font-bold">Checkout</h1>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="w-full max-w-[635px] flex items-end">
        <h1 className="text-[24px] w-full max-w-[635px] font-bold text-center ">
          Select a payment method.
        </h1>
      </div>

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
          <RadioGroupItem
            className="peer sr-only"
            disabled
            id="paypal"
            value="paypal"
          />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor="paypal"
          >
            <Icons.paypal className="mb-3 h-6 w-6" />
            Paypal
          </Label>
        </div>

        <div>
          <RadioGroupItem
            className="peer sr-only"
            disabled
            id="apple"
            value="apple"
          />
          <Label
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            htmlFor="apple"
          >
            <Icons.apple className="mb-3 h-6 w-6" />
            Apple
          </Label>
        </div>
      </RadioGroup>

      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Pay by card</h4>
          <p className="text-sm text-muted-foreground">
            use an existing or create a new one.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-6 text-sm">
          <button
            onClick={() => {
              setCardView("new");
            }}
            type="button"
          >
            <p
              className={`text-lg hover:underline ${
                cardView === "new" ? "underline" : ""
              } p-4`}
            >
              New Card
            </p>
          </button>
          <Separator orientation="vertical" />
          <button
            onClick={() => {
              setCardView("existing");
            }}
            type="button"
          >
            <p
              className={`text-lg hover:underline ${
                cardView === "existing" ? "underline" : ""
              } p-4`}
            >
              My Cards
            </p>
          </button>
        </div>
      </div>

      {cardView === "new" && (
        <PaymentCard
          onSuccess={() => {
            setCardView("existing");
          }}
        />
      )}

      {cardView === "existing" && (
        <CardList
          cards={cardList || [cardMock]}
          loading={loading}
          onCardDelete={deleteCard}
        />
      )}
    </div>
  );
}

export default App;
