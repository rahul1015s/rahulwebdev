type IconProps = {
  className?: string
}

export const WhatsAppIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.03 0C5.4 0 .03 5.37.03 12c0 2.1.55 4.15 1.6 5.96L0 24l6.23-1.63a11.94 11.94 0 0 0 5.8 1.48h.01c6.63 0 12-5.37 12-12a11.9 11.9 0 0 0-3.52-8.37ZM12.04 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.6-.23-.37A9.95 9.95 0 1 1 22 12c0 5.5-4.46 10-9.96 10Zm5.43-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.34.46-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.48.71.3 1.27.48 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
  </svg>
)

export const ArrowRightIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
