import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const EyeOffIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#64748b',
  strokeWidth = 2,
  style,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', ...style }}
      {...props}
    >
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 3 15.5 1 12C2.06 10.15 3.5 8.56 5.25 7.37M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21 8.5 23 12C22.19 13.41 21.13 14.7 19.88 15.76M1 1L23 23"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88 9.88A3 3 0 1 0 14.12 14.12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
