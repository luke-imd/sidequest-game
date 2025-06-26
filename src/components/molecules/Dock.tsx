"use client";

// Interactive dock component with smooth magnification effects on hover
// Similar to macOS dock behavior with animated scaling and tooltips

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Data structure for each dock item
export type DockItemData = {
  icon: React.ReactNode;     // Icon to display in the dock
  label: React.ReactNode;    // Tooltip label shown on hover
  onClick: () => void;       // Action when item is clicked
  className?: string;        // Optional custom styling
};

// Main dock component configuration
export type DockProps = {
  items: DockItemData[];     // Array of dock items to display
  className?: string;        // Custom CSS classes
  distance?: number;         // Distance threshold for magnification effect (default: 200px)
  panelHeight?: number;      // Base height of the dock panel (default: 64px)
  baseItemSize?: number;     // Default size of dock items (default: 50px)
  dockHeight?: number;       // Maximum dock height when expanded (default: 256px)
  magnification?: number;    // Maximum size when magnified (default: 70px)
  spring?: SpringOptions;    // Animation spring configuration
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

// Individual dock item with magnification effect based on mouse proximity
function DockItem({
                    children,
                    className = "",
                    onClick,
                    mouseX,
                    spring,
                    distance,
                    magnification,
                    baseItemSize,
                  }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  // Calculate distance from mouse to center of this item
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  // Map mouse distance to item size (closer = larger)
  const targetSize = useTransform(
      mouseDistance,
      [-distance, 0, distance],     // Distance range from item center
      [baseItemSize, magnification, baseItemSize]  // Size range
  );
  const size = useSpring(targetSize, spring);

  //blob
  return (
      <motion.div
          ref={ref}
          style={{
            width: size,
            height: size,
          }}
          onHoverStart={() => isHovered.set(1)}
          onHoverEnd={() => isHovered.set(0)}
          onFocus={() => isHovered.set(1)}
          onBlur={() => isHovered.set(0)}
          onClick={onClick}
          className={`relative inline-flex items-center justify-center rounded-full bg-dionysos-spring-bg border-dionysos-spring-main border-2 shadow-md ${className}`}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
      >
        {/* Pass hover state to child components (icon and label) */}
        {Children.map(children, (child) =>
            cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
        )}
      </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};

// Tooltip label that appears above dock items on hover
function DockLabel({ children, className = "", ...rest }: DockLabelProps) {
  const { isHovered } = rest as { isHovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide label based on hover state
  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  //label bei hover
  return (
      <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-dionysos-spring-light bg-dionysos-spring-main px-2 py-0.5 text-xs text-dionysos-spring-bg`}
                role="tooltip"
                style={{ x: "-50%" }}
            >
              {children}
            </motion.div>
        )}
      </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

// Container for dock item icons
function DockIcon({ children, className = "" }: DockIconProps) {
  return (
      <div className={`flex items-center justify-center ${className}`}>
        {children}
      </div>
  );
}

// Main dock component - renders a horizontal dock with magnification effects
export default function Dock({
                               items,
                               className = "",
                               spring = { mass: 0.1, stiffness: 150, damping: 12 },
                               magnification = 70,
                               distance = 200,
                               panelHeight = 64,
                               dockHeight = 256,
                               baseItemSize = 50,
                             }: DockProps) {
  const mouseX = useMotionValue(Infinity);  // Track mouse X position
  const isHovered = useMotionValue(0);      // Track if dock is hovered

  // Calculate maximum height needed when items are magnified
  const maxHeight = useMemo(
      () => Math.max(dockHeight, magnification + magnification / 2 + 4),
      [magnification, dockHeight]
  );
  // Animate dock height based on hover state
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
      <motion.div
          style={{ height, scrollbarWidth: "none" }}
          className="mx-2 flex max-w-full items-center"
      >
        <motion.div
            onMouseMove={({ pageX }) => {
              isHovered.set(1);         // Mark as hovered
              mouseX.set(pageX);        // Update mouse position
            }}
            onMouseLeave={() => {
              isHovered.set(0);         // Mark as not hovered
              mouseX.set(Infinity);     // Reset mouse position
            }}
            //aussen border
            className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl bg-dionysos-spring-light border-dionysos-spring-main border-2 pb-2 px-4`}
            style={{ height: panelHeight }}
            role="toolbar"
            aria-label="Application dock"
        >
          {items.map((item, index) => (
              <DockItem
                  key={index}
                  onClick={item.onClick}
                  className={item.className}
                  mouseX={mouseX}
                  spring={spring}
                  distance={distance}
                  magnification={magnification}
                  baseItemSize={baseItemSize}
              >
                <DockIcon>{item.icon}</DockIcon>
                <DockLabel>{item.label}</DockLabel>
              </DockItem>
          ))}
        </motion.div>
      </motion.div>
  );
}
