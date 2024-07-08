import React from "react";
import NavbarDynamic from "../../navbar/NavbarDynamic";
import Fotter from "../../footer/Fotter";
import { Link } from "react-router-dom";

const CookieNoticePage = () => {
  const userId = sessionStorage.getItem("userId");
  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
    { name: "My Requests", url: `/userRequests/${userId}` },
    { name: "About Us", url: "/about-us" }
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <div style={{ zIndex: "999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>
      <div className="flex-grow w-full flex justify-center items-center mt-8 md:mt-28">
        <div className="mx-auto w-11/12 md:w-3/4 p-4">
          <header className="bg-gray-900 shadow mb-8 rounded-xl p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Cookie Notice
            </h1>
          </header>
          <section className="bg-gray-800 p-6 rounded-xl text-left">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4 text-gray-300">
              Questor ("we", "us", "our") uses cookies and similar technologies
              to provide, protect, and improve our services. This Cookie Notice
              explains what cookies are, how we use them, and your choices
              regarding their use.
            </p>
            <h2 className="text-2xl font-bold mb-4">2. What are Cookies?</h2>
            <p className="mb-4 text-gray-300">
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile) when you visit a website. They help
              the website remember your actions and preferences (such as login,
              language, font size, and other display preferences) over a period
              of time, so you don’t have to keep re-entering them whenever you
              come back to the site or browse from one page to another.
            </p>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Cookies</h2>
            <p className="mb-4 text-gray-300">
              We use cookies for various purposes, including:
              <ul className="list-disc ml-6">
                <li className="mt-2">
                  Authentication: To remember your login status so you don’t
                  have to log in every time you visit our site.
                </li>
                <li className="mt-2">
                  Preferences: To remember your settings and preferences.
                </li>
                <li className="mt-2">
                  Analytics: To help us understand how our website is being
                  used, which helps us improve your experience.
                </li>
                <li className="mt-2">
                  Advertising: To deliver personalized advertisements that we
                  believe are relevant to you and your interests.
                </li>
              </ul>
            </p>
            <h2 className="text-2xl font-bold mb-4">
              4. Types of Cookies We Use
            </h2>
            <p className="mb-4 text-gray-300">
              <strong>Session Cookies:</strong> These are temporary cookies that
              remain on your device until you leave our website.
              <br />
              <strong>Persistent Cookies:</strong> These cookies remain on your
              device for a set period or until you delete them.
              <br />
              <strong>First-Party Cookies:</strong> These are cookies set by our
              website.
              <br />
              <strong>Third-Party Cookies:</strong> These are cookies set by
              other websites or services that run content on our website (e.g.,
              advertisements, social media widgets).
            </p>
            <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
            <p className="mb-4 text-gray-300">
              Most web browsers allow you to control cookies through their
              settings preferences. However, if you limit the ability of
              websites to set cookies, you may worsen your overall user
              experience, since it will no longer be personalized to you. It may
              also stop you from saving customized settings like login
              information.
            </p>
            <h2 className="text-2xl font-bold mb-4">
              6. Changes to This Notice
            </h2>
            <p className="mb-4 text-gray-300">
              We may update this Cookie Notice from time to time to reflect
              changes in our practices or relevant laws. We will notify you of
              any changes by posting the new Notice on this page.
            </p>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="mb-4 text-gray-300">
              If you have questions or comments about this Cookie Notice, please
              contact us at support@questor.com.OR
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

export default CookieNoticePage;
