import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // 🔥 EXACT MATCH STYLE
  // Use a CSS variable `--btn-shadow-color` so we can change the 3D-shadow color
  // (fallback to black) — allows swapping to white for dark/black buttons.
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all border-2 border-black bg-white text-black shadow-[4px_4px_0px_var(--btn-shadow-color,_#000)] hover:shadow-[6px_6px_0px_var(--btn-shadow-color,_#000)] active:shadow-[2px_2px_0px_var(--btn-shadow-color,_#000)] active:translate-x-[2px] active:translate-y-[2px] rounded-none",{
    variants: {
  variant: {
    default: "",
    outline: "",
    ghost: "bg-transparent border-none shadow-none hover:bg-gray-100",
    link: "border-none shadow-none underline hover:opacity-70",
  },

  size: {
    default: "h-12 px-8",
    sm: "h-10 px-5 text-xs",
    lg: "h-14 px-10 text-base",
    icon: "size-10",
  },
},
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
