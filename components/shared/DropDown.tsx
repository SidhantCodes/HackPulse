"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/mongodb/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
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
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/mongodb/actions/category.actions"



type DropDownProps = {
    value? : string
    onchangehandler?: () => void 
}

const DropDown = ({ value, onchangehandler }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    console.log(newCategory)
    createCategory({
      categoryName: newCategory.trim()
    })
    .then((cat) => {
      setCategories((prev) => [...prev, cat])
    })
  }

  useEffect(() => {
    const getCat = async () => {
      const catsList = await getAllCategories();
      {catsList && setCategories(catsList as ICategory[])}
    }

    getCat();
  }, [])
  return (
    <Select onValueChange={onchangehandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length>0 && categories.map((item) => {
          return (
            <SelectItem key={item._id} value={item._id} className="select-item p-regular-14">{item.name}</SelectItem>
          )
        })}

      <AlertDialog>
        <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8  text-primary-500 hover:bg-primary-50">Create new Category</AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>New Category</AlertDialogTitle>
            <AlertDialogDescription>
              <Input type="text" placeholder="Category Name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      </SelectContent>
    </Select>
  )
}

export default DropDown