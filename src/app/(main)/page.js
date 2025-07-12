import React from "react";
import Hero from "../components/organisms/Hero";
import PopularUniversities from "../components/organisms/PopularUniversities";
import PopularCourses from "../components/organisms/PopularCourses";
import OurTeam from "../components/organisms/OurTeam";
import LatestArticles from "../components/organisms/LatestArticles";
import "../globals.css"; // Import global styles
import BrowseCourses from "../components/organisms/BrowseCourses";
import SearchBar from "../components/organisms/SearchBar";
import NewStudentForm from "../components/molecules/NewStudentForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className=" complete-page-spaceing bg-white">
        <SearchBar />
        <PopularUniversities />
        <PopularCourses />
        <BrowseCourses />
        <OurTeam />
        <LatestArticles />
      <NewStudentForm/>
      </div>
    </div>
  );
} 