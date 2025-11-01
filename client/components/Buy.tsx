import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function Buy() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button >Purchase</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
    
          </DialogHeader>
      
             <DialogFooter>
            <DialogClose asChild>
              <Button  variant="ghost">Cancel Payment</Button>
            </DialogClose>
    
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
