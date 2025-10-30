import { Component } from "react";
import {
    Card,
    Heading,
    Image,
    Link,
    Separator,
    SimpleGrid,
} from "@chakra-ui/react";
import SateAyam from "@/assets/images/makanan/sate-ayam.jpg";

export default class Product extends Component {
    render() {
        return (
            <Card.Root width="full" height="full">
                <Card.Header>
                    <Heading fontWeight="semibold">Products</Heading>
                    <Separator />
                </Card.Header>

                <Card.Body overflowY={"auto"}>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={"5"}>
                        <Link display="block" rounded="md">
                            <Card.Root maxW="sm" overflow="hidden" layerStyle="fill.subtle">
                                <Image src={SateAyam} alt="Sate Ayam"/>
                                <Card.Body gap="2">
                                    <Card.Title>Sate Ayam</Card.Title>
                                    <Card.Description>
                                        Rp. 5,000
                                    </Card.Description>
                                </Card.Body>
                            </Card.Root>
                        </Link>
                    </SimpleGrid>
                </Card.Body>
            </Card.Root>
        );
    }
}
