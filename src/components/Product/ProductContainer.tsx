// productContainer.tsx
import styled from "styled-components";
export const MarketContainer = styled.div`
    width: 100%;
    height: 100vh;
    margin: 50px 10px 0 10px;
    overflow-y: auto; // 스크롤 가능하게 설정
    height: calc(100vh - 103px - 93px); // 전체 화면 높이에서 header와 navigator 높이를 뺀 값
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 10px;
    margin-bottom: 30px;
`;

export const ProductCard = styled.div`
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden; /* 이미지 확대 시 카드 밖으로 넘치지 않도록 설정 */
    transition: box-shadow 0.3s, transform 0.3s; /* 부드러운 전환 효과 추가 */
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* hover 시 그림자 강화 */
        transform: scale(1.05); /* hover 시 카드 확대 */
    }
`;

export const ProductImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden; /* 이미지가 확대될 때 잘림 방지 */
`;

export const ProductImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
    transition: transform 0.3s; /* 부드러운 전환 효과 추가 */
    ${ProductCard}:hover & {
        transform: scale(1.1); /* hover 시 이미지 확대 */
    }
`;

export const ProductDetails = styled.div`
    text-align: left;
    margin-top: 10px;
`;

export const ProductCompany = styled.div`
    color: #999;
    font-size: 12px;
    margin-top: 5px;
    font-weight: bold;
`;

export const ProductName = styled.div`
    margin: 10px 0;
    font-size: 12px;
`;

export const ProductPrice = styled.div`
    font-size: 14px;
    color: #333;
`;

export const OriginalPrice = styled.span`
    text-decoration: line-through;
    color: #999;
    margin-right: 10px;
`;

export const DiscountRate = styled.span`
    color: #fa7586;
    margin-right: 10px;
    font-weight: bold;
`;

export const DiscountedPrice = styled.span`
    color: #333;
    font-weight: bold;
`;

export const SoldoutBox = styled.div<{ width?: string; height?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 18px;
    font-weight: bold;
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "100%"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

export const LoadingMessage = styled.div`
    text-align: center;
    font-size: 14px;
    padding: 10px;
`;

export const EndOfListMessage = styled.div`
    text-align: center;
    color: #999;
    font-size: 16px;
    margin-top: 20px;
`;
