import { cn } from "../../lib/utils";

export function Container({ size = "default", className, children, ...rest }) {
  const sizes = {
    narrow: "max-w-[920px]",
    default: "max-w-[1200px]",
    wide: "max-w-[1440px]",
  };
  return (
    <div
      className={cn("relative mx-auto w-full px-6 md:px-10", sizes[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
