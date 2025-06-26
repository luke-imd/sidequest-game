import type { SpringOptions } from "framer-motion";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
//import StarBorder from "../animations/StarBorder.tsx";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  // Flip functionality
  enableFlip?: boolean;
  sidequestTitle?: string;
  sidequestDescription?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  enableFlip = false,
  sidequestTitle = "Sidequest",
  sidequestDescription = "Complete this exciting challenge!",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const flipRotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    if (!enableFlip || !isFlipped) {
      rotateX.set(0);
      rotateY.set(0);
    }
    rotateFigcaption.set(0);
  }

  function handleClick() {
    if (enableFlip) {
      setIsFlipped(!isFlipped);
      flipRotateY.set(isFlipped ? 0 : 180);
    }
  }

  return (
      <>
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
        cursor: enableFlip ? 'pointer' : 'default'
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: enableFlip && isFlipped ? 0 : rotateX,
          rotateY: enableFlip ? (isFlipped ? flipRotateY : rotateY) : rotateY,
          scale: enableFlip && isFlipped ? 1 : scale,
        }}
      >
        {/* Front side - Image */}
        <motion.div
          className="absolute top-0 left-0 [backface-visibility:hidden]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <motion.img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover rounded-[15px] will-change-transform [transform:translateZ(0)] border-2 border-dionysos-spring-main"
          />
        </motion.div>

        {/* Back side - Sidequest content */}
        {enableFlip && (
          <motion.div
            className="absolute top-0 left-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-dionysos-spring-bg border-2 border-dionysos-spring-main rounded-[15px] p-6 flex flex-col justify-center items-center text-center"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          >
            <h3 className="text-xl font-bold text-dionysos-spring-main mb-4">
              {sidequestTitle}
            </h3>
            <p className="text-dionysos-spring-main text-sm leading-relaxed">
              {sidequestDescription}
            </p>
          </motion.div>
        )}
        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}

    </figure>
      </>
  );
}
