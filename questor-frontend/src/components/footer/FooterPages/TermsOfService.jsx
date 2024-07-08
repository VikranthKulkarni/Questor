import React from "react";
import NavbarDynamic from "../../navbar/NavbarDynamic";
import Fotter from "../../footer/Fotter";
import { Link } from "react-router-dom";

const TermsOfServicePage = () => {
  const userId = sessionStorage.getItem("userId");
  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
    { name: "About Us", url: "/about-us" },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div style={{ zIndex: "9999999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>
      <div className="flex-grow w-full flex justify-center items-center mt-8 md:mt-28">
        <div className="mx-auto w-11/12 md:w-3/4 p-4">
          <header className="bg-gray-900 shadow mb-8 rounded-xl p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Terms of Service
            </h1>
          </header>
          <section className="bg-gray-800 p-6 rounded-xl text-left">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-300">
              Welcome to Questor. By accessing or using our services, you agree
              to be bound by these terms of service ("Terms"). If you do not
              agree to these Terms, you must not use our services.
            </p>
            <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
            <p className="mb-4 text-gray-300">
              You agree to use our services only for lawful purposes and in a
              way that does not infringe the rights of, restrict, or inhibit
              anyone else's use and enjoyment of the services.
            </p>
            <h2 className="text-2xl font-bold mb-4">3. Privacy</h2>
            <p className="mb-4 text-gray-300">
              Your privacy is important to us. Please review our{" "}
              <Link to="/privacy-policy" className="text-blue-500">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and share information about
              you.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              4. Intellectual Property
            </h2>
            <p className="mb-4 text-gray-300">
              All content and materials provided by Questor, including but not
              limited to text, graphics, logos, and images, are the intellectual
              property of Questor and are protected by applicable copyright,
              trademark, and other intellectual property laws.
            </p>
            <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
            <p className="mb-4 text-gray-300">
              We reserve the right to terminate or suspend your access to our
              services at any time, without notice, for conduct that we believe
              violates these Terms or is harmful to other users of our services,
              us, or third parties, or for any other reason.
            </p>
            <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
            <p className="mb-4 text-gray-300">
              We may modify these Terms at any time. We will notify you of any
              changes by posting the new Terms on this page. Your continued use
              of our services after any such changes constitutes your acceptance
              of the new Terms.
            </p>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="mb-4 text-gray-300">
              If you have any questions about these Terms, please contact us at
              support@questor.com.OR
              <Link
                to="/contactus"
                className="text-blue-400 hover:text-gray-200"
              >
                {" "}
                click here
              </Link>
            </p>
          </section>
        </div>
      </div>
      <Fotter />
    </div>
  );
};

export default TermsOfServicePage;
