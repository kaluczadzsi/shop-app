export interface CategoryProps {
  icon: React.ReactElement<any>
  label: string
}

export interface CategoriesProps {
  onClick?: (newOpen: boolean) => void
}
