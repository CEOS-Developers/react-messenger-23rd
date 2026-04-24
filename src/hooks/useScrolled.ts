import { useState } from "react";

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 0);
  };

  return { scrolled, handleScroll };
};

export default useScrolled;
