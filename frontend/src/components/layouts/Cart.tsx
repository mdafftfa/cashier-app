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
import Languages from "@/utils/enums/Languages.ts";
import LangTranslator from "@/utils/LangTranslator.ts";
import {AppContext} from "@/context/AppContext.tsx";
import axios from "axios";
import Currencies from "@/utils/enums/Currencies.ts";
import CurrencyTranslator from "@/utils/CurrencyTranslator.ts";
import {eventBus} from "@/utils/eventBus.ts";

interface ProductItem {
    id: number;
    name: string;
    price: number;
    totalPrice: number;
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

    static contextType = AppContext;
    declare context: React.ContextType<typeof AppContext>;

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

    getAllCartData = async () => {
        try {
            const response = await axios.get(`${process.env.VITE_API_URL}/cart/getAllCartData`);
            const products = Array.isArray(response.data)
                ? response.data
                : response.data.data;

            this.setState({ products: products || [] });
        } catch (error: any) {
            console.log(error.message);
        }
    }

    createOrder = async () => {
        try {
            const csrfRes = await axios.get(`${process.env.VITE_API_URL}/csrf`, {
                withCredentials: true
            });
            const token = csrfRes.data.token;

            await axios.post(
                `${process.env.VITE_API_URL}/order/addOrderData`,
                {},
                {
                    headers: { 'X-CSRF-Token': token },
                    withCredentials: true
                }
            );

            eventBus.emit("cartUpdated");
            window.location.href = "http://localhost:5173/success";
        } catch (error: any) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        this.getAllCartData();
        eventBus.on("cartUpdated", () => {
            this.getAllCartData();

        });
    }

    render() {
        const language = this.context?.language ?? Languages.INDONESIA;
        const currency = this.context?.currency ?? Currencies.IDR;
        const currencyTranslator = new CurrencyTranslator(currency);
        const langTranslator = new LangTranslator(language);

        const { products, currentPage, pageSize } = this.state;
        const totalPages = Math.ceil(products.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        const currentProducts = products.slice(start, start + pageSize);
        const totalPrice = currentProducts.reduce((sum, product) => {
            return sum + product.totalPrice;
        }, 0);

        return (
            <Card.Root layerStyle={"fill.surface"} width="full" height={"3xl"}>
                <Card.Header>
                    <Flex alignItems={"center"} justify={"space-between"}>
                        <Heading maxW={products.length > 6 ? "36" : "full"} fontSize={"2xl"} fontWeight={"semibold"}>{langTranslator.translate("carts.title")}</Heading>
                        {products.length > 6 && (
                            <Pagination.Root maxW={"full"} count={products.length} pageSize={pageSize} page={currentPage} onPageChange={(e) => this.setPage(e.page)}>
                                <ButtonGroup gap="4" size="sm" variant="ghost">
                                    <Pagination.PrevTrigger asChild>
                                        <IconButton onClick={() => this.setPage(Math.max(1, currentPage - 1))}>
                                            <LuChevronLeft />
                                        </IconButton>
                                    </Pagination.PrevTrigger>
                                    <Pagination.PageText fontSize="sm" fontWeight="medium" />
                                    <Pagination.NextTrigger asChild>
                                        <IconButton onClick={() => this.setPage(Math.min(totalPages, currentPage + 1))}>
                                            <LuChevronRight />
                                        </IconButton>
                                    </Pagination.NextTrigger>
                                </ButtonGroup>
                            </Pagination.Root>
                        )}
                    </Flex>
                    <Separator />
                </Card.Header>
                <Card.Body maxHeight={""}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <Grid>
                                {products.length < 1 && (
                                    <Text>{langTranslator.translate("carts.no-orders")}</Text>
                                )}
                                <Grid gap={"2.5"}>
                                    {currentProducts.map((product) => {
                                        return (
                                            <Link display="block" rounded="sm" p="2.5" layerStyle={"fill.surface"} onClick={() => this.selectProduct(product)} >
                                                <Flex alignItems="center" justify="space-between">
                                                    <Flex alignItems="center" gap="2.5">
                                                        <Box layerStyle="fill.muted" fontSize="md" fontWeight="semibold" rounded="sm" px="2.5" py="1">
                                                            {product.amount}
                                                        </Box>
                                                        <Grid>
                                                            <Text fontSize="md" fontWeight="semibold">{langTranslator.translate(`products.${product.name}`)}</Text>
                                                            <Text fontSize="sm">{currencyTranslator.translate(product.price).toLocaleString()} {currency}</Text>
                                                        </Grid>
                                                    </Flex>
                                                    <Text fontSize="md" fontWeight="bold">{currencyTranslator.translate(product.price * product.amount).toLocaleString()} {currency}</Text>
                                                </Flex>
                                            </Link>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Dialog.Trigger>
                        <CartPortal product={this.state.selectedProduct} onClose={() => this.setState({ selectedProduct: undefined })} />
                    </Dialog.Root>

                </Card.Body>
                <Card.Footer display={"grid"} gap={"5"}>
                    <Separator />

                    <Flex justify={"space-between"}>
                        <Text fontWeight={"light"} fontSize={"2xl"}>{langTranslator.translate("carts.total-price")}:</Text>
                        <Text fontWeight={"extrabold"} fontSize={"2xl"}>
                            {products.length === 0 ? `0 ${currency}` :   `${currencyTranslator.translate(Number(totalPrice)).toLocaleString()} ${currency}`}
                        </Text>
                    </Flex>
                    <Button onClick={this.createOrder} variant={"solid"} backgroundColor={"teal.500"} size={"2xl"} fontSize={"2xl"}>
                        <PiTrolleyFill />
                        {langTranslator.translate("carts.pay")}
                    </Button>
                </Card.Footer>
            </Card.Root>
        );

    }

}