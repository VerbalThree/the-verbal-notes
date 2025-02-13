import Link from "next/link";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export default async function Home(){
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1">
      
      {posts.map(({slug, frontMatter: {title, description}}) => (
        <Link className="mx-1 my-1" key={slug} href={`/${slug}`} passHref>
          <div className="boxes w-80 h-28 md:w-[45rem] md:h-[10rem]">
            <h5 className="text-2xl text-left mt-4 mb-4 ml-4">{title}</h5>
            <p className="text-sm text-left ml-4 relative bottom-[1rem]">{description}</p>
          </div>
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