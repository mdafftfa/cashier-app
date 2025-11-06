import { PrismaClient } from "@prisma/client";

export default class ProductService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return await this.prisma.product.findMany();
    }

    async getAllByCategoryId(categoryId: number) {
        return await this.prisma.product.findMany({
            where: {
                categoryId: categoryId
            },
        });
    }

}