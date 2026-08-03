import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const HamburgerIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2.5,
  style,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    {...props}
  >
    <path d="M4 6H20M4 12H20M4 18H20" />
  </svg>
);
