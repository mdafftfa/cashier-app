import {Component} from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    Flex,
    Grid,
    Heading,
    Link,
    Separator,
    Text
} from "@chakra-ui/react";
import {PiTrolleyFill} from "react-icons/pi";
import CartPortal from "@/components/modals/CartPortal.tsx";

export default class Cart extends Component {

    render() {
        return (
            <Card.Root layerStyle={""} width="full" height={"3xl"}>
                <Card.Header>
                    <Heading fontSize={"2xl"} fontWeight={"semibold"}>Order Details</Heading>
                    <Separator />
                </Card.Header>
                <Card.Body>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <Link display="block" rounded="sm" p="2.5" layerStyle="fill.surface">
                                <Flex alignItems="center" justify="space-between">
                                    <Flex alignItems="center" gap="2.5">
                                        <Box layerStyle="fill.muted" fontSize="md" fontWeight="semibold" rounded="sm" px="5" py="2.5">
                                            2
                                        </Box>
                                        <Grid>
                                            <Text fontSize="md" fontWeight="semibold">Sate Ayam</Text>
                                            <Text fontSize="sm">Rp. 5,000</Text>
                                        </Grid>
                                    </Flex>
                                    <Text fontSize="md" fontWeight="bold">Rp. 15,000</Text>
                                </Flex>
                            </Link>
                        </Dialog.Trigger>
                        <CartPortal />
                    </Dialog.Root>


                </Card.Body>
                <Card.Footer display={"grid"} gap={"5"}>
                    <Flex justify={"space-between"}>
                        <Text fontWeight={"light"} fontSize={"2xl"}>Total Price:</Text>
                        <Text fontWeight={"extrabold"} fontSize={"2xl"}>Rp. 50,000</Text>
                    </Flex>
                    <Button variant={"solid"} backgroundColor={"teal.500"} size={"2xl"} fontSize={"2xl"}>
                        <PiTrolleyFill />
                        BUY
                    </Button>
                </Card.Footer>
            </Card.Root>
        );
    }

}