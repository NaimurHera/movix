import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/movix-logo.svg";
import Container from "../container/Container";
import "./style.scss";
export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [lastScroll, setLastScroll] = useState();
  const [visibleHeader, setVisibleHeader] = useState("top");
  const location = useLocation();

  useEffect(() => {
    //always scroll to the top whenever we navigate through pages
    window.scrollTo(0, 0);
  }, [location]);

  const handleMenu = () => {
    setShowMenu(!showMenu);
    if (showSearch) {
      setShowSearch(false);
    }
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const handleNavbar = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      if (lastScroll > scrollY) {
        setVisibleHeader("show");
      } else {
        setVisibleHeader("hidden");
      }
      setLastScroll(scrollY);
    } else {
      setVisibleHeader("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbar);
    return () => {
      window.removeEventListener("scroll", handleNavbar);
    };
  });

  return (
    <header
      className={`${
        visibleHeader === "show"
          ? "show"
          : visibleHeader === "hidden"
          ? "hidden"
          : "top"
      }`}
    >
      <Container>
        <div className="navbar">
          <div className="logo">
            <Link to={"/"}>
              <img src={logo} alt="brand logo" />
            </Link>
          </div>
          <ul className={`navMenu ${showMenu && "show"}`}>
            <li className="closeIcon" onClick={handleMenu}>
              <CgClose />
            </li>

            <li className="menuItems">
              <Link onClick={handleMenu} to={"/explore/movies"}>
                Movies
              </Link>
            </li>
            <li className="menuItems">
              <Link onClick={handleMenu} to={"/explore/tv-shows"}>
                Tv shows
              </Link>
            </li>
            <li
              className="menuItems"
              onClick={() => {
                handleMenu();
                setShowSearch(true);
              }}
            >
              <HiOutlineSearch />
            </li>
          </ul>

          <div className="mobileMenu">
            <span onClick={handleSearch}>
              <HiOutlineSearch />
            </span>
            <span onClick={handleMenu}>
              <SlMenu />
            </span>
          </div>
          <div className={`mobileSearch ${showSearch && "show"}`}>
            <input type="text" placeholder="Search for movie or tv shows.." />
            <span onClick={handleSearch}>
              <CgClose />
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
