import {Component} from "react";
import {
    Box, Button,
    ButtonGroup,
    Card,
    Dialog,
    Flex,
    Grid,
    Heading, IconButton, Link, Pagination,
    Separator,
    Text
} from "@chakra-ui/react";
import CartPortal from "@/components/modals/CartPortal.tsx";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {PiTrolleyFill} from "react-icons/pi";

interface ProductItem {
    id: number;
    name: string;
    price: number;
    amount: number;
    description: string
}

interface ProductState {
    products: ProductItem[];
    currentPage: number;
    pageSize: number;
    selectedProduct?: ProductItem;
}

export default class Cart extends Component<{}, ProductState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            pageSize: 6,
            selectedProduct: undefined,
        };
    }

    setPage = (page: number) => {
        this.setState({ currentPage: page });
    };

    selectProduct = (product: ProductItem) => {
        this.setState({ selectedProduct: product });
    };

    addToCart = (product: ProductItem) => {
        this.setState(prev => ({
            products: [...prev.products, product]
        }));
    }

    render() {

        const { products, currentPage, pageSize } = this.state;
        const totalPages = Math.ceil(products.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const currentProducts = products.slice(start, start + pageSize);
        const totalPrice = currentProducts.map((product) => product.price);

        return (
            <Card.Root layerStyle={"fill.surface"} width="full" height={"3xl"}>
                <Card.Header>
                    <Heading fontSize={"2xl"} fontWeight={"semibold"}>Order Details</Heading>
                    <Separator />
                </Card.Header>
                <Card.Body>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <Grid>
                                {products.length < 1 && (
                                    <Text>No orders available</Text>
                                )}
                                {currentProducts.map((product) => {
                                    return (
                                        <Link display="block" rounded="sm" p="2.5" layerStyle={"fill.surface"} onClick={() => this.selectProduct(product)} >
                                            <Flex alignItems="center" justify="space-between">
                                                <Flex alignItems="center" gap="2.5">
                                                    <Box layerStyle="fill.muted" fontSize="md" fontWeight="semibold" rounded="sm" px="2.5" py="1">
                                                        {product.amount}
                                                    </Box>
                                                    <Grid>
                                                        <Text fontSize="md" fontWeight="semibold">{product.name}</Text>
                                                        <Text fontSize="sm">{product.price.toLocaleString()} IDR</Text>
                                                    </Grid>
                                                </Flex>
                                                <Text fontSize="md" fontWeight="bold">{totalPrice} IDR</Text>
                                            </Flex>
                                        </Link>
                                    );
                                })}
                            </Grid>
                        </Dialog.Trigger>
                        <CartPortal product={this.state.selectedProduct} />
                    </Dialog.Root>

                </Card.Body>
                <Card.Footer display={"grid"} gap={"5"}>
                    <Separator />
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
                    <Flex justify={"space-between"}>
                        <Text fontWeight={"light"} fontSize={"2xl"}>Total Price:</Text>
                        <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                            {products.length === 0 ? "0 IDR" :   `${totalPrice} IDR`}
                        </Text>
                    </Flex>
                    <Button variant={"solid"} backgroundColor={"teal.500"} size={"2xl"} fontSize={"2xl"}>
                        <PiTrolleyFill />
                        PAY
                    </Button>
                </Card.Footer>
            </Card.Root>
        );

    }

}