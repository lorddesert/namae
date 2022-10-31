type ButtonProps = {
  label: string,
  onClick: any,
  className?: string
}

export default function Button({className, label, onClick }: ButtonProps) {
  return <button
    onClick={onClick}
    className={` ${className} bg-teal-500 border rounded border-teal-500 py-1 px-2 hover:bg-teal-600 hover:border-teal-600 transition-colors`}
    type='submit'>
    {label}
  </button>
}