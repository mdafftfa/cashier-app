import { Component } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Category from "@/components/layouts/Category.tsx";
import Product from "@/components/layouts/Product.tsx";
import Cart from "@/components/layouts/Cart.tsx";

export default class Home extends Component {
    render() {
        return (
            <Box mt="5">
                <Container maxW="full">
                    <Flex gap={"5"} w="full" justify="space-between">
                        <Box flexBasis={{ base: "100%", md: "15%" }} w={{ base: "100%", md: "15%" }}>
                            <Category />
                        </Box>
                        <Box flexBasis={{ base: "100%", md: "70%" }} w={{ base: "100%", md: "70%" }}>
                            <Product />
                        </Box>
                        <Box display={"fixed"} flexBasis={{ base: "100%", md: "25%" }} w={{ base: "100%", md: "25%" }} position={"static"}>
                            <Cart />
                        </Box>
                    </Flex>
                </Container>
            </Box>
        );
    }
}
