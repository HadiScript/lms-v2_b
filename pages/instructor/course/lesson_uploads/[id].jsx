// lesson_uploads
import React from "react";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageNavigation from "@/components/Instructor/PageNavigation";
import { useRouter } from "next/router";
import UploadLessonForm from "@/components/Instructor/LessonForm";

const Lesson_Uploads = ({ user }) => {
  const router = useRouter();
  const { id: courseId } = router.query;
  return (
    <>
      <Navbar user={user} />

      <div className="ptb-100">
        <div className="container">
          <PageNavigation courseId={courseId} activeClassname="upload" />

          <div className="create-course-form">
            <UploadLessonForm courseId={courseId} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Lesson_Uploads;
