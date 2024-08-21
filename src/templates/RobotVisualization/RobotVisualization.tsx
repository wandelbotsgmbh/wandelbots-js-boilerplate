import { Box } from "@mui/material"
import { RobotVisualization3DCanvas } from "./RobotVisualization3DCanvas"
import { RobotVisualizationUI } from "./RobotVisualizationUI"

export const RobotVisualization = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
        }}
      >
        <RobotVisualization3DCanvas />
      </Box>
      <RobotVisualizationUI />
    </>
  )
}
