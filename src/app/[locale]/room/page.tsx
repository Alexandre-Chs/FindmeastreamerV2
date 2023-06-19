import WrapperNav from "@/components/nav/WrapperNav";
import MainRoom from "./MainRoom";
import LotteryManager from "./LotteryManager";

export default function Page() {
  return (
    <div>
      <WrapperNav page="room" />
      <MainRoom />
      <LotteryManager />
    </div>
  );
}
