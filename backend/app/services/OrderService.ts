import { PrismaClient } from "@prisma/client";

export default class OrderService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addOrderData(): Promise<boolean> {
        const carts = await this.prisma.cart.findMany();
        if (carts.length === 0) {
            return false;
        }

        const totalPrice = carts.reduce((sum, product) => sum + product.totalPrice, 0);

        await this.prisma.orders.create({
            data: {
                TotalPrice: totalPrice,
                Products: carts.map((product) => product)
            },
        });

        await this.prisma.cart.deleteMany()
        return true;
    }


}
