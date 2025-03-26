import React from "react";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  icon: React.FC<LucideProps>;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const Icon: React.FC<IconProps> = ({
  icon: LucideIcon,
  size = "md",
  //   strokeWidth = 2,
  ...props
}) => {
  const iconSize = typeof size === "string" ? sizeMap[size] : size;
  //
  return <LucideIcon size={iconSize} {...props} />;
};

export default Icon;
