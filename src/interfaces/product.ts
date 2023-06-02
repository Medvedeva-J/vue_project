export interface IProduct {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    isFav: boolean,
    isInCart: boolean,
}

export default class Product {
    public constructor(
        public id: number,
        public title: string,
        public price: number,
        public category: string,
        public description: string,
        public image: string,
        public isFav: boolean = false,
        public isInCart: boolean = false
    ) { }

    public toggleFav () {
        this.isFav = !this.isFav;
    }

    public toggleIsInCart () {
        this.isInCart = !this.isInCart;
    }
}