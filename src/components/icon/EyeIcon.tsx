import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const EyeIcon: React.FC<IconProps> = ({
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
        d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
