import {Component} from "react";
import {Button, Card, CardBody, CardHeader, Flex, Grid, Image, Text} from "@chakra-ui/react";
import SuccessImage from "@/assets/images/sukses.png";
import {AppContext} from "@/context/AppContext.tsx";
import Languages from "@/utils/enums/Languages.ts";
import LangTranslator from "@/utils/LangTranslator.ts";

export default class Success extends Component {

    static contextType = AppContext;
    declare context: React.ContextType<typeof AppContext>;

    constructor(props: any) {
        super(props);
    }

    render() {

        const language = this.context?.language ?? Languages.INDONESIA;
        const langTranslator = new LangTranslator(language);

        return (
            <Card.Root layerStyle={"fill.subtle"} mt={"5"} alignItems={"center"} height={"2xl"}>
                <CardHeader>
                    <Image boxSize={"sm"} src={SuccessImage} />
                </CardHeader>
                <CardBody>
                    <Grid gap={"10"}>
                        <Grid gap={"1"}>
                            <Text textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>{langTranslator.translate("success.title")}</Text>
                            <Text textAlign={"center"} fontSize={"lg"} fontWeight={"semibold"}>{langTranslator.translate("success.description")}</Text>

                        </Grid>
                        <Button onClick={() => window.location.href = "/"} layerStyle={"fill.solid"} size={"lg"} colorScheme='teal' variant='solid'>
                            <Flex alignItems={"center"} gap={"2.5"}>
                                {langTranslator.translate("success.back")}
                            </Flex>
                        </Button>
                    </Grid>
                </CardBody>
            </Card.Root>
        );
    }

}