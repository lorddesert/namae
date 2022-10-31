type ButtonProps = {
  label: string,
  onClick: any,
  className?: string
}

export default function Button({className, label, onClick }: ButtonProps) {
  return <button
    onClick={onClick}
    className={` ${className} bg-teal-700 border rounded border-teal-700 py-1 px-2 focus:bg-teal-600 focus:border-teal-600 hover:bg-teal-600 hover:border-teal-600 transition-colors`}
    type='submit'>
    {label}
  </button>
}