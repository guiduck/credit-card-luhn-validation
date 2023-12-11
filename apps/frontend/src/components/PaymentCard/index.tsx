import type { ChangeEvent } from "react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../Button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { CreditCard, Loader } from "..";
import { uploadCardData } from "../../services/cardServices";
import { useSnackbar } from "../../hooks/useSnackbar";
import { nameValidator } from "../../utils/validators/name";
import { cardNumberValidator } from "../../utils/validators/cardNumber";
import { cvcVallidator } from "../../utils/validators/cvc";
import { creditCardMask } from "../../utils/masks/credit-card";
import { Icons } from "../Icons";

const MONTHS = [
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

interface PaymentCardProps {
  onSuccess: () => void;
}

export function PaymentCard({ onSuccess }: PaymentCardProps): JSX.Element {
  const [name, setName] = useState("Renato Lins");
  const [nameError, setNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("**** **** **** 1234");
  const [numberError, setNumberError] = useState("");

  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("2024");

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [flipped, setFlipped] = useState(false);

  const [loading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const scrollToError = (elementId: string, offset = 85) => {
    const elementToScroll = document.getElementById(elementId);
    if (!elementToScroll) return;
    const offsetTop = elementToScroll.offsetTop - offset;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  const getDate = () => {
    const monthNumber = MONTHS.findIndex((item) => item === cardMonth) + 1;
    return `${
      String(monthNumber).length < 2 ? "0" : ""
    }${monthNumber}/${cardYear}`;
  };

  const clearFields = () => {
    setName("");
    setCardNumber("");
    setCardMonth("");
    setCardYear("");
    setCvc("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    const nameValidation = nameValidator(name);
    const numberValidation = cardNumberValidator(cardNumber);
    const cvcValidation = cvcVallidator(cvc);

    if (
      name === "" ||
      cardNumber === "" ||
      cardMonth === "" ||
      cardYear === "" ||
      cvc === ""
    ) {
      snackbar("Fill all the data before uploading.", 3000, "error");
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

    if (cvcValidation.error) {
      setCvcError(cvcValidation.message);
      setLoading(false);
      scrollToError("cvc");
      return;
    }

    const currentCard = {
      holder: name,
      creditCardNumber: cardNumber.replace(/-/g, ""),
      expires: getDate(),
      cvc,
    };

    try {
      const result = await uploadCardData(currentCard);
      snackbar(
        result.msg ||
          (result.type === "success"
            ? "Data successfully uploaded!"
            : "There was a problem, try again later"),
        3000,
        result.type
      );
      if (result.type === "success") {
        clearFields();
        onSuccess();
      }
    } catch (exception) {
      snackbar(exception as string, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span className="h-[125px]" />
      <Card>
        <CardContent className="grid gap-6">
          <CreditCard
            className="mt-[-150px]"
            cvc={cvc}
            expiration={getDate()}
            flipped={flipped}
            holder={name}
            number={cardNumber}
          />

          <div className="grid gap-2 relative">
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
            {nameError ? (
              <span className="text-red-600 absolute bottom-0 mb-[-22px] text-sm">
                {nameError}
              </span>
            ) : null}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="number">Card number</Label>
            <Input
              id="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCardNumber(e.target.value);
                setNumberError("");
              }}
              placeholder="**** **** **** ****"
              value={creditCardMask(cardNumber)}
            />
            {numberError ? (
              <span className="text-red-600 absolute bottom-0 mb-[-22px] text-sm">
                {numberError}
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select
                onValueChange={(value) => {
                  setCardMonth(MONTHS[Number(value) - 1]);
                }}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month, i) => (
                    <SelectItem key={month} value={`${i + 1}`}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <span className="h-[14px]" />
              <Select
                onValueChange={(value) => {
                  setCardYear(value);
                }}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const yearLabel = `${new Date().getFullYear() + i}`;
                    return (
                      <SelectItem key={i} value={yearLabel}>
                        {yearLabel}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                maxLength={3}
                onBlur={() => {
                  setFlipped(false);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCvc(e.target.value);
                  setCvcError("");
                }}
                onClick={() => {
                  setFlipped(true);
                }}
                placeholder="CVC"
                value={cvc}
              />
              {cvcError ? (
                <span className="text-red-600 absolute bottom-0 mb-[-16px] whitespace-nowrap text-[12px]">
                  {cvcError}
                </span>
              ) : null}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} type="submit">
            {loading ? <Icons.spinner /> : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
