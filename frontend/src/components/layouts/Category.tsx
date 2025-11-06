import { Component } from "react";
import { Button, Card, Grid, Heading, Separator } from "@chakra-ui/react";
import axios from "axios";
import LangTranslator from "@/utils/LangTranslator.ts";
import Languages from "@/utils/enums/Languages";
import { AppContext } from "@/context/AppContext";
import {eventBus} from "@/utils/eventBus.ts";

interface CategoryItem {
    id: number;
    name: string;
}

interface CategoryState {
    categories: CategoryItem[];
    selectedCategoryId: number | null;
}

export default class Category extends Component<{}, CategoryState> {
    static contextType = AppContext;
    declare context: React.ContextType<typeof AppContext>;

    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            selectedCategoryId: null,
        };
    }

    async componentDidMount() {
        const response = await axios.get(`${process.env.VITE_API_URL}/category/getAllCategoryData`);
        const { data } = response.data;
        this.setState({ categories: data, selectedCategoryId: 1 });
    }

    render() {
        const { categories, selectedCategoryId } = this.state;

        const language = this.context?.language ?? Languages.INDONESIA;
        const translator = new LangTranslator(language);

        return (
            <Card.Root width="full">
                <Card.Header>
                    <Heading fontWeight="semibold">
                        {translator.translate("categories.title")}
                    </Heading>
                    <Separator />
                </Card.Header>
                <Card.Body>
                    <Grid gap="2.5">
                        {categories.length > 0 ? (
                            categories.map((category) => {
                                const translatedName = translator.translate(`categories.${category.name.toLowerCase()}`);
                                return (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategoryId === category.id ? "solid" : "outline"}
                                        onClick={() => {
                                            this.setState({ selectedCategoryId: category.id });
                                            eventBus.emit("categoryChange", category.id);
                                        }}
                                        size="xl"
                                    >
                                        {translatedName}
                                    </Button>
                                );
                            })
                        ) : (
                            <Button variant="outline" size="xl">
                                Loading...
                            </Button>
                        )}
                    </Grid>
                </Card.Body>
            </Card.Root>
        );
    }
}
