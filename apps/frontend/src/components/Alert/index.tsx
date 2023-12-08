interface AlertProps {
  type: "success" | "error";
  msg: string;
}

function SuccessIcon(): JSX.Element {
  return (
    <svg
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ErrorIcon(): JSX.Element {
  return (
    <svg
      className="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
export function Alert({ type, msg }: AlertProps): JSX.Element {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {type === "success" && <SuccessIcon />}
      {type === "error" && <ErrorIcon />}
      <span>{msg}</span>
    </div>
  );
}
