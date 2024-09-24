import { navList } from "../../utils/list";

export const Navbar = () => {
  const handleClick = () => {};

  return (
    <div
    style={{backgroundColor: '#1f6feb'}}
      className={`font-poppins text-white w-full z-50  border-b border-n-6 shadow-xl`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <h1 className="block w-[8rem] font-bold text-xl">Finuverse</h1>

        <nav
          className={`hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navList.map((item, index) => (
              <a
                key={index}
                href={item.url}
                onClick={handleClick}
                className={`block relative text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold z-2 lg:text-n-1 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        <button
        style={{backgroundColor: '#f8f9fa'}}
        className="items-center flex justify-center rounded-lg text-black px-4 py-3">
            (Dummy button)
        </button>

        {/* <WalletMultiButton /> */}
      </div>
    </div>
  );
};
