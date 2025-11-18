import React, { useEffect, useState } from "react";

type Props = {
    summary: string;
};

type LangId = "java" | "go" | "ts" | "python";

const languages: { id: LangId; label: string; fileName: string }[] = [
    { id: "java", label: "Java", fileName: "AboutMe.java" },
    { id: "go", label: "Go", fileName: "about_me.go" },
    { id: "ts", label: "TypeScript", fileName: "aboutMe.ts" },
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
            {/* Barra superior tipo editor */}
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

                {/* Tabs de lenguaje */}
                <div className="flex gap-1 px-2 pb-2 text-[11px]">
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
                            className={`rounded-md px-2 py-1 transition-colors ${i === index
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
                <div className="pointer-events-none absolute left-8 top-0 h-full w-px bg-white/5" />

                {/* Java */}
                <div
                    className={`${current.id === "java"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                        } transition-all duration-500 ease-out`}
                >
                    <JavaCode summary={summary} />
                </div>

                {/* Go */}
                <div
                    className={`${current.id === "go"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                        } transition-all duration-500 ease-out`}
                >
                    <GoCode summary={summary} />
                </div>

                {/* TypeScript */}
                <div
                    className={`${current.id === "ts"
                            ? "relative opacity-100 blur-0 translate-y-0"
                            : "absolute inset-0 opacity-0 blur-sm -translate-y-1 pointer-events-none"
                        } transition-all duration-500 ease-out`}
                >
                    <TsCode summary={summary} />
                </div>

                {/* Python */}
                <div
                    className={`${current.id === "python"
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

function JavaCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className="text-[#6A9955]">// Backend developer profile</span>
                {"\n"}
                <span className="text-[#569CD6]">public</span>{" "}
                <span className="text-[#569CD6]">class</span>{" "}
                <span className="text-[#4EC9B0]">AboutMe</span> {"{"}
                {"\n"}
                {"  "}
                <span className="text-[#569CD6]">private</span>{" "}
                <span className="text-[#4EC9B0]">final</span>{" "}
                <span className="text-[#4EC9B0]">String</span> role =
                {" "}
                <span className="text-[#CE9178]">"Backend Developer"</span>;
                {"\n"}
                {"  "}
                <span className="text-[#569CD6]">private</span>{" "}
                <span className="text-[#4EC9B0]">final</span>{" "}
                <span className="text-[#4EC9B0]">String[]</span> stack =
                {" "}
                <span className="text-[#CE9178]">
                    {"{\"Go\", \"Java\", \"PostgreSQL\", \"Docker\", \"Linux\"}"}
                </span>
                ;
                {"\n"}
                {"  "}
                <span className="text-[#569CD6]">private</span>{" "}
                <span className="text-[#4EC9B0]">final</span>{" "}
                <span className="text-[#4EC9B0]">String</span> bio =
                {" "}
                <span className="text-[#CE9178]">"{summary}"</span>;
                {"\n\n"}
                {"  "}
                <span className="text-[#569CD6]">public</span>{" "}
                <span className="text-[#4EC9B0]">String</span>{" "}
                <span className="text-[#DCDCAA]">describe</span>() {"{"}
                {"\n"}
                {"    "}
                <span className="text-[#569CD6]">return</span> bio;
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"}"}
            </code>
        </pre>
    );
}

function GoCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className="text-[#6A9955]">// Backend developer profile</span>
                {"\n"}
                <span className="text-[#569CD6]">package</span>{" "}
                <span className="text-[#DCDCAA]">main</span>
                {"\n\n"}
                <span className="text-[#569CD6]">type</span>{" "}
                <span className="text-[#4EC9B0]">AboutMe</span>{" "}
                <span className="text-[#569CD6]">struct</span> {"{"}
                {"\n"}
                {"  "}
                role <span className="text-[#4EC9B0]">string</span>
                {"\n"}
                {"  "}
                stack []<span className="text-[#4EC9B0]">string</span>
                {"\n"}
                {"  "}
                bio  <span className="text-[#4EC9B0]">string</span>
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-[#569CD6]">var</span> me ={" "}
                <span className="text-[#4EC9B0]">AboutMe</span>{"{"}
                {"\n"}
                {"  "}
                role:{" "}
                <span className="text-[#CE9178]">"Backend Developer"</span>,
                {"\n"}
                {"  "}
                stack: []<span className="text-[#4EC9B0]">string</span>
                {"{"}
                <span className="text-[#CE9178]">
                    `"Go", "Java", "PostgreSQL", "Docker", "Linux"`
                </span>
                {"}"}
                ,{"\n"}
                {"  "}
                bio: <span className="text-[#CE9178]">"{summary}"</span>,
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-[#569CD6]">func</span>{" "}
                <span className="text-[#DCDCAA]">main</span>() {"{"}
                {"\n"}
                {"  "}
                <span className="text-[#6A9955]">// use me.bio here</span>
                {"\n"}
                {"}"}
            </code>
        </pre>
    );
}

function TsCode({ summary }: { summary: string }) {
    return (
        <pre className="whitespace-pre-wrap wrap-break-word pl-4 text-gray-100">
            <code>
                <span className="text-[#6A9955]">// Backend developer profile</span>
                {"\n"}
                <span className="text-[#569CD6]">type</span>{" "}
                <span className="text-[#4EC9B0]">AboutMe</span> = {"{"}
                {"\n"}
                {"  "}
                role: <span className="text-[#4EC9B0]">string</span>;
                {"\n"}
                {"  "}
                stack: <span className="text-[#4EC9B0]">string</span>[];
                {"\n"}
                {"  "}
                bio: <span className="text-[#4EC9B0]">string</span>;
                {"\n"}
                {"};"}
                {"\n\n"}
                <span className="text-[#569CD6]">const</span>{" "}
                <span className="text-[#9CDCFE]">me</span>:{" "}
                <span className="text-[#4EC9B0]">AboutMe</span> = {"{"}
                {"\n"}
                {"  "}
                role: <span className="text-[#CE9178]">"Backend Developer"</span>,
                {"\n"}
                {"  "}
                stack: [
                <span className="text-[#CE9178]">
                    "Go", "Java", "PostgreSQL", "Docker", "Linux"
                </span>
                ],
                {"\n"}
                {"  "}
                bio: <span className="text-[#CE9178]">"{summary}"</span>,
                {"\n"}
                {"};"}
                {"\n\n"}
                <span className="text-[#569CD6]">function</span>{" "}
                <span className="text-[#DCDCAA]">describe</span>(
                <span className="text-[#9CDCFE]">profile</span>:{" "}
                <span className="text-[#4EC9B0]">AboutMe</span>) {"{"}
                {"\n"}
                {"  "}
                <span className="text-[#569CD6]">return</span> profile.bio;
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
                <span className="text-[#6A9955]"># Backend developer profile</span>
                {"\n"}
                <span className="text-[#569CD6]">class</span>{" "}
                <span className="text-[#4EC9B0]">AboutMe</span>:
                {"\n"}
                {"  "}
                <span className="text-[#569CD6]">def</span>{" "}
                <span className="text-[#DCDCAA]">__init__</span>(self):
                {"\n"}
                {"    "}
                self.role = <span className="text-[#CE9178]">"Backend Developer"</span>
                {"\n"}
                {"    "}
                self.stack = [
                <span className="text-[#CE9178]">
                    "Go", "Java", "PostgreSQL", "Docker", "Linux"
                </span>
                ]
                {"\n"}
                {"    "}
                self.bio = <span className="text-[#CE9178]">"{summary}"</span>
                {"\n\n"}
                {"  "}
                <span className="text-[#569CD6]">def</span>{" "}
                <span className="text-[#DCDCAA]">describe</span>(self):
                {"\n"}
                {"    "}
                <span className="text-[#569CD6]">return</span> self.bio
            </code>
        </pre>
    );
}
