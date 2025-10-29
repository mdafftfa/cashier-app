import {Component} from "react";
import {Avatar, Button, Card, Container, Flex, Heading, Text} from "@chakra-ui/react";
import {PiTrolleyFill} from "react-icons/pi";

export default class Cart extends Component {

    render() {
        return (
            <Card.Root layerStyle={""} width="full" height={"3xl"}>
                <Card.Header>
                    <Heading fontSize={"2xl"} fontWeight={"semibold"}>Order Details</Heading>
                </Card.Header>
                <Card.Body gap="2">

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