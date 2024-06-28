import { CartItem } from "./product"

export interface User {
    id: number,
    username: string,
    email: string,
    role: string,
    token?: string,
    gender?: string,
    firstName?: string,
    lastName?: string
    cart?:CartItem[]
}
