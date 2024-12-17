import Image from "next/image";
import CourseMenu from "./CourseMenu";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-4xl font-black">UCSD Student Evaluations</h1>
          <h3 className="text-lg mt-2">An easy way to explore SET data</h3>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CourseMenu />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ssemtner/ucsd-student-evals"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          ssemtner/ucsd-student-evals
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ssemtner/ucsd-student-evals-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          ssemtner/ucsd-student-evals-site
        </a>
      </footer>
    </div>
  );
}
