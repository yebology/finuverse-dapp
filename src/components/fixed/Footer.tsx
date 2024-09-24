import { navList } from "../../utils/list";

export const Footer = () => {
  return (
    <footer 
    style={{backgroundColor: '#1f6feb'}}
    className="font-poppins text-white py-2 border-t border-gray-200 shadow-lg">
      <ul className="text-md flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-8">
        <li className="font-semibold">
          <span>
            ©<a href="#">Finuverse</a> 2024, All rights reserved.
          </span>
        </li>
        {navList.map((nav, index) => (
          <li 
          key={index}>
            <a href={`${nav.url}`}> {nav.title} </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
