import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const CheckIcon: React.FC<IconProps> = ({
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
