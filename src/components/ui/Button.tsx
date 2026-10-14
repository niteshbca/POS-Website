import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    />
  );
});
