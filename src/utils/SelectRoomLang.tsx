import Link from "next-intl/link";
import { typePageProps } from "@/types/pageType";

const pageSelected = (page: typePageProps) => {
  switch (page.page) {
    case "home":
      return "/";
      break;
    case "room": {
      return "/room";
      break;
    }
    default:
      return "/";
  }
};

const SelectRoomLang = (page: typePageProps) => {
  const urlLang = pageSelected(page);
  return (
    <>
      <Link
        href={urlLang}
        locale="fr"
        className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
      >
        Français
      </Link>
      <Link
        href={urlLang}
        locale="en"
        className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
      >
        English
      </Link>
      <Link
        href={urlLang}
        locale="es"
        className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
      >
        Español
      </Link>
      <Link
        href={urlLang}
        locale="ko"
        className="hover:bg-[#7f5fb95c] w-full pl-2 pr-2"
      >
        한국어
      </Link>
    </>
  );
};

export default SelectRoomLang;
