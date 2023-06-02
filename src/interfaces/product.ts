export interface IProduct {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    isFav: boolean,
    isInCart: boolean,
    amount: number
}