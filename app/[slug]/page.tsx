import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";
import Link from "next/link";
import NextBreadcrumb from "@/components/breadcrumbs";

interface BlogPostProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const postsDir = path.join(process.cwd(), "posts");
    const files = await fs.readdir(postsDir);

    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: file.replace(/\.md$/,""),
        }));
}

// função para buscar os dados antes de renderizar a página
export async function generateMetadata(props: BlogPostProps){
    // extraindo params
    const params = await Promise.resolve(props.params);
    const slug = params.slug;
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
    
    try {
        const markdownWithMeta = await fs.readFile(filePath, "utf-8");
        const { data: frontMatter } = matter(markdownWithMeta);
        return { title: frontMatter.title };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { title: "Ow snap!"};
    }
}

export default async function BlogPost(props: BlogPostProps){  
    // extraindo params
    const params = await Promise.resolve(props.params);
    const slug = params.slug;
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);

    try {
        const markdownWithMeta = await fs.readFile(filePath, "utf-8");
        const { data: frontMatter, content } = matter(markdownWithMeta);
        return (
        <div>
        <main className="main">
        <article className="">
            <div className="relative bottom-[1rem]">
                <NextBreadcrumb
                homeElement={'Home'}
                separator={<span> / </span>}
                activeClasses="text-amber-500"
                containerClasses="flex py-5 bg-gradient-to-r from-purple-600 to-blue-600"
                listClasses="hover:underline mx-2 font-bold"
                capitalizeLinks
                />
            </div>
                <header className="header">
                <h1 className="flex justify-center items-center">{frontMatter.title}</h1>
                </header>
                <figure className="cover">
                {/* <Image src={frontMatter.thumbnail} alt={frontMatter.title} className="flex justify-center items-center"/> */}
                </figure>
                <div dangerouslySetInnerHTML={{__html: marked(content) }} className="justify-center items-center" id="content"></div>
            
        </article>
        </main>
        </div>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    )} catch (error){
        
        return (
            <div>
        <div className="flex justify-center items-center mb-4"><h1 className="">Ow snap! This page has <b className="error">not been found...</b></h1></div>
        <Link href="/" className="flex justify-center items-center">
            <h1 className="bg-purple-800">[Come back to the homepage]</h1>
        </Link>
        </div>
    )};
    }

