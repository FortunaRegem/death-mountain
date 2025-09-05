import PaymentOptionsModal from "@/components/PaymentOptionsModal";
import { useController } from "@/contexts/controller";
import { useDynamicConnector } from "@/contexts/starknet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import GameTokensList from "../components/GameTokensList";
import Leaderboard from "../components/Leaderboard";

export default function LandingPage() {
  const { account } = useAccount();
  const { login } = useController();
  const { currentNetworkConfig } = useDynamicConnector();
  const [showAdventurers, setShowAdventurers] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleShowAdventurers = () => {
    if (
      currentNetworkConfig.chainId === import.meta.env.VITE_PUBLIC_CHAIN &&
      !account
    ) {
      login();
      return;
    }

    setShowAdventurers(true);
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box
          className="container"
          sx={{
            width: "100%",
            gap: 2,
            textAlign: "center",
            height: "420px",
            position: "relative",
          }}
        >
          {!showAdventurers && !showLeaderboard && (
            <>
              <Box sx={styles.headerBox}>
                <Typography sx={styles.gameTitle}>LOOT SURVIVOR 2</Typography>
                <Typography color="secondary" sx={styles.modeTitle}>
                  {currentNetworkConfig.name}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => window.open("https://budokan.gg/", "_blank")}
                sx={{ mt: 1 }}
                startIcon={
                  <img
                    src={"/images/mobile/dice.png"}
                    alt="dice"
                    height="20px"
                  />
                }
              >
                <Typography variant="h5" color="#111111">
                  Tournaments
                </Typography>
              </Button>

              <Button
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleShowAdventurers}
                sx={{ height: "36px", mt: 1, mb: 1 }}
              >
                <Typography variant="h5" color="#111111">
                  My Games
                </Typography>
              </Button>

              <Divider
                sx={{ width: "100%", my: 0.5 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => setShowLeaderboard(true)}
                sx={{ height: "36px", mt: 1, mb: 1 }}
              >
                <Typography variant="h5" color="#111111">
                  Leaderboard
                </Typography>
              </Button>
            </>
          )}

          {showAdventurers && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <Box sx={styles.adventurersHeader}>
                  <Button
                    variant="text"
                    size="large"
                    onClick={() => setShowAdventurers(false)}
                    sx={styles.backButton}
                    startIcon={
                      <ArrowBackIcon fontSize="large" sx={{ mr: 1 }} />
                    }
                  >
                    <Typography variant="h4" color="primary">
                      My Adventurers
                    </Typography>
                  </Button>
                </Box>
              </Box>

              <GameTokensList />
            </>
          )}

          {showLeaderboard && (
            <Leaderboard onBack={() => setShowLeaderboard(false)} />
          )}
        </Box>
      </Box>

      {showPaymentOptions && (
        <PaymentOptionsModal
          open={showPaymentOptions}
          onClose={() => setShowPaymentOptions(false)}
        />
      )}
    </>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    height: "calc(100dvh - 120px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "10px",
    margin: "0 auto",
    gap: 2,
  },
  headerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  adventurersHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    minWidth: "auto",
    px: 1,
  },
  gameTitle: {
    fontSize: "2rem",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 1.1,
  },
  modeTitle: {
    fontSize: "1.6rem",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 1.1,
    mb: 2,
  },
  logoContainer: {
    maxWidth: "100%",
    mb: 2,
  },
  orDivider: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    justifyContent: "center",
    margin: "10px 0",
  },
  orText: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.3)",
    margin: "0 10px",
  },
  bottom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "calc(100% - 20px)",
    position: "absolute",
    bottom: 5,
  },
};
