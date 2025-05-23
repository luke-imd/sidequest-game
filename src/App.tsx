import Dock, {type DockItemData} from "./components/molecules/Dock.tsx";
import {VscAccount, VscHome, VscSettingsGear} from "react-icons/vsc";
import TiltedCard from "./components/molecules/TiltedCard.tsx";
import sidequestImage from "./assets/sidequest.png"
import StarBorder from "./components/animations/StarBorder.tsx";

const dockItems = [
    { icon: <VscHome size={18} className="text-dionysos-spring-main" />, label: 'Home', onClick: () => console.log("hallo") },
    { icon: <VscAccount size={18} className="text-dionysos-spring-main" />, label: 'Profile', onClick: () => console.log("hallo") },
    { icon: <VscSettingsGear size={18} className="text-dionysos-spring-main" />, label: 'Settings', onClick: () => console.log("hallo") },
] as DockItemData[];

function App() {


  return (
    <>
      <div className="bg-dionysos-spring-bg p-8 min-h-screen">
        <div className="w-full">
            <div className="mx-auto w-fit mt-40 ">
              <TiltedCard
                  imageSrc={sidequestImage}
                  altText="Sidequest Image"
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={18}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                  enableFlip={true}
                  sidequestTitle="Epic Adventure"
                  sidequestDescription="Embark on a journey through mysterious lands and discover ancient secrets waiting to be uncovered."
                  overlayContent={
                      <p className="tilted-card-demo-text text-center w-full">
                          Open me
                      </p>
                  }/></div>
      <StarBorder
          as="button"
          className="custom-class"
          color="cyan"
          speed="5s"
      >hi</StarBorder>
        </div>

        <Dock   items={dockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}/>
      </div>
    </>
  )
}

export default App
