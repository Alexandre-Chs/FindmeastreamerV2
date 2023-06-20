import MainRoom from "./MainRoom";
import WrapperNavRoom from "@/components/nav/WrapperNavRoom";

export default function Page() {
  return (
    <div>
      <WrapperNavRoom page="room" />
      <MainRoom />
    </div>
  );
}
