import WrapperNav from "../../components/nav/WrapperNav";
import Footer from "./Footer";
import Main from "./Main";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between max-w-[1400px] mx-auto h-screen">
            <span className='bg-red-700 text-4xl'>The site is currently experiencing problems with the Twitch API, thank you for your understanding, I am doing what is necessary to resolve the problem as quickly as possible. </span>
            <WrapperNav page="home"/>
            <Main/>
            <Footer/>
        </div>
    );
}
