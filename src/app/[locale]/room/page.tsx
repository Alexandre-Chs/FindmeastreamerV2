import WrapperNav from "@/components/nav/WrapperNav";
import MainRoom from "./MainRoom";

export default function Page() {
  return (
    <div>
      <WrapperNav page="room" />
      <MainRoom />
    </div>
  );
}
