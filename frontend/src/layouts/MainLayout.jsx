/** @format */
import ChatBotButton from "../components/ChatBotButton";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import CompareDrawer from "../components/CompareDrawer";

const MainLayout = ({ children }) => {
  return (
    <>
    <div className="relative bg-cover bg-center flex flex-col items-center w-full">
      <NavBar />
      {children}
      <ChatBotButton/>
      <CompareDrawer />
    </div>
    <Footer/>
    </>
  );
};

export default MainLayout;
