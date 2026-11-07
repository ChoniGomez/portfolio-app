import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  summary: string;
  image?: string;
  images?: string[];
  link?: string;
  technology?: string;
  publishedDate?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    const value = valueArr.join(": ").trim();
    const valueWithoutQuotes = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    const trimmedKey = key.trim();

    if (trimmedKey === "images") {
      try {
        metadata.images = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        metadata.images = valueWithoutQuotes
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((s) => s.trim().replace(/^['"](.*)['"]$/, "$1"))
          .filter(Boolean);
      }
    } else {
      metadata[trimmedKey as keyof Metadata] = valueWithoutQuotes as never;
    }
  });

  if (!metadata.images && metadata.image) {
    metadata.images = [metadata.image];
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

export type ContentDir = "projects" | "about" | "contact";

export function getContents(contentDir: ContentDir) {
  return getMDXData(path.join(process.cwd(), "src/markdown", contentDir));
}
