import React, { useEffect } from "react";
import Navbar from "@/components/_App/Navbar";
import LoginForm from "@/components/Authentication/LoginForm";
import Footer from "@/components/_App/Footer";
import { useRouter } from "next/router";

export default function Index({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "cord" || user.role === "admin") {
        router.push("/admin");
        // router.push("/instructor/courses/");
      } else if (user.role === "instructor") {
        router.push("/instructor/courses/");
      } else if (user.role === "student") {
        // router.push(`/learning/student/${user.my_course}`);
        router.push(`/learning/my-courses/`);
      }
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} />
      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-6 col-md-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// import React from "react";
// import Navbar from "@/components/_App/Navbar";
// import MainBanner from "@/components/eLearningSchool/MainBanner";
// import Partner from "@/components/eLearningSchool/Partner";
// import Features from "@/components/eLearningSchool/Features";
// import AboutUs from "@/components/eLearningSchool/AboutUs";
// import PopularCourses from "@/components/eLearningSchool/PopularCourses";
// import FeedbackSliderWithFunFacts from "@/components/eLearningSchool/FeedbackSliderWithFunFacts";
// import GetInstantCourses from "@/components/eLearningSchool/GetInstantCourses";
// import ViewAllCourses from "@/components/eLearningSchool/ViewAllCourses";
// import SubscribeForm from "@/components/Common/SubscribeForm";
// import Footer from "@/components/_App/Footer";
// import baseUrl from "@/utils/baseUrl";

// function Index({ courses, user }) {
//   return (
//     <>
//       <Navbar user={user} />
//       <MainBanner user={user} courses={courses} />
//       <Features />
//       <AboutUs />
//       <PopularCourses user={user} />
//       <FeedbackSliderWithFunFacts />
//       <GetInstantCourses user={user} />
//       <ViewAllCourses />
//       {/* <Partner /> */}
//       <SubscribeForm />
//       <Footer />
//     </>
//   );
// }

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${baseUrl}/api/home-banner`);
//   const { courses } = await res.json();

//   // Pass data to the page via props
//   return { props: { courses } };
// }

// export default Index;
