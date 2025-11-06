import { Component } from "react";
import {
    ButtonGroup,
    Card,
    Heading,
    IconButton,
    Image,
    Link,
    Pagination,
    Separator,
    SimpleGrid,
    Skeleton,
    SkeletonText,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import axios from "axios";
import { eventBus } from "@/utils/eventBus.ts";
import LangTranslator from "@/utils/LangTranslator.ts";
import { AppContext } from "@/context/AppContext.tsx";
import Languages from "@/utils/enums/Languages.ts";
import currencies from "@/utils/enums/Currencies.ts";
import CurrencyTranslator from "@/utils/CurrencyTranslator.ts";

interface ProductItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductState {
    products: ProductItem[];
    selectedCategory: number;
    currentPage: number;
    pageSize: number;
    categoryName: string;
    isLoading: boolean;
}

interface ProductProps {
    onAdd: (product: { id: number; name: string; price: number; image: string }) => void;
    navigate?: (path: string) => void;
}

export default class Product extends Component<ProductProps, ProductState> {
    static contextType = AppContext;
    declare context: React.ContextType<typeof AppContext>;

    constructor(props: any) {
        super(props);
        this.state = {
            products: [],
            selectedCategory: 1,
            currentPage: 1,
            pageSize: 6,
            categoryName: "",
            isLoading: true,
        };
    }

    setPage = (page: number) => {
        this.setState({ currentPage: page });
    };

    getAllProductData = async (categoryId: number): Promise<void> => {
        this.setState({ isLoading: true });
        try {
            const response = await axios.get(`${process.env.VITE_API_URL}/product/getAllProductDataByCategoryId`, {
                params: { categoryId },
            });

            const data = Array.isArray(response.data) ? response.data : response.data.data;
            const products = Array.isArray(data) ? data : [];
            const totalPages = Math.ceil(products.length / this.state.pageSize);

            this.setState((prevState) => {
                const newPage = prevState.currentPage > totalPages ? 1 : prevState.currentPage;
                return { products, currentPage: newPage, isLoading: false }; // 👈 selesai loading
            });
        } catch (error: any) {
            console.error("Fetch error:", error.message);
            this.setState({ products: [], currentPage: 1, isLoading: false });
        }
    };

    getCategoryNameById = async (categoryId: number): Promise<void> => {
        try {
            const response = await axios.get(`${process.env.VITE_API_URL}/category/getCategoryById`, {
                params: { categoryId },
            });

            const data = response.data?.data || response.data;
            const categoryName = Array.isArray(data) && data.length > 0 ? data[0].name.toLowerCase() : "";
            this.setState({ categoryName });
        } catch (error: any) {
            this.setState({ categoryName: "" });
        }
    };

    async componentDidMount() {
        await this.getCategoryNameById(1);
        await this.getAllProductData(1);

        eventBus.on("categoryChange", async (id: number) => {
            this.setState({ currentPage: 1, selectedCategory: id });
            await this.getCategoryNameById(id);
            await this.getAllProductData(id);
        });
    }

    addProductToCart = async (product: ProductItem) => {
        try {
            await axios.post(`${process.env.VITE_API_URL}/cart/addProductToCart?name=${product.name}&price=${product.price}&amount=1&description`);
            eventBus.emit("cartUpdated");
            this.props.navigate?.("/success");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    render() {
        const language = this.context?.language ?? Languages.INDONESIA;
        const currency = this.context?.currency ?? currencies.IDR;
        const { products, currentPage, pageSize, categoryName, isLoading } = this.state;
        const productsArray = Array.isArray(products) ? products : [];
        const totalPages = Math.ceil(productsArray.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const currentProducts = productsArray.slice(start, start + pageSize);

        const langTranslator = new LangTranslator(language);
        const currencyTranslator = new CurrencyTranslator(currency);
        const catTranslator = new LangTranslator(Languages.ENGLISH);
        const catName = catTranslator.translate(`categories.${categoryName.toLowerCase()}`);

        const skeletonCount = 6;

        return (
            <Card.Root width="full" height="full">
                <Card.Header>
                    <Heading fontWeight="semibold">{langTranslator.translate("products.title")}</Heading>
                    <Separator />
                </Card.Header>

                <Card.Body overflowY="auto">
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
                        {isLoading
                            ? Array.from({ length: skeletonCount }).map((_, i) => (
                                <Card.Root key={i} size="sm" maxW="sm" overflow="hidden" layerStyle="fill.subtle">
                                    <Skeleton height="200px" />
                                    <Card.Body gap="2">
                                        <SkeletonText mt="2" noOfLines={2} />
                                    </Card.Body>
                                </Card.Root>
                            ))
                            : currentProducts.map((product) => {
                                const imagePath = `../src/assets/images/${catName}/${product.image}`;
                                return (
                                    <Link key={product.id} display="block" rounded="md" onClick={() => this.addProductToCart(product)}>
                                        <Card.Root size="sm" maxW="sm" overflow="hidden" layerStyle="fill.subtle">
                                            <Image src={imagePath} alt={product.name} />
                                            <Card.Body gap="2">
                                                <Card.Title>
                                                    {langTranslator.translate(`products.${product.name}`)}
                                                </Card.Title>
                                                <Card.Description>
                                                    {currencyTranslator.translate(product.price)} {currency}
                                                </Card.Description>
                                            </Card.Body>
                                        </Card.Root>
                                    </Link>
                                );
                            })}
                    </SimpleGrid>
                </Card.Body>

                {!isLoading && products.length > 6 && (
                    <Card.Footer>
                        <Pagination.Root count={totalPages} pageSize={1}>
                            <ButtonGroup variant="ghost" size="sm">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton onClick={() => this.setPage(Math.max(1, currentPage - 1))}>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <IconButton
                                        key={i}
                                        variant={i + 1 === currentPage ? "solid" : "outline"}
                                        onClick={() => this.setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </IconButton>
                                ))}

                                <Pagination.NextTrigger asChild>
                                    <IconButton onClick={() => this.setPage(Math.min(totalPages, currentPage + 1))}>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </Card.Footer>
                )}
            </Card.Root>
        );
    }
}
