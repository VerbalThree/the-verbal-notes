import Link from "next/link";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1">
      {posts.map(({ slug, frontMatter: { title, description, date } }) => (
        <div className="flex justify-center items-center" key={slug}>
          <Link
            className="mx-1 my-1 p-[4px] md:p-[0px]"
            href={`/${slug}`}
            passHref
          >
            <div
              className="boxes w-[24rem] h-28 md:w-[45rem] md:h-[10rem]"
              id="posts-blocks"
            >
              <h5 className="text-2xl text-left mt-4 mb-4 ml-4 w-[20rem] md:w-[50rem] truncate">
                {title}
              </h5>
              <p className="text-sm text-left ml-4 relative bottom-[1rem] w-[10rem] md:w-[50rem] truncate">
                {description}
              </p>
              <p className="text-sm text-left ml-4 relative bottom-[0.25rem] md:top-[2.5rem]">
                {date}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

async function getPosts() {
  // Lê os arquivos da pasta "posts"
  const files = fs.readdirSync(path.join("posts"));

  // Filtra apenas arquivos .md e extrai os dados
  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );
      const { data: frontMatter } = matter(markdownWithMeta);

      return { slug, frontMatter };
    })
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    );

  return posts;
}
