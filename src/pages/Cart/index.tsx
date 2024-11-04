import { useNavigate } from "react-router-dom";
import { CartEmpty } from "../../components/Cart/CartEmpty";
import { CartList } from "../../components/Cart/CartList";
import { useUserId } from "../../hooks/useUserId";
import { useEffect, useState } from "react";
import { cartProductAPI } from "../../api/resourses/cartProducts";

export default function Cart() {
    const navigate = useNavigate();
    const userId = useUserId();

    const [productsInCart, setProductsInCart] = useState([]);

    const handleContinueShoppingButtonClick = () => {
        navigate("/market");
    };

    const handlePaymentButtonClick = () => {
        console.log("결제하러 이동");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await cartProductAPI.getCartProducts(Number(userId));
                setProductsInCart(res.data);
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }
        };
        fetchData();
    }, [userId]);

    return (
        <>
            {productsInCart.length === 0 ? (
                <CartEmpty onContinueShopping={handleContinueShoppingButtonClick} />
            ) : (
                <CartList onPayment={handlePaymentButtonClick} products={productsInCart} />
            )}
        </>
    );
}
