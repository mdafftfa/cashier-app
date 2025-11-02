import { PrismaClient } from "@prisma/client";

export default class CategoryService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return this.prisma.category.findMany();
    }

}
