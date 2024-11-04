import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  BoxSection,
  Grid,
  Button,
  Image,
} from "../../../src/style/SuccessPage.styles"; // 스타일 파일 import
import { MarketContainer } from "../../components/Product/ProductContainer";

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
        <Image
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="결제 실패"
        />
        <h2>결제를 실패했어요</h2>

        <Grid>
          <div>
            <b>에러 메시지</b>
          </div>
          <div>{errorData.message}</div>
        </Grid>
        <Grid>
          <div>
            <b>에러 코드</b>
          </div>
          <div>{errorData.code}</div>
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
            onClick={() =>
              (window.location.href = "https://discord.gg/A4fRFXQhRu")
            }
          >
            실시간 문의
          </Button>
        </div>
      </BoxSection>
    </MarketContainer>
  );
};

export default FailPage;