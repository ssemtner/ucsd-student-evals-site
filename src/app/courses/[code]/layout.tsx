import CourseMenu from "@/app/CourseMenu";
import Link from "next/link";

export default function CourseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b">
                <Link href={"/"}>
                    <h1 className="text-2xl font-bold">UCSD Student Evaluations</h1>
                </Link>
                <CourseMenu />
            </nav>

            <main>{children}</main>
        </>
    );
}
