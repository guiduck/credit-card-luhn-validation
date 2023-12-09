import type { ChangeEvent } from "react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../Button";
import { Icons } from "../Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CreditCard } from "..";
import { creditCardMask } from "../utils/masks/credit-card";
import { nameValidator } from "../utils/validators/name";
import { cardNumberValidator } from "../utils/validators/cardNumber";
import { uploadCardData } from "../../services/cardValidation";

export function PaymentCard(): JSX.Element {
  const [name, setName] = useState("renato");
  const [nameError, setNameError] = useState("");

  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const [cardMonth, setCardMonth] = useState("");
  const [year, setYear] = useState("");

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [loading, setLoading] = useState(false);

  // const snackbar = useSnackbar();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const scrollToError = (elementId: string, offset = 85) => {
    const elementToScroll = document.getElementById(elementId);
    if (!elementToScroll) return;
    const offsetTop = elementToScroll.offsetTop - offset;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const nameValidation = nameValidator(name);
    const numberValidation = cardNumberValidator(number);

    if (
      name === "" ||
      number === "" ||
      cardMonth === "" ||
      year === "" ||
      cvc === ""
    ) {
      // snackbar("Preencha todos os dados para atualizar.", 3000, "error");
    }

    if (nameValidation.error) {
      setNameError(nameValidation.message);
      setLoading(false);
      scrollToError("name");
      return;
    }
    if (numberValidation.error) {
      setNumberError(numberValidation.message);
      setLoading(false);
      scrollToError("number");
      return;
    }

    const getDate = (month: string, year: string) => {
      const monthNumber = months.findIndex((item) => item === month) + 1;
      return `${monthNumber}/${year}`;
    };

    const currentCard = {
      name,
      cardNumber: number,
      expiration: getDate(cardMonth, year),
      cvc,
    };

    try {
      const result = await uploadCardData(currentCard);

      if (result) {
        // snackbar("Dados atualizados com sucesso!", 3000);
      } else {
        // snackbar(
        //   "Houve um erro na confirmação de dados, tente novamente mais tarde",
        //   3000
        // );
      }
    } catch (exception) {
      console.error(exception);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
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

        <CreditCard />

        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              setNameError("");
            }}
            placeholder="First Last"
            value={name}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input
            id="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNumber(e.target.value);
              setNumberError("");
            }}
            placeholder=""
            value={creditCardMask(number)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, i) => (
                  <SelectItem
                    key={month}
                    onClick={() => {
                      setCardMonth(month);
                    }}
                    value={`${i + 1}`}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const yearLabel = `${new Date().getFullYear() + i}`;
                  return (
                    <SelectItem
                      key={i}
                      onClick={() => {
                        setYear(yearLabel);
                      }}
                      value={yearLabel}
                    >
                      {yearLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCvc(e.target.value);
                setCvcError("");
              }}
              placeholder="CVC"
              value={cvc}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} type="submit">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
