import path from "path"
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "src/posts");

export function getPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
 
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
 
    const matterResult = matter(fileContents);
 
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

// getStaticPathでreturnで使うpathを追加する
export function getAllPostIds() {
    const filNames = fs.readdirSync(postDirectory);
    return filNames.map((fileName) => {
        return {
            params: {
                id : fileName.replace(/\.md$/, ""),
            }
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8"); 

    const matterResult = matter(fileContents);

    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHtml = blogContent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    };
}