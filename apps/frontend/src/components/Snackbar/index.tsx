import React, { useEffect, useContext } from "react";
import { SnackbarContext } from "../../context/snackbar-context";
import { Icons } from "../Icons";
import { Button } from "..";
import { useTheme } from "../../context/theme-provider";

function renderIcon(
  type?: "success" | "error" | "neutral",
  theme?: string
): JSX.Element {
  const iconColor = theme === "light" ? "white" : "black";
  let icon = <Icons.snackNeutral fill={iconColor} />;
  if (type === "success") {
    icon = <Icons.snackSuccess fill={iconColor} />;
  } else if (type === "error") {
    icon = <Icons.snackError fill={iconColor} />;
  }
  return icon;
}

export function Snackbar(): JSX.Element {
  const { dataSnackbar, setDataSnackbar } = useContext(SnackbarContext);

  const { theme } = useTheme();

  const setHideTime = () => {
    setTimeout(
      () => {
        setHide();
      },
      dataSnackbar?.time
    );
  };

  const setHide = () => {
    setDataSnackbar?.({
      show: false,
      message: "",
      time: undefined,
      type: "neutral",
    });
  };

  useEffect(() => {
    if (dataSnackbar?.time && dataSnackbar.show) {
      setHideTime();
    }
  }, [dataSnackbar?.show]);

  const getColor = (type?: string) => {
    switch (type) {
      case "success":
        return "border-green-600";
      case "error":
        return "border-red-600";
      default:
        return "border-gray-600";
    }
  };

  return (
    <>
      {dataSnackbar?.show ? (
        <div className="w-screen fixed h-20 z-10 top-0 flex items-center justify-center">
          <div
            className={`flex w-full ${getColor(
              dataSnackbar.type
            )} border-4 m-4 mb-[-16px] p-4 h-full justify-between items-center lg:max-w-xl rounded-xl bg-[#0F172A] dark:bg-[#DFE2E5]`}
          >
            <div className="flex gap-4">
              {renderIcon(dataSnackbar.type, theme)}
              <p className="text-base text-white dark:text-black">
                {dataSnackbar.message}
              </p>
            </div>
            <Button
              className=" text-[#0F172A] dark:text-white bg-white dark:bg-[#0F172A] "
              onClick={() => {
                setHide();
              }}
              type="button"
            >
              close
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
