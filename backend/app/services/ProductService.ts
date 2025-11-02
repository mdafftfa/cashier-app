import { PrismaClient } from "@prisma/client";

export default class ProductService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return this.prisma.product.findMany();
    }

}
