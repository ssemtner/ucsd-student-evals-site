"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function CourseMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/courses?q=${debouncedQuery}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        }
        setCourses((prev) => (page === 1 ? data : [...prev, ...data]));
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [debouncedQuery, page]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" aria-expanded={open}>
          Explore Evaluations
          <kbd className="pointer-events-none ms-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-black">
            &#8984;K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full p-0">
        <DialogTitle className="hidden">Search for a course</DialogTitle>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for a a course"
            onValueChange={(value) => {
              setQuery(value);
              setPage(1);
              setHasMore(true);
            }}
          />
          <CommandList
            onScroll={(e: React.UIEvent<HTMLDivElement>) => {
              const target = e.target as HTMLDivElement;
              const bottom =
                target.scrollHeight - target.scrollTop === target.clientHeight;
              if (bottom && !loading && hasMore) {
                setPage((prev) => prev + 1);
              }
            }}
          >
            <CommandEmpty
              className={error !== null ? "text-red-800 dark:text-red-500" : ""}
            >
              {loading ? "Loading..." : "No courses found"}
            </CommandEmpty>
            {courses.map((course) => (
              <CommandItem
                key={course.code}
                onSelect={() => {
                  router.push(`/courses/${encodeURIComponent(course.code)}`);
                }}
              >
                {course.name}
              </CommandItem>
            ))}
            {error && (
              <CommandItem className="text-red-800 dark:text-red-500">
                Error: {error}
              </CommandItem>
            )}
            {loading && <CommandItem>Loading...</CommandItem>}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
