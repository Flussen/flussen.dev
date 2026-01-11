import React, { useEffect, useState } from "react";

type Props = {
    summary: string;
};

type LangId = "yaml" | "ts" | "go" | "python";

const languages: { id: LangId; label: string; fileName: string }[] = [
    { id: "yaml", label: "YAML", fileName: "about-me.yml" },
    { id: "ts", label: "TypeScript", fileName: "aboutMe.ts" },
    { id: "go", label: "Go", fileName: "about_me.go" },
    { id: "python", label: "Python", fileName: "about_me.py" },
];

export default function AboutMeCode({ summary }: Props) {
    const [index, setIndex] = useState(0);
    const current = languages[index];
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(
            () => setIndex((prev) => (prev + 1) % languages.length),
            7000
        );

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="rounded-lg border border-border/60 bg-[#1e1e1e]/90 backdrop-blur shadow-md overflow-hidden font-mono text-[13px] leading-relaxed">
            <div className="border-b border-black/30 bg-[#2d2d2d]">
                <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-1 text-[11px] text-gray-300">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    </div>

                    <span className="text-xs text-gray-200">{current.fileName}</span>
                    <span className="text-xs text-[#2d2d2d] select-none">...</span>
                </div>

                <div className="flex gap-1 px-2 pb-2 text-[11px] overflow-x-auto">
                    {languages.map((lang, i) => (
                        <button
                            key={lang.id}
                            type="button"
                            onClick={() => {
                                setIndex(i);
                                if (intervalRef.current) {
                                    clearInterval(intervalRef.current);
                                    intervalRef.current = null;
                                }
                            }}
                            className={`rounded-md px-2 py-1 transition-colors whitespace-nowrap ${
                                i === index
                                    ? "bg-[#1e1e1e] text-gray-100"
                                    : "bg-transparent text-gray-400 hover:bg-[#1e1e1e]/60 hover:text-gray-100"
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido con transición suave */}
            <div className="relative px-4 py-3 text-[13px]">
                {/* Línea vertical tipo gutter */}
                <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-white/5" />

                {/* YAML */}
                <div
                    className={`${
                        current.id === "yaml"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                    } transition-all duration-500 ease-out`}
                >
                    <YamlCode summary={summary} />
                </div>

                {/* TypeScript */}
                <div
                    className={`${
                        current.id === "ts"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                    } transition-all duration-500 ease-out`}
                >
                    <TsCode summary={summary} />
                </div>

                {/* Go */}
                <div
                    className={`${
                        current.id === "go"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                    } transition-all duration-500 ease-out`}
                >
                    <GoCode summary={summary} />
                </div>

                {/* Python */}
                <div
                    className={`${
                        current.id === "python"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                    } transition-all duration-500 ease-out`}
                >
                    <PythonCode summary={summary} />
                </div>
            </div>
        </div>
    );
}

/* === Variantes de código con bio legible en cada lenguaje === */

// Colores consistentes para syntax highlighting
const colors = {
    comment: "text-[#6A9955]",
    keyword: "text-[#569CD6]",
    type: "text-[#4EC9B0]",
    string: "text-[#CE9178]",
    function: "text-[#DCDCAA]",
    variable: "text-[#9CDCFE]",
    property: "text-[#9CDCFE]",
    number: "text-[#B5CEA8]",
};

function YamlCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className={colors.comment}># Backend Developer Profile</span>
                {"\n\n"}
                <span className={colors.property}>name</span>: <span className={colors.string}>Alexander Rios</span>
                {"\n"}
                <span className={colors.property}>role</span>: <span className={colors.string}>Backend Developer</span>
                {"\n\n"}
                <span className={colors.property}>stack</span>:
                {"\n"}
                {"  "}- <span className={colors.string}>Golang</span>
                {"\n"}
                {"  "}- <span className={colors.string}>Java</span>
                {"\n"}
                {"  "}- <span className={colors.string}>PostgreSQL</span>
                {"\n"}
                {"  "}- <span className={colors.string}>Docker</span>
                {"\n"}
                {"  "}- <span className={colors.string}>Linux</span>
                {"\n\n"}
                <span className={colors.property}>bio</span>: <span className={colors.string}>|</span>
                {"\n"}
                {"  "}<span className={colors.string}>{summary}</span>
                {"\n\n"}
                <span className={colors.property}>location</span>:
                {"\n"}
                {"  "}<span className={colors.property}>country</span>: <span className={colors.string}>Austria</span>
                {"\n"}
                {"  "}<span className={colors.property}>region</span>: <span className={colors.string}>Tyrol</span>
                {"\n\n"}
                <span className={colors.property}>contact</span>:
                {"\n"}
                {"  "}<span className={colors.property}>email</span>: <span className={colors.string}>flussen0@gmail.com</span>
                {"\n"}
                {"  "}<span className={colors.property}>github</span>: <span className={colors.string}>github.com/Flussen</span>
            </code>
        </pre>
    );
}

function TsCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className={colors.comment}>// Backend developer profile</span>
                {"\n"}
                <span className={colors.keyword}>interface</span>{" "}
                <span className={colors.type}>Developer</span> {"{"}
                {"\n"}
                {"  "}
                name: <span className={colors.type}>string</span>;
                {"\n"}
                {"  "}
                role: <span className={colors.type}>string</span>;
                {"\n"}
                {"  "}
                stack: <span className={colors.type}>string</span>[];
                {"\n"}
                {"  "}
                bio: <span className={colors.type}>string</span>;
                {"\n"}
                {"  "}
                location: {"{"}
                {"\n"}
                {"    "}
                country: <span className={colors.type}>string</span>;
                {"\n"}
                {"    "}
                region: <span className={colors.type}>string</span>;
                {"\n"}
                {"  "}
                {"}"};
                {"\n"}
                {"};"}
                {"\n\n"}
                <span className={colors.keyword}>const</span>{" "}
                <span className={colors.variable}>me</span>:{" "}
                <span className={colors.type}>Developer</span> = {"{"}
                {"\n"}
                {"  "}
                name: <span className={colors.string}>"Alexander Rios"</span>,
                {"\n"}
                {"  "}
                role: <span className={colors.string}>"Backend Developer"</span>,
                {"\n"}
                {"  "}
                stack: [<span className={colors.string}>"Golang"</span>, <span className={colors.string}>"Java"</span>, <span className={colors.string}>"PostgreSQL"</span>, <span className={colors.string}>"Docker"</span>, <span className={colors.string}>"Linux"</span>],
                {"\n"}
                {"  "}
                bio: <span className={colors.string}>`{summary}`</span>,
                {"\n"}
                {"  "}
                location: {"{"} country: <span className={colors.string}>"Austria"</span>, region: <span className={colors.string}>"Tyrol"</span> {"}"},
                {"\n"}
                {"};"}
            </code>
        </pre>
    );
}

function GoCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className={colors.comment}>// Backend developer profile</span>
                {"\n"}
                <span className={colors.keyword}>package</span>{" "}
                <span className={colors.function}>main</span>
                {"\n\n"}
                <span className={colors.keyword}>type</span>{" "}
                <span className={colors.type}>Developer</span>{" "}
                <span className={colors.keyword}>struct</span> {"{"}
                {"\n"}
                {"  "}
                Name     <span className={colors.type}>string</span>
                {"\n"}
                {"  "}
                Role     <span className={colors.type}>string</span>
                {"\n"}
                {"  "}
                Stack    []<span className={colors.type}>string</span>
                {"\n"}
                {"  "}
                Bio      <span className={colors.type}>string</span>
                {"\n"}
                {"  "}
                Location <span className={colors.type}>Location</span>
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className={colors.keyword}>type</span>{" "}
                <span className={colors.type}>Location</span>{" "}
                <span className={colors.keyword}>struct</span> {"{"}
                {"\n"}
                {"  "}
                Country <span className={colors.type}>string</span>
                {"\n"}
                {"  "}
                Region  <span className={colors.type}>string</span>
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className={colors.keyword}>var</span> me = <span className={colors.type}>Developer</span>{"{"}
                {"\n"}
                {"  "}
                Name: <span className={colors.string}>"Alexander Rios"</span>,
                {"\n"}
                {"  "}
                Role: <span className={colors.string}>"Backend Developer"</span>,
                {"\n"}
                {"  "}
                Stack: []<span className={colors.type}>string</span>{"{"}
                <span className={colors.string}>"Golang"</span>, <span className={colors.string}>"Java"</span>, <span className={colors.string}>"PostgreSQL"</span>, <span className={colors.string}>"Docker"</span>, <span className={colors.string}>"Linux"</span>
                {"}"},
                {"\n"}
                {"  "}
                Bio: <span className={colors.string}>`{summary}`</span>,
                {"\n"}
                {"  "}
                Location: <span className={colors.type}>Location</span>{"{"}Country: <span className={colors.string}>"Austria"</span>, Region: <span className={colors.string}>"Tyrol"</span>{"}"},
                {"\n"}
                {"}"}
            </code>
        </pre>
    );
}

function PythonCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className={colors.comment}># Backend developer profile</span>
                {"\n"}
                <span className={colors.keyword}>class</span>{" "}
                <span className={colors.type}>Developer</span>:
                {"\n"}
                {"  "}<span className={colors.keyword}>def</span>{" "}
                <span className={colors.function}>__init__</span>(self):
                {"\n"}
                {"    "}
                self.name = <span className={colors.string}>"Alexander Rios"</span>
                {"\n"}
                {"    "}
                self.role = <span className={colors.string}>"Backend Developer"</span>
                {"\n"}
                {"    "}
                self.stack = [
                {"\n"}
                {"      "}
                <span className={colors.string}>"Golang"</span>, <span className={colors.string}>"Java"</span>, <span className={colors.string}>"PostgreSQL"</span>,
                {"\n"}
                {"      "}
                <span className={colors.string}>"Docker"</span>, <span className={colors.string}>"Linux"</span>
                {"\n"}
                {"    "}
                ]
                {"\n"}
                {"    "}
                self.bio = <span className={colors.string}>"""</span>
                {"\n"}
                {"    "}
                <span className={colors.string}>{summary}</span>
                {"\n"}
                {"    "}
                <span className={colors.string}>"""</span>
                {"\n"}
                {"    "}
                self.location = {"{"}
                {"\n"}
                {"      "}<span className={colors.string}>"country"</span>: <span className={colors.string}>"Austria"</span>,
                {"\n"}
                {"      "}<span className={colors.string}>"region"</span>: <span className={colors.string}>"Tyrol"</span>
                {"\n"}
                {"    "}{"}"}
                {"\n\n"}
                <span className={colors.variable}>me</span> = <span className={colors.type}>Developer</span>()
            </code>
        </pre>
    );
}
