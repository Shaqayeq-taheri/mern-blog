import React from 'react'

function About() {
  return (
      <div className="space-y-6 max-w-2xl min-h-screen flex flex-col gap-3 items-center justify-center mx-auto text-center">
          <h1 className="text-3xl font-semibold text-center">
              This is Shaqayeq's blog
          </h1>
          <div>
              This blog was created by Shaqayeq Taheritizro to share her journey
              as a developer, her interests, and the things she's learning along
              the way. Shaqayeq studied Computer Engineering (Bachelor’s and
              Master’s) at IAUH.
          </div>
          <div>
              Since completing her studies, she has worked as a web developer,
              focusing on technologies like React, JavaScript, and Node.js. She
              enjoys building clean, responsive websites and exploring new
              tools—especially in the areas of frontend development, user
              experience, and agile methodologies like Scrum.{" "}
          </div>
          <div>
              Outside of tech, Shaqayeq loves listening to music and history
              podcasts, traveling, and staying active through swimming and
              playing badminton. This blog is her personal space to document
              tech insights, project updates, and topics that spark curiosity.
          </div>
      </div>
  );
}

export default About
