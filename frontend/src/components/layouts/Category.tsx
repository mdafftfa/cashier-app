import {Component} from "react";
import {Button, Card, Heading, Separator} from "@chakra-ui/react";
import axios from "axios";

interface CategoryItem {
    id: number;
    name: string;
}

interface CategoryState {
    categories: CategoryItem[];
    selectedCategoryId: number | null;
}

export default class Category extends Component<{}, CategoryState> {

    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            selectedCategoryId: null,
        };
    }

    getAllCategoryData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/category/getAllCategoryData");
            const { data } = response.data;
            this.setState({ categories: data });
        } catch (error) {
            console.error("Failed to fetch category data:", error);
        }
    };

    async componentDidMount() {
        await this.getAllCategoryData();
        this.setState({ selectedCategoryId: 1 });
    }
    
    changeCategory = (id: number) => {
        this.setState({ selectedCategoryId: id });
        console.log("Selected category ID:", id);
    };

    render() {

        const { categories, selectedCategoryId } = this.state;

        return (
            <Card.Root layerStyle={""} width="full">
                <Card.Header>
                    <Heading fontWeight={"semibold"}>Categories</Heading>
                    <Separator />
                </Card.Header>
                <Card.Body>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Button key={category.id} variant={selectedCategoryId === category.id ? "solid" : "outline"} onClick={() => this.changeCategory(category.id)} size="xl">
                                {category.name}
                            </Button>
                        ))
                    ) : (
                        <Button variant="outline" size="xl">
                            Loading...
                        </Button>
                    )}
                </Card.Body>
            </Card.Root>
        );
    }

}