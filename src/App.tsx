import Dock, {type DockItemData} from "./components/molecules/Dock.tsx";
import SideQBtn from "./components/molecules/generateSideQBtn.tsx";
import sideQBtn from "./components/molecules/generateSideQBtn.tsx";
import {VscAccount, VscArchive, VscHome, VscSettingsGear} from "react-icons/vsc";

const dockItems = [
    { icon: <VscHome size={18} className="text-white" />, label: 'Home', onClick: () => console.log("hallo") },
    { icon: <VscArchive size={18} className="text-white" />, label: 'Archive', onClick: () => console.log("hallo") },
    { icon: <VscAccount size={18} className="text-white" />, label: 'Profile', onClick: () => console.log("hallo") },
    { icon: <VscSettingsGear size={18} className="text-white" />, label: 'Settings', onClick: () => console.log("hallo") },
] as DockItemData[];

function App() {


  return (
    <>
      
      <div className="bg-black p-8 min-h-screen">
        <div className="flex w-full items-center justify-around"><SideQBtn/></div>

        <Dock   items={dockItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}/>
      </div>
    </>
  )
}

export default App
