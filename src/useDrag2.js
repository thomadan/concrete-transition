import { useState } from "react"

const useDrag2 = (startingPosition) => {
  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    translation: startingPosition,
    lastTranslation: startingPosition,
  })

  const { isDragging } = dragInfo
  
  const handleMouseDown2 = ({ clientX, clientY }) => {
    if (!isDragging)
      setDragInfo({
        ...dragInfo,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      })
  }

  const handleMouseMove2 = ({ clientX, clientY }) => {
    if (isDragging) {
      const { origin, lastTranslation } = dragInfo
      setDragInfo({
        ...dragInfo,
        translation: {
          x: Math.abs(clientX - (origin.x + lastTranslation.x)),
          y: Math.abs(clientY - (origin.y + lastTranslation.y)),
        },
      })
    }
  }

  const handleMouseUp2 = () => {
    if (isDragging) {
      const { translation } = dragInfo
      setDragInfo({
        ...dragInfo,
        isDragging: false,
        lastTranslation: { x: translation.x, y: translation.y },
      })
    }
  }

  const picturePosition2 = {
    position: "absolute",
    right: `${dragInfo.translation.x}px`,
    bottom: `${dragInfo.translation.y}px`,
  }

  return {
    picturePosition2,
    handleMouseDown2,
    handleMouseMove2,
    handleMouseUp2
  }
}

export default useDrag2