import {Component} from "react";
import {Button, Card, Container, Heading} from "@chakra-ui/react";

export default class Category extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card.Root layerStyle={""} width="full" height={"3xl"}>
                <Card.Header>
                    <Heading fontWeight={"semibold"}>Categories</Heading>
                </Card.Header>
                <Card.Body gap="2.5">
                    <Button variant={"solid"} size={"xl"}>Foods</Button>
                    <Button variant={"outline"} size={"xl"}>Drinks</Button>
                    <Button variant={"outline"} size={"xl"}>Snacks</Button>
                </Card.Body>
            </Card.Root>
        );
    }

}