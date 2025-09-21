export interface APIResponse<T> {
  status: "success" | "fail" | "error"
  statusCode: number
  message?: string,
  data?: T
}

export interface LocationProps {
  name: string,
  href: string
}

export interface ButtonProps {
  id?: string,
  className?: string,
  children?: React.ReactNode,
  type?: HTMLButtonElement[ 'type' ];
  loading?: boolean
  onClick?: React.MouseEventHandler;
  color?: ColorProps;
  disabled?: boolean
  variant?: "solid" | "plain" | "outlined" | "soft"
}

export interface ProductProps {
  id: number
  name: string,
  description?: string;
  category: CategoryProps;
  categoryId: number
  img_url?: string
}

export interface CategoryProps {
  id?: number,
  name: string
}

export type ColorProps = "primary" | "secondary" | "success" | "danger" | "warning" | "neutral"
