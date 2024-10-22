import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IProduct } from "../../interfaces/product";

export default function MarketDetail() {
    const { productId } = useParams();

    const [productDetail, setProductDetail] = useState<IProduct | null>();
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        axios
            .get(`http://125.189.109.17/api/products/${productId}`)
            .then(response => {
                setProductDetail(response.data);
                console.log("받은 데이터:", response.data);
            })
            .catch((error: AxiosError) => {
                setError(error);
                console.error("통신 실패:", error.message);
            });
    }, [productId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header pageType="marketDetail" />

            {productDetail ? productDetail?.name : "로딩중"}
        </>
    );
}
