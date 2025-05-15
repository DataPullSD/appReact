import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "mb-1.5 block font-medium text-sm text-gray-800 dark:text-gray-200",
          className,
        ),
      )}
    >
      {children}
    </label>
  );
};

export default Label; 