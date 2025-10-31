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
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import SateAyam from "@/assets/images/makanan/sate-ayam.jpg";

interface ProductItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductState {
    products: ProductItem[];
    currentPage: number;
    pageSize: number;
}

interface ProductProps {
    onAdd: (product: { id: number, name: string, price: number, image: string }) => void;
}

export default class Product extends Component<ProductProps, ProductState> {
    constructor(props: any) {
        super(props);
        this.state = {
            products: Array.from({ length: 8 }, (_, i) => ({
                id: i + 1,
                name: "Sate Ayam",
                price: 5000,
                image: SateAyam,
            })),
            currentPage: 1,
            pageSize: 6,
        };
    }

    setPage = (page: number) => {
        this.setState({ currentPage: page });
    };

    render() {
        const { products, currentPage, pageSize } = this.state;
        const totalPages = Math.ceil(products.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const currentProducts = products.slice(start, start + pageSize);

        return (
            <Card.Root width="full" height="full">
                <Card.Header>
                    <Heading fontWeight="semibold">Products</Heading>
                    <Separator />
                </Card.Header>

                <Card.Body overflowY="auto">
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="5">
                        {currentProducts.map((product) => (
                            <Link key={product.id} display="block" rounded="md" onClick={() => this.props.onAdd(product)}>
                                <Card.Root size="sm" maxW="sm" overflow="hidden" layerStyle="fill.subtle">
                                    <Image src={product.image} alt={product.name} />
                                    <Card.Body gap="2">
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Description>
                                            {product.price.toLocaleString()} IDR
                                        </Card.Description>
                                    </Card.Body>
                                </Card.Root>
                            </Link>
                        ))}
                    </SimpleGrid>
                </Card.Body>

                <Card.Footer>
                    {products.length > 6 && (
                        <Pagination.Root count={totalPages} pageSize={1}>
                            <ButtonGroup variant="ghost" size="sm">
                                <Pagination.PrevTrigger asChild>
                                    <IconButton onClick={() => this.setPage(Math.max(1, currentPage - 1))}>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <IconButton key={i} variant={i + 1 === currentPage ? "solid" : "outline"} onClick={() => this.setPage(i + 1)}>
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
                    )}
                </Card.Footer>
            </Card.Root>
        );
    }
}
