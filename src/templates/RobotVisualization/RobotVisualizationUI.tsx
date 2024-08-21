import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { useActiveRobot, useProgramRunner } from "../../WandelAppContext"
import { useState } from "react"
import claim from "./claim.png"
import Image from "next/image"
import script from "./example.ws"
import {
  defaultAxisConfig,
  useAnimationFrame,
} from "@wandelbots/wandelbots-js-react-components"
import { radiansToDegrees } from "@wandelbots/wandelbots-js"

export const RobotVisualizationUI = () => {
  const activeRobot = useActiveRobot()
  const programRunner = useProgramRunner()

  const [axisConfig, setAxisConfig] = useState(defaultAxisConfig)

  useAnimationFrame(() => {
    const newJoints =
      activeRobot.rapidlyChangingMotionState.state.joint_position.joints

    setAxisConfig([...newJoints].filter((item) => item !== undefined))
  })

  const handleButtonStop = async () => {
    await programRunner.stopProgram()
  }

  const handleButtonExecute = async () => {
    programRunner.executeProgram(script)
  }

  const BlurredCard = styled(Card)({
    backgroundColor: "#ffffff11",
    borderRadius: "8px",
    padding: "8px 24px",
    border: "1px solid #ffffff22",
    cursor: "pointer",
    backdropFilter: "blur(50px)",
    pointerEvents: "none",
    userSelect: "none",
  })

  return (
    <>
      <div style={{ pointerEvents: "none", zIndex: 1 }}>
        <Grid container spacing={2} style={{ pointerEvents: "none" }}>
          <Grid item xs={8}>
            <Stack
              direction="column"
              spacing={0}
              justifyContent="space-between"
              alignItems="flex-start"
              overflow="hidden"
              height={"93vh"}
              padding={5}
            >
              <BlurredCard
                style={{ maxWidth: "500px" }}
                onClick={() => (window.location.href = "/docs")}
              >
                <CardContent>
                  <Typography
                    variant="body2"
                    color="white"
                    fontFamily={"Monaco"}
                    sx={{ marginTop: "8px", marginBottom: "14px" }}
                  >
                    Welcome dear{" "}
                    <span style={{ color: "#F3C832" }}>Developer :]</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                    fontFamily={"Monaco"}
                  >
                    → Get started by editing{" "}
                    <span style={{ color: "#49D4FF" }}>
                      app/WandelAppMain.tsx
                    </span>
                  </Typography>
                </CardContent>
              </BlurredCard>
              <Image
                src={claim}
                alt="Nova"
                width={546 / 3.5}
                height={63 / 3.5}
              />
            </Stack>
          </Grid>
          <Grid item xs={4} style={{ pointerEvents: "auto" }}>
            <Stack
              direction="column"
              spacing={0}
              justifyContent="space-between"
              alignItems="flex-start"
              overflow="hidden"
              height={"90vh"}
              padding={7}
              sx={{
                background:
                  "linear-gradient(0deg, #10121F88 0%, #00000088 100%)",
              }}
            >
              <Stack
                direction="column"
                spacing={2}
                width={"100%"}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography variant="body2" color="white">
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={0.5}
                    letterSpacing={0.6}
                  >
                    <span style={{ color: "#ffffff88" }}>
                      Connection status:
                    </span>
                    <span style={{ color: "#2affbf" }}>connected</span>
                    <br />
                    <span style={{ color: "#ffffff88" }}>Connected with:</span>
                    <span>{activeRobot.modelFromController}</span>
                    <span>{activeRobot.motionGroupId}</span>
                    <br />
                    <span style={{ color: "#ffffff88" }}>Robot pose:</span>
                    {axisConfig.map((joint, index) => (
                      <span key={index}>
                        Joint {index + 1}: {Math.round(radiansToDegrees(joint))}
                        °
                      </span>
                    ))}
                  </Stack>
                </Typography>
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                width={"100%"}
                alignItems="center"
                justifyContent="space-between"
                paddingBottom={8}
              >
                <Button
                  disabled={programRunner.executionState !== "idle"}
                  variant="contained"
                  color="primary"
                  onClick={handleButtonExecute}
                >
                  Execute wandelscript
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButtonStop}
                >
                  Stop execution
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
