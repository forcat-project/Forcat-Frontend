import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const message = urlParams.get("message");

    setErrorData({ code, message });

    // 백엔드에서 오는 에러 코드와 메시지 확인
    console.log("Received Error Code:", code);
    console.log("Received Error Message:", message);
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
          <Button
            className="primary"
            onClick={() => navigate(`/market/`)}
          >
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