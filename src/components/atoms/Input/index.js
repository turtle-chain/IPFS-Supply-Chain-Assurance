import React from "react";
import { classNames } from "../../../utils/helpers";
import Typography from "../Typography";

const Input = ({
  label,
  parentClassName = "",
  className = "",
  error,
  value,
  onFocus,
  ...rest
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className={classNames("w-full mb-4", className)}>
      <div
        className={classNames(
          "relative rounded-sm overflow-hidden w-full flex justify-center",
          parentClassName
        )}
      >
        <input
          id={label}
          {...rest}
          className={classNames(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-1 focus:border-custom-secondary block w-4/5 p-2.5",
            className
          )}
          onFocus={(e) => {
            onFocus?.(e);
            setFocused(true);
          }}
          value={value}
        />
        {label ? (
          <label
            htmlFor={label}
            className={classNames(
              "absolute cursor-text top-1/2 transition-all transform -translate-y-1/2 duration-500 opacity-40 font-display text-xs",
              focused || !value === false ? "top-2 text-xxs" : ""
            )}
          >
            {label}
          </label>
        ) : null}
      </div>
      {error ? (
        <span className="text-left text-custom-danger">{error}</span>
      ) : null}
    </div>
  );
};

export default Input;
