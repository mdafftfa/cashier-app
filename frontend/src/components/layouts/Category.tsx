import {Component} from "react";
import {Button, Card, Heading, Separator} from "@chakra-ui/react";

export default class Category extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card.Root layerStyle={""} width="full">
                <Card.Header>
                    <Heading fontWeight={"semibold"}>Categories</Heading>
                    <Separator />
                </Card.Header>
                <Card.Body>
                    <Button variant={"solid"} size={"xl"}>Foods</Button>
                    <Button variant={"outline"} size={"xl"}>Drinks</Button>
                    <Button variant={"outline"} size={"xl"}>Snacks</Button>
                </Card.Body>
            </Card.Root>
        );
    }

}