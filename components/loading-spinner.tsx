export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-primary/20 border-t-primary ${sizeClasses[size]}`} />
  )
}
