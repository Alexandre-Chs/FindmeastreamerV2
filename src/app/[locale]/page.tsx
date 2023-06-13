import WrapperNav from "../../components/nav/WrapperNav";
import Footer from "./Footer";
import Main from "./Main";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between max-w-[1400px] mx-auto h-screen">
      <WrapperNav />
      <Main />
      <Footer />
    </div>
  );
}
