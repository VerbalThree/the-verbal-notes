import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";
import Link from "next/link";

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
            <Link href="/">
                <button>Homepage</button>
            </Link>

            <div className="prose prose-sm sm:prose lg:prose-lg mx-auto prose-slate">
                <img src={frontMatter.thumbnail} alt={frontMatter.title}/>
                <h1>{frontMatter.title}</h1>
                <div dangerouslySetInnerHTML={{__html: marked(content) }}></div>
            </div>
        </div>
    )} catch (error){
        
        return (
            <>
        <div>Ow snap! This page has not been found...</div>
        <Link href="/">
            Come back to the homepage
        </Link>
        </>
    )};
    }

