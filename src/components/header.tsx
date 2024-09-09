import { ReactNode } from "react";
type HeaderType = {
  theme: string;
  icon: ReactNode; // 아이콘을 ReactNode로 추가
};

const Header = ({ theme, icon }: HeaderType) => {
  return (
    <div
      className="bg-[#2c333e] flex justify-center items-center text-white
    phone:text-2xl tablet:text-3xl desktop:text-4xl phone:h-16 tablet:h-20 desktop:h-24
    phone:px-4 tablet:px-5 desktop:px-10"
    >
      <span className="mr-2">{icon}</span>
      <h1 className="font-black">{theme}</h1>
    </div>
  );
};
export default Header;
