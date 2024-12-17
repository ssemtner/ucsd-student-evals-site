import { Course, EvalSummary } from "./types";

export async function getCourses(query = "", page = 1) {
  const res = await fetch(
    `${process.env.API_ROOT}/courses?q=${query}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const data = await res.json();

  return (data as Course[]).map((course) => ({
    ...course,
    code: course.code.replaceAll("|", " "),
  }));
}

export async function getCourseSummary(code: string) {
  const decoded = decodeURIComponent(code).replaceAll(" ", "|").toUpperCase();
  const res = await fetch(`${process.env.API_ROOT}/evals/${decoded}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch course summary");
  }

  const data = await res.json();

  return data as EvalSummary;
}
