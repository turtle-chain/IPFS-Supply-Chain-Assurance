import React from "react";
import { classNames } from "../../../utils/helpers";

const Typography = ({ tag: Wrapper, text, className = "", ...rest }) => {
  const elementClassName = React.useMemo(() => {
    switch (Wrapper) {
      case "h1":
        return "text-h1 font-bold ";
      case "h2":
        return "text-h2 font-medium ";
      case "h3":
        return "text-h3 ";
      case "h4":
        return "text-h4 ";
      case "h5":
        return "text-h5 ";
      case "p":
        return "text-p ";
      default:
        return "";
    }
  }, [Wrapper]);

  return (
    <Wrapper className={classNames(elementClassName, className)} {...rest}>
      {text}
    </Wrapper>
  );
};

export default Typography;
