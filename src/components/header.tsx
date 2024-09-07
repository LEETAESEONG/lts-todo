type HeaderType = {
  theme: string;
};

const Header = ({ theme }: HeaderType) => {
  return (
    <div
      className="bg-[#2c333e] flex justify-center items-center text-white
    phone:text-2xl tablet:text-3xl desktop:text-4xl phone:h-16 tablet:h-20 desktop:h-24
    phone:mb-4 tablet:mb-5 desktop:mb-10"
    >
      <h1 className="font-black">{theme}</h1>
    </div>
  );
};
export default Header;
