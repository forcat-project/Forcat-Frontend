import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketContainer } from "../../components/Product/ProductContainer";
import styled from "styled-components";

interface ErrorData {
    code: string | null;
    message: string | null;
}

const FailPage: React.FC = () => {
    const navigate = useNavigate();
    const [errorData, setErrorData] = useState<ErrorData>({
        code: null,
        message: null,
    });

    useEffect(() => {
        const fetchErrorData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const params: ErrorData = {
                    code: urlParams.get("code"),
                    message: urlParams.get("message"),
                };
                setErrorData(params);
            } catch (error) {
                console.error("에러 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchErrorData();
    }, []);

    return (
        <MarketContainer>
            <BoxSection>
                <Image src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="결제 실패" />
                <h2>결제를 실패했어요</h2>

                <Grid>
                    <div>
                        <b>에러 메시지</b>
                    </div>
                    <div>{errorData.message || "알 수 없는 오류가 발생했습니다."}</div>
                </Grid>
                <Grid>
                    <div>
                        <b>에러 코드</b>
                    </div>
                    <div>{errorData.code || "N/A"}</div>
                </Grid>
                <div
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button className="primary" onClick={() => navigate(`/market/`)}>
                        확인
                    </Button>
                    <Button
                        className="secondary"
                        onClick={() => (window.location.href = "https://discord.gg/A4fRFXQhRu")}
                    >
                        실시간 문의
                    </Button>
                </div>
            </BoxSection>
        </MarketContainer>
    );
};

export default FailPage;

const BoxSection = styled.div`
    /* width: 600px; */
    text-align: center;
    margin: 20px auto;
`;

const Image = styled.img`
    width: 100px;
`;

const Grid = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 16px;

    &.title {
        margin-top: 50px;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &.primary {
        background-color: #4e96f2;
        color: white;
    }

    &.secondary {
        background-color: #e8f3ff;
        color: #1b64da;
    }

    margin: 0 10px;
`;
