import {Component} from "react";
import {
    Button,
    CloseButton,
    Dialog, DialogCloseTrigger,
    Field,
    Flex,
    Grid, Input, NumberInput,
    Portal,
    Separator,
    Stack,
    Text,
    Textarea
} from "@chakra-ui/react";
import {BiSave, BiTrash} from "react-icons/bi";

export default class CartPortal extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content layerStyle={"fill.surface"}>
                        <Dialog.Header>
                            <Dialog.Title fontSize={"2xl"}>Sate Ayam</Dialog.Title>
                            <Separator />
                        </Dialog.Header>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                        <Dialog.Body py={"5"} fontSize={"lg"}>
                            <Stack gap="5">
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>Total Price:</Text>
                                    <Text fontWeight={"semibold"}>Rp. 15,000</Text>
                                </Flex>
                                <Flex justify={"space-between"} alignItems={"center"}>
                                    <Text fontWeight={"medium"}>Amount:</Text>
                                    <NumberInput.Root fontSize={"lg"} fontWeight={"semibold"} layerStyle={"fill.subtle"} defaultValue="10" width="100px">
                                        <NumberInput.Control />
                                        <NumberInput.Input />
                                    </NumberInput.Root>
                                </Flex>
                                <Field.Root display={"grid"} gap={"5"} required>
                                    <Field.Label fontSize={"lg"}>
                                        Description: <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Textarea size={"xl"} placeholder="Example: Spicy, Half Rice" layerStyle={"fill.subtle"} />
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button variant={"solid"}>
                                <BiSave />
                                Save
                            </Button>
                            <Button variant={"surface"}>
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