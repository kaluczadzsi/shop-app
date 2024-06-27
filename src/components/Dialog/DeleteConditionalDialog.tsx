import { useTranslation } from 'react-i18next'
import { DeleteDialog } from './DeleteDialog'
import { DeleteConditionalDialogProps } from './types'

export const DeleteConditionalDialog = ({ type, isOpen, setIsOpen, handleDelete }: DeleteConditionalDialogProps) => {
  const { t } = useTranslation()
  const title = t(`dialog.${type}.title`)
  const description = t(`dialog.${type}.description`)

  return (
    <DeleteDialog
      title={t(title)}
      description={description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleDelete={handleDelete}
    />
  )
}
