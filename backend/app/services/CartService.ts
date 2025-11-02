import { PrismaClient } from "@prisma/client";

export default class CartService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return this.prisma.cart.findMany();
    }
    
}
