import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 right-0 z-[100] p-4 w-full max-w-sm">
      {toasts.map(({ id, title, description, variant = "default" }) => (
        <div
          key={id}
          className={`mb-2 p-4 rounded-lg shadow-lg ${
            variant === "destructive"
              ? "bg-red-500 text-white"
              : "bg-white border shadow"
          }`}
        >
          {title && <div className="font-medium">{title}</div>}
          {description && (
            <div className="text-sm mt-1 opacity-90">{description}</div>
          )}
        </div>
      ))}
    </div>
  )
}