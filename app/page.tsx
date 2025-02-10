import type { NextPage } from "next";
import Link from "next/link";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export default async function Home(){
  const posts = await getPosts();

  return (
    <div>
      {posts.map(({slug, frontMatter: {title, description}}) => (
        <Link key={slug} href={`/blog/${slug}`} passHref>
            <h5>{title}</h5>
            <p>{description}</p>
            <hr />
        </Link>
      ))}
    </div>
  )
}

async function getPosts() {
  // Lê os arquivos da pasta "posts"
  const files = fs.readdirSync(path.join("posts"));
  
  // Filtra apenas arquivos .md e extrai os dados
  const posts = files.filter(filename => filename.endsWith(".md")).map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontMatter } = matter(markdownWithMeta);

    return { slug, frontMatter };
  }).sort((a, b) => (
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));

  return posts;
}