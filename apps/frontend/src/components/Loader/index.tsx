interface LoaderProps {
  size: "xs" | "sm" | "md" | "lg";
}

export function Loader({ size }: Readonly<LoaderProps>): JSX.Element {
  return <span className={`loading loading-spinner loading-${size}`} />;
}
