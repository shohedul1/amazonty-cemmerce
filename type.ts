export interface ProductType  {
    id: number,
    attributes: {
        title: string,
        isNew: boolean,
        previousPrice: number,
        price: number,
        description: string,
        brand: string,
        category: string,
        rating: number,
        quantity: number,
        image: {
            data: {
                attributes: {
                    url: string,
                }
            }
        }
    }
}

export interface ItemProps{
    item: ProductType;
}