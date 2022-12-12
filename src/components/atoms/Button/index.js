import React from "react";
import { classNames } from "../../../utils/helpers";

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...rest
}) => {
  const variantStyles = React.useMemo(() => {
    const styles = {
      primary:
        "bg-custom-primary text-white shadow-md hover:shadow-lg hover:opacity-70",
      danger: "bg-custom-danger text-white shadow-md hover:shadow-lg",
      success: "bg-custom-success text-white shadow-md hover:shadow-lg",
      white: "bg-white shadow-md hover:shadow-lg",
      outline:
        "bg-transparent border transition-colors  hover:border-white hover:bg-white hover:text-custom-dark ",
      text: "hover:text-custom-primary",
    };

    return styles[variant];
  }, [variant]);
  return (
    <button
      {...rest}
      className={classNames(
        "flex justify-center px-4 py-2 rounded-lg transition-all duration-500",
        variantStyles,
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
