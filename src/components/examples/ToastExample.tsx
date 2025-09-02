import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast-provider"

export function ToastExample() {
  const { addToast } = useToast()

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => {
          addToast({
            title: "Success",
            description: "Operation completed successfully",
            duration: 3000,
          })
        }}
      >
        Show Success Toast
      </Button>

      <Button
        onClick={() => {
          addToast({
            title: "Error",
            description: "Something went wrong",
            duration: 3000,
          })
        }}
      >
        Show Error Toast
      </Button>
    </div>
  )
}
