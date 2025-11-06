import { PrismaClient } from "@prisma/client";

export default class CategoryService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAll() {
        return await this.prisma.category.findMany();
    }

    async getCategoryById(categoryId: number) {
        return await this.prisma.category.findMany({
            where: {
                id: categoryId
            }
        });
    }
    
}
