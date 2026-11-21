import React from 'react';

const spans = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const spacing = { 0: 'gap-0', 1: 'gap-2', 2: 'gap-4', 3: 'gap-6', 4: 'gap-8' };
const responsiveSpans = {
  sm: Object.fromEntries(Object.entries(spans).map(([size, value]) => [size, `sm:${value}`])),
  md: Object.fromEntries(Object.entries(spans).map(([size, value]) => [size, `md:${value}`])),
  lg: Object.fromEntries(Object.entries(spans).map(([size, value]) => [size, `lg:${value}`])),
  xl: Object.fromEntries(Object.entries(spans).map(([size, value]) => [size, `xl:${value}`])),
};
const justifyClasses = {
  center: 'justify-center',
  'flex-end': 'justify-end',
  'flex-start': 'justify-start',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
};
const alignClasses = {
  center: 'items-center',
  'flex-end': 'items-end',
  'flex-start': 'items-start',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};
const contentClasses = {
  center: 'content-center',
  'flex-end': 'content-end',
  'flex-start': 'content-start',
  stretch: 'content-stretch',
};
const selfClasses = {
  center: 'self-center',
  'flex-end': 'self-end',
  'flex-start': 'self-start',
  stretch: 'self-stretch',
};
const textClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };

export const Grid = ({
  children,
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing: gap = 0,
  marginBottom,
  maxWidth,
  justifyContent,
  alignItems,
  alignContent,
  alignSelf,
  textAlign,
  flex,
  className = '',
  style,
  ...props
}) => {
  const classes = [];
  if (container) classes.push('grid grid-cols-12');
  if (item) classes.push('min-w-0');
  if (xs) classes.push(spans[xs] || 'col-span-12');
  breakpoints.forEach((breakpoint) => {
    const value = { sm, md, lg, xl }[breakpoint];
    if (value) classes.push(responsiveSpans[breakpoint][value] || `${breakpoint}:col-span-12`);
  });
  if (container) classes.push(spacing[gap] || 'gap-4');
  if (justifyContent) classes.push(justifyClasses[justifyContent]);
  if (alignItems) classes.push(alignClasses[alignItems]);
  if (alignContent) classes.push(contentClasses[alignContent]);
  if (alignSelf) classes.push(selfClasses[alignSelf]);
  if (textAlign) classes.push(textClasses[textAlign]);
  if (flex) classes.push('flex-1');
  if (marginBottom) classes.push(marginBottom <= 1 ? 'mb-2' : 'mb-4');

  return (
    <div
      {...props}
      className={`${classes.join(' ')} ${className}`}
      style={{ ...(maxWidth ? { maxWidth } : {}), ...style }}
    >
      {children}
    </div>
  );
};

export default Grid;
