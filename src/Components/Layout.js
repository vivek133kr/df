

import { useRouter } from "next/router";

import UPSCNavbarr from "./UPSC/Navbar/Navbar";
import UPSCFooterr from "./UPSC/Footer/Footer";

import Footerr from "./Skills/Footer/Footer";
import Navbarr from "./Skills/Navbar/Navbar";
export default function Layout({ children }) {
  const router = useRouter();
 const path = router.pathname;

  let showUPSCNavbarr = false;
  let showNavbarr = false;

  if (path.includes("/scholarships")) {
    showUPSCNavbarr = true;
  } else if (path.includes("/courses")) {
    showNavbarr = true;
  }

  return (
    <>
      {showUPSCNavbarr && <UPSCNavbarr />}
      {showNavbarr && <Navbarr />}
      <main>{children}</main>
      {showUPSCNavbarr && <UPSCFooterr />}
      {showNavbarr && <Footerr />}
    </>
  );
}