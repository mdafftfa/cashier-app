import { PrismaClient } from "@prisma/client";

export default class CartService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return this.prisma.cart.findMany();
    }

    async addProductToCart(name: string, price: number | string, amount: number | string, description: string) {
        const numericPrice = Number(price);
        const numericAmount = Number(amount) || 1;

        if (isNaN(numericPrice)) throw new Error("Invalid price");

        const existingProduct = await this.prisma.cart.findFirst({ where: { name } });

        if (existingProduct) {
            const totalPriceIncrement = numericPrice * numericAmount;
            return await this.prisma.cart.update({
                where: { id: existingProduct.id },
                data: {
                    amount: existingProduct.amount + numericAmount,
                    totalPrice: existingProduct.totalPrice + totalPriceIncrement, // number, bukan string
                },
            });
        } else {
            const totalPrice = numericPrice * numericAmount;
            return await this.prisma.cart.create({
                data: {
                    name,
                    price: numericPrice,
                    amount: numericAmount,
                    totalPrice,
                    description,
                },
            });
        }
    }

    async updateCartData(id: number, amount: number, description: string) {
        return await this.prisma.cart.updateMany({
            where: { id: id },
            data: {
                amount: Number(amount),
                description: description ?? "",
            },
        });
    }

    async deleteCartData(id: number) {
        return await this.prisma.cart.delete({
            where: {
                id: id
            },
        });
    }
    
}