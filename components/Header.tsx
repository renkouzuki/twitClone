import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  const [prevScrollPros , setPrevScrollPos] = useState(0);
  const [visible , setVisible] = useState(true);

  const handleScroll = () =>{
    const currentScrollPos = window.scrollY

    if(currentScrollPos > prevScrollPros){
      setVisible(false)
    }else{
      setVisible(true)
    }
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll)
  })

  return (
    <div className={`border-b-[1px] border-neutral-800 backdrop-blur-md bg-black/30  p-5 ${visible ? "sticky top-0 z-40" : ""}`}>
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack 
            onClick={handleBack} 
            color="white" 
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className="text-white text-xl font-semibold">
          {label}
        </h1>
      </div>
    </div>
  );
}

export default Header;
