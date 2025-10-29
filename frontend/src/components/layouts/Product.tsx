import {Component} from "react";
import {Avatar, Button, Card, Container, Heading, Image, Text} from "@chakra-ui/react";

export default class Product extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card.Root layerStyle={""} width="full" height={"full"}>
                <Card.Header>
                    <Heading fontWeight={"semibold"}>Products</Heading>
                </Card.Header>
                <Card.Body gap="2">
                    <Card.Root maxW="sm" overflow="hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            alt="Green double couch with wooden legs"
                        />
                        <Card.Body gap="2">
                            <Card.Title>Living room Sofa</Card.Title>
                            <Card.Description>
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces.
                            </Card.Description>
                            <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                                $450
                            </Text>
                        </Card.Body>
                        <Card.Footer gap="2">
                            <Button variant="solid">Buy now</Button>
                            <Button variant="ghost">Add to cart</Button>
                        </Card.Footer>
                    </Card.Root>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    <Button variant="outline">View</Button>
                    <Button>Join</Button>
                </Card.Footer>
            </Card.Root>
        );
    }

}