import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanbanBoardPage from "./KanbanBoardPage";
import NavbarDynamic from "../../components/navbar/NavbarDynamic";
import ProjectBoardSideBar from "../../components/SideBar/ProjectBoardSideBar";
import ProjectUpdates from "../../components/ProjectSidePages/ProjectUpdates";
import HowToUse from "../../components/ProjectSidePages/HowToUse";
import TermsAndConditions from "../../components/ProjectSidePages/TermsAndConditions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectLandingPage = () => {
  const { projectId } = useParams();
  const userId = sessionStorage.getItem("userId");
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const navbarLinks = [
    { name: "Home", url: "/userDashboard" },
    { name: "Project Portal", url: `/projects/${userId}` },
    { name: "Wishlist", url: `/wishlist/${userId}` },
    { name: "Contact Us", url: "/contactUs" },
  ];

  useEffect(() => {
    // Fetch project details
    fetch(`http://localhost:8080/questor/projects/getProject/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.title) {
          setProject(data);
          setIsLoading(false);
          toast.success("Project details loaded successfully!");
        } else {
          throw new Error("Invalid project data");
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch project details: " + error);
        setIsLoading(false);
      });
  }, [projectId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <NavbarDynamic links={navbarLinks} />
      <div className="flex-grow flex flex-col lg:flex-row mt-28">
        <ProjectBoardSideBar
          userId={userId}
          onUpdatesClick={() => setIsUpdatesOpen(true)}
          onHowToUseClick={() => setIsHowToUseOpen(true)}
          onTermsClick={() => setIsTermsOpen(true)}
        />
        <div className="flex-grow flex flex-col m-4 space-y-4">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="mt-4">{project.description}</p>
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex-grow">
            <KanbanBoardPage />
          </div>
        </div>
      </div>
      <ProjectUpdates
        isOpen={isUpdatesOpen}
        onClose={() => setIsUpdatesOpen(false)}
      />
      <HowToUse
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />
      <TermsAndConditions
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
};

export default ProjectLandingPage;
