import WrapperNav from "../../components/nav/WrapperNav";
import Footer from "./Footer";
import Main from "./Main";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between max-w-[1400px] mx-auto h-screen">
      <h1 className="text-5xl bg-red-800">
        Currently under construction, not everything is working properly yet!
        THANKS ♥.
      </h1>
      <WrapperNav page="home" />
      <Main />
      <Footer />
    </div>
  );
}
