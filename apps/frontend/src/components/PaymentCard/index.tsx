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
import { CreditCard, Loader } from "..";
import { creditCardMask } from "../utils/masks/credit-card";
import { nameValidator } from "../utils/validators/name";
import { cardNumberValidator } from "../utils/validators/cardNumber";
import { uploadCardData } from "../../services/cardValidation";
import { cvcVallidator } from "../utils/validators/cvc";
import { useSnackbar } from "../../hooks/useSnackbar";

export function PaymentCard(): JSX.Element {
  const [name, setName] = useState("renato");
  const [nameError, setNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [numberError, setNumberError] = useState("");

  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [flipped, setFlipped] = useState(false);

  const [loading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const handleFlip = () => {
    setFlipped(!flipped);
  };

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

  const getDate = () => {
    const monthNumber = months.findIndex((item) => item === cardMonth) + 1;
    return `${
      String(monthNumber).length < 2 ? "0" : ""
    }${monthNumber}/${cardYear}`;
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
      cardNumber: cardNumber.replace(/-/g, ""),
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
              placeholder=""
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
                  setCardMonth(months[Number(value) - 1]);
                }}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, i) => (
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
            {loading ? <Loader size="sm" /> : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
