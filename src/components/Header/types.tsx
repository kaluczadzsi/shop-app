export interface NavMenuProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  anchorEl: null | HTMLElement
  handleClose: () => void
  isOpen: boolean
}
