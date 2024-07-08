import React from "react";
import NavbarDynamic from "../../navbar/NavbarDynamic";
import Fotter from "../../footer/Fotter";

const teamMembers = [
  {
    name: "Achuth Dintakurthi",
    image:
    "https://rukminim2.flixcart.com/image/850/1000/kyt0ya80/poster/0/8/f/medium-kid-luffy-monkey-d-luffy-one-piece-anime-hd-matte-finish-original-imagaybn3qgbwufb.jpeg?q=20&crop=false",
    details: "CEO and Founder. Passionate about technology and innovation.",
},
{
    name: "Vikranth Kulkarni",
    image:
    "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24322171/Ash_Ketchum_World_Champion_Screenshot_4.jpg?quality=90&strip=all&crop=21.875,0,56.25,100",
    details: "CTO. Expert in software architecture and development.",
  },
  {
    name: "Nikesh Ravula",
    image:
      "https://i.pinimg.com/736x/9e/ba/1d/9eba1da13de893e89f06fb9fb36c97ac.jpg",
    details: "COO. Ensuring operational excellence and efficiency.",
  },
  {
    name: "Yashwanth Reddy",
    image: "https://wallpapercave.com/wp/wp6919644.jpg",
    details: "CFO. Managing financial operations and strategy.",
  },
];

const AboutUsPage = () => {
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
      <div style={{ zIndex: "999" }}>
        <NavbarDynamic links={navbarLinks} />
      </div>
      <div className="flex-grow w-full flex justify-center items-center mt-8 md:mt-28">
        <div className="mx-auto w-11/12 md:w-3/4 p-4">
          <header className="bg-gray-900 shadow mb-8 rounded-xl p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
            <p className="text-center text-gray-300">
              Welcome to Questor. We are a team dedicated to delivering the best
              online learning experience.
            </p>
          </header>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-gray-800 p-6 rounded-xl text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-400">{member.details}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Fotter />
    </div>
  );
};

export default AboutUsPage;
