import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../../../ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { FiEdit } from "react-icons/fi";
import { CrptoType } from "@/react-app-env"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../../../components/ui/form"
import { useEffect, useState } from "react"
import { useDeleteBitcoindataMutation, useUpdateBitcoindataMutation } from "../../../../../redux/slice/CryptoSlice"
import { toast, ToastContainer } from "react-toastify"

interface DataTableRowActionsProps<TData> {
  row: Row<CrptoType>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const crypto = row.original;
  const navigate = useNavigate();
  const [isEditopen,setIsEditOpen]=useState(false)
  const [isDeleteopen,setIsDeleteOpen]=useState(false)
  
  return (<>
  {isEditopen&&<div>
    <EditCrypto crypto={crypto} isEditopen={isEditopen} setIsEditOpen={setIsEditOpen} />
  </div>}
 {isDeleteopen&& <div>
    <AlertDialogDemo crypto={crypto} isDeleteopen={isDeleteopen} setIsDeleteOpen={setIsDeleteOpen} />
  </div>}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] flex-col flex gap-1">
        <DropdownMenuItem><Button variant="ghost" size={"sm"} onClick={()=>setIsEditOpen(true)} >Edit Crypto <FiEdit className="w-16 " size={16} /></Button></DropdownMenuItem> 
        <DropdownMenuItem><Button variant="ghost" size={"sm"} onClick={()=>setIsDeleteOpen(true)} >Delete Crypto <FiEdit className="w-16 " size={16} /></Button></DropdownMenuItem> 
      </DropdownMenuContent>
    </DropdownMenu>
    </>);
}

const formSchema = z.object({
  code: z.string().min(2, {
    message: "code must be at least 2 characters.",
  }),
  rate: z.number(),
  volume: z.number(),
  cap: z.number(),
})

export function EditCrypto({ crypto,isEditopen,setIsEditOpen }: { crypto: CrptoType,isEditopen:boolean,setIsEditOpen:any }) {
  const [updateCrypto,{isSuccess}] =  useUpdateBitcoindataMutation();

  const initialValues = { ...crypto }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })
  useEffect(()=>{
    if(isEditopen){
      setOpen(true)
    }
  },[isEditopen])
  useEffect(()=>{
    if(isSuccess){
      toast.success("Crypto Data updated")
    }
  },[isSuccess])

  const [open,setOpen]=useState(false)
  const handleClose=()=>{
    setOpen(false)
    setIsEditOpen(false)
  }
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
  await updateCrypto({...values,id:crypto._id})
    setOpen(false)
    setIsEditOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={() => {
      if (!open) {
        setOpen(true);
      } else {
        handleClose();
      }}}>
      <DialogTrigger asChild>
       {/*  <Button variant="ghost" >Edit Crypto <FiEdit className="w-16 " size={16} /></Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Crypto</DialogTitle>
          <DialogDescription>
           
          </DialogDescription>
        </DialogHeader>
         <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crypto Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="rate" {...field}  onChange={event => {
                      const value = parseFloat(event.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      }
                    }} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume</FormLabel>
                    <FormControl>
                      <Input placeholder="volume" {...field}  onChange={event => {
                      const value = parseFloat(event.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      }
                    }}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cap</FormLabel>
                    <FormControl>
                      <Input placeholder="cap" {...field}  onChange={event => {
                      const value = parseFloat(event.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      }
                    }}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}



export function AlertDialogDemo({ crypto,isDeleteopen,setIsDeleteOpen }: { crypto: CrptoType,isDeleteopen:boolean,setIsDeleteOpen:any }) {
 const [deleteBitcoindata,{isSuccess,isError,error}]=useDeleteBitcoindataMutation()
 useEffect(()=>{
  if(isDeleteopen){
    setOpen(true)
  }
},[isDeleteopen])

const [open,setOpen]=useState(false)
const handleClose=()=>{
  setOpen(false)
  setIsDeleteOpen(false)
}

/* useEffect(()=>{
  if(isSuccess){
    toast.success("Crypto Data Deleted")
  }
},[isSuccess]) */

 const handleDelete =async()=>{
await deleteBitcoindata({id:crypto._id})
toast.success("Crypto Data Deleted")
  setOpen(false)
  setIsDeleteOpen(false)
 }
  return (
    <AlertDialog open={open} onOpenChange={() => {
      if (!open) {
        setOpen(true);
      } else {
        handleClose();
      }}}>
    {/*   <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Crypto</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete crypto data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
