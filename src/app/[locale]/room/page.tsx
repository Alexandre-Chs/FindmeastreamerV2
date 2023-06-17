"use client";

import WrapperNav from "@/components/nav/WrapperNav";

export default function Page({ params }: { params: { room: string } }) {
  return (
    <div>
      <WrapperNav page="room" />
    </div>
  );
}
