const Footer = () => {
  return (
    <div>
      <hr />
      <div className="phone:h-20 tablet:h-24 desktop:h-36 w-full flex justify-center items-center gap-10">
        <div>
          <p>
            made by <span className="font-black">Taeseong Lee</span>
          </p>
          <p>with <span className="font-black">Ant-Design v.5.20.6+</span></p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
