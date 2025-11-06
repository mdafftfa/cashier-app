import { useNavigate } from "react-router-dom";
import Product from "@/components/layouts/Product.tsx";

export function Navigator(Component: any) {
    function ComponentWithRouterProp(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }

    return ComponentWithRouterProp;
}

export default Navigator(Product);