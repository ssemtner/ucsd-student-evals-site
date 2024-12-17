import { getCourseSummary } from "@/lib/routes";
import { Summary } from "@/lib/types";

export default async function CourseDetails({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const data = await getCourseSummary((await params).code);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Overall Statistics
                </h2>
                <SummaryView {...data.overall} />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    By Instructor
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(data)
                        .sort((a, b) => +b[1].actualGPA - +a[1].actualGPA)
                        .map(([key, value]) => {
                            if (key === "overall") return null;
                            return (
                                <div key={key} className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                        {key}
                                    </h3>
                                    <SummaryView {...value} />
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}

function SummaryView(data: Summary) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {[
                { label: "Actual GPA", value: data.actualGPA },
                { label: "Expected GPA", value: data.expectedGPA },
                { label: "Hours", value: data.hours },
                { label: "Sections", value: data.sections },
            ].map(({ label, value }) => (
                <div key={label} className="bg-muted rounded p-4">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-lg font-medium">{value}</p>
                </div>
            ))}
        </div>
    );
}
