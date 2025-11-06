import {Component} from "react";
import { Button, CloseButton, Dialog, Field, Flex, HStack, IconButton, NumberInput, Portal, Separator, Stack, Text, Textarea } from "@chakra-ui/react";
import {BiSave, BiTrash} from "react-icons/bi";
import {LuMinus, LuPlus} from "react-icons/lu";
import axios from "axios";
import CurrencyTranslator from "@/utils/CurrencyTranslator.ts";
import Currencies from "@/utils/enums/Currencies.ts";
import {AppContext} from "@/context/AppContext.tsx";
import Languages from "@/utils/enums/Languages.ts";
import LangTranslator from "@/utils/LangTranslator.ts";
import {eventBus} from "@/utils/eventBus.ts";

interface CartPortalProps {
    product?: { id: number; name: string; price: number; amount: number; description: string };
    onUpdateProduct?: (updated: { id: number; amount: number; description: string }) => void;
    onClose?: () => void;
}

interface CartPortalState {
    id: number,
    amount: number,
    description: string,
}

export default class CartPortal extends Component<CartPortalProps, CartPortalState> {
    static contextType = AppContext;
    declare context: React.ContextType<typeof AppContext>;

    constructor(props: CartPortalProps) {
        super(props);
        this.setState({
            id: 1,
            amount: 1,
            description: "",
        });
    }

    handleAmountChange = (amount: number) => {
        this.setState({
            amount: amount
        });
    };

    handleDescriptionChange = (description: string) => {
        this.setState({
            description: description
        });
    };

    updateCartData = async () => {
        try {
            const { product, onClose } = this.props;
            const { amount, description } = this.state;
            if (!product) return;

            console.log("Id: "+ product.id);
            console.log("Amount: "+ amount);
            console.log("Description: "+ description);

            await axios.put(`${process.env.VITE_API_URL}/cart/updateCartData?id=${product.id}&amount=${amount}&description=${description}`);
            eventBus.emit("cartUpdated");
            onClose?.();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    deleteCartData = async () => {
        const { product, onClose } = this.props;
        if (!product) return;

        try {
            await axios.delete(`${process.env.VITE_API_URL}/cart/deleteCartData?id=${product.id}`);
            eventBus.emit("cartUpdated");
            onClose?.();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    render() {
        const { product } = this.props;
        if (!product) return null;

        const language = this.context?.language ?? Languages.INDONESIA;
        const currency = this.context?.currency ?? Currencies.IDR;
        const currencyTranslator = new CurrencyTranslator(currency);
        const langTranslator = new LangTranslator(language);

        const totalPrice = (product.price * product.amount);

        return (
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content layerStyle={"fill.surface"}>
                        <Dialog.Header>
                            <Dialog.Title fontSize={"2xl"}>{langTranslator.translate(`products.${product.name}`)}</Dialog.Title>
                            <Separator />
                        </Dialog.Header>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Body py={"5"} fontSize={"lg"}>
                            <Stack gap="5">
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>{langTranslator.translate("carts.total-price")}:</Text>
                                    <Text fontWeight={"semibold"}>{currencyTranslator.translate(totalPrice).toLocaleString()} {currency}</Text>
                                </Flex>
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>{langTranslator.translate("carts.amount")}:</Text>
                                    <NumberInput.Root min={1} defaultValue={product.amount.toString()} onValueChange={(v) => {this.handleAmountChange(Number(v.value))}} unstyled spinOnPress={false} fontSize={"lg"} fontWeight={"semibold"} layerStyle={"fill.subtle"}>
                                        <HStack gap="2">
                                            <NumberInput.DecrementTrigger asChild>
                                                <IconButton variant="outline" size="sm">
                                                    <LuMinus />
                                                </IconButton>
                                            </NumberInput.DecrementTrigger>
                                            <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                                            <NumberInput.IncrementTrigger asChild>
                                                <IconButton variant="outline" size="sm">
                                                    <LuPlus />
                                                </IconButton>
                                            </NumberInput.IncrementTrigger>
                                        </HStack>
                                    </NumberInput.Root>

                                </Flex>
                                <Field.Root display={"grid"} gap={"5"} required>
                                    <Field.Label fontSize={"lg"}>
                                        {langTranslator.translate("carts.description")}: <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Textarea size={"xl"} defaultValue={product.description} onChange={(e) => this.handleDescriptionChange(e.target.value)} placeholder="Example: Spicy, Half Rice" layerStyle={"fill.subtle"} />
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant={"solid"} onClick={() => this.updateCartData()}>
                                <BiSave />
                                {langTranslator.translate("carts.save")}
                            </Button>
                            <Button variant={"surface"} onClick={() => this.deleteCartData()}>
                                <BiTrash />
                                {langTranslator.translate("carts.delete")}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        );
    }

}