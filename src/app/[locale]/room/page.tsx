import WrapperNavRoom from "@/components/nav/WrapperNavRoom";
import MainRoom from "./MainRoom";

export default function Page() {
  return (
    <div>
      <WrapperNavRoom page="room" />
      <MainRoom />
    </div>
  );
}
