import { Dispatch, SetStateAction } from 'react'

export interface DeleteDialogProps {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleDelete: () => void
}

export enum DeleteType {
  All = 'all',
  Single = 'single'
}

export interface DeleteConditionalDialogProps extends Omit<DeleteDialogProps, 'title' | 'description'> {
  type: DeleteType
}
