import {Component} from "react";
import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Flex,
    HStack, IconButton, NumberInput,
    Portal,
    Separator,
    Stack,
    Text,
    Textarea
} from "@chakra-ui/react";
import {BiSave, BiTrash} from "react-icons/bi";
import {LuMinus, LuPlus} from "react-icons/lu";

interface CartPortalProps {
    product?: {
        id: number,
        name: string,
        price: number,
        amount: number,
        description: string,
    }
}

export default class CartPortal extends Component<CartPortalProps> {

    proccessSave = () => {

    };

    processDelete = () => {

    };


    render() {
        const { product } = this.props;
        if (!product) return null;

        const totalPrice = (product.price * product.amount).toLocaleString();

        return (
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content layerStyle={"fill.surface"}>
                        <Dialog.Header>
                            <Dialog.Title fontSize={"2xl"}>{product.name}</Dialog.Title>
                            <Separator />
                        </Dialog.Header>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Body py={"5"} fontSize={"lg"}>
                            <Stack gap="5">
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>Total Price:</Text>
                                    <Text fontWeight={"semibold"}>{totalPrice} IDR</Text>
                                </Flex>
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>Amount:</Text>
                                    <NumberInput.Root min={1} defaultValue={product.amount.toString()} unstyled spinOnPress={false} fontSize={"lg"} fontWeight={"semibold"} layerStyle={"fill.subtle"}>
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
                                        Description: <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Textarea size={"xl"} defaultValue={product.description} placeholder="Example: Spicy, Half Rice" layerStyle={"fill.subtle"} />
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant={"solid"} onClick={this.proccessSave}>
                                <BiSave />
                                Save
                            </Button>
                            <Button variant={"surface"} onClick={this.processDelete}>
                                <BiTrash />
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        );
    }

}