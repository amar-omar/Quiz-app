import Logo from "../assets/QUIZ-3D.png";

export default function Header() {
  return (
  <header className="flex flex-col items-center justify-center pt-[150px] ">
  <img
    src={Logo}
    alt="ImageLogo"
    className="w-[100px]"
  />
  <h1 className="uppercase text-blue-700 font-bold mt-2 text-3xl">react quiz</h1>
</header>
  );
}
