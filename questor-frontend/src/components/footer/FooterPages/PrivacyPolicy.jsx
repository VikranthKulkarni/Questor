import React from "react";
import NavbarDynamic from "../../navbar/NavbarDynamic";
import Fotter from "../../footer/Fotter";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
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
              Privacy Policy
            </h1>
          </header>
          <section className="bg-gray-800 p-6 rounded-xl text-left">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-300">
              Welcome to Questor. Your privacy is important to us. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              2. Information Collection
            </h2>
            <p className="mb-4 text-gray-300">
              We may collect information about you in a variety of ways. The
              information we may collect on the Site includes: Personal Data,
              Derivative Data, Financial Data, Mobile Device Data, Third-Party
              Data.
            </p>
            <h2 className="text-2xl font-bold mb-4">3. Use of Information</h2>
            <p className="mb-4 text-gray-300">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. We may use
              information collected about you via the Site to: Create and manage
              your account, Email you regarding your account, Fulfill and manage
              purchases, Process payments and refunds.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              4. Disclosure of Information
            </h2>
            <p className="mb-4 text-gray-300">
              We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows: By Law
              or to Protect Rights, Business Transfers, Third-Party Service
              Providers, Marketing Communications.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              5. Security of Information
            </h2>
            <p className="mb-4 text-gray-300">
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p className="mb-4 text-gray-300">
              We may update this Privacy Policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal, or regulatory reasons.
            </p>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="mb-4 text-gray-300">
              If you have questions or comments about this Privacy Policy,
              please contact us at support@questor.com. OR
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

export default PrivacyPolicyPage;
