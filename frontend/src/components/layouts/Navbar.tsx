import {Button, Card, Flex, Text} from "@chakra-ui/react";
import {ColorModeIcon, useColorMode} from "@/components/ui/color-mode.tsx";

export default function Navbar () {

    const { toggleColorMode } = useColorMode();

    return (
        <Card.Root p={"5"} layerStyle={""}>
            <Card.Title>
                <Flex justify={"space-between"}>
                    <Text display={"grid"} alignItems={"center"} fontWeight={"extrabold"} fontSize={"2xl"}>Cashier App</Text>
                    <Flex gap={"2"}>
                        <Button variant={"surface"} onClick={toggleColorMode}>
                            <ColorModeIcon />
                            Change Theme
                        </Button>
                    </Flex>
                </Flex>
            </Card.Title>
        </Card.Root>
    )
}