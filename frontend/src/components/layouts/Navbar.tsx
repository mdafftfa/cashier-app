import {Avatar, Box, Button, Card, Flex, Menu, Portal, Text} from "@chakra-ui/react";
import {ColorModeIcon, useColorMode} from "@/components/ui/color-mode.tsx";
import {GrCurrency, GrLanguage} from "react-icons/gr";
import Indonesia from "@/assets/icons/indonesia.png";
import USA from "@/assets/icons/united-states-of-america.png";

export default function Navbar () {

    const { toggleColorMode } = useColorMode();

    return (
        <Card.Root p={"5"} layerStyle={""}>
            <Card.Title>
                <Flex justify={"space-between"}>
                    <Text display={"grid"} alignItems={"center"} fontWeight={"extrabold"} fontSize={"2xl"}>Cashier App</Text>
                    <Flex gap={"2"}>
                        <Button variant={"solid"} onClick={toggleColorMode}>
                            <ColorModeIcon />
                            Change Theme
                        </Button>
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant={"surface"}>
                                    <GrCurrency />
                                    IDR
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content fontSize={"lg"} layerStyle={"fill.surface"}>
                                        <Menu.Item display={"flex"} alignItems={"center"} value="new-fileasd" >
                                            <Box layerStyle={"fill.solid"} rounded={"sm"} px={"1"}>
                                                $
                                            </Box>
                                            USD
                                        </Menu.Item>
                                        <Menu.Item display={"flex"} alignItems={"center"} value="new-file" >
                                            <Box layerStyle={"fill.solid"} rounded={"sm"} px={"1"}>
                                                Rp
                                            </Box>
                                            IDR
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>

                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant={"surface"}>
                                    <GrLanguage />
                                    ID / ID
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content fontSize={"lg"} layerStyle={"fill.surface"}>
                                        <Menu.Item value="new-txt" display={"flex"} alignItems={"center"}>
                                            <Avatar.Root size={"sm"}>
                                                <Avatar.Fallback name="U S" />
                                                <Avatar.Image src={USA} />
                                            </Avatar.Root>
                                            EN / US
                                        </Menu.Item>
                                        <Menu.Item value="new-file" display={"flex"} alignItems={"center"}>
                                            <Avatar.Root size={"sm"}>
                                                <Avatar.Fallback name="I D" />
                                                <Avatar.Image src={Indonesia} />
                                            </Avatar.Root>
                                            ID / ID
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </Flex>
                </Flex>
            </Card.Title>
        </Card.Root>
    )
}