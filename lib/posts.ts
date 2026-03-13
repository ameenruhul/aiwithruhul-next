import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostInfo {
  slug: string;
  title?: string;
  date?: string;
  excerpt?: string;
  content: string;
}

// Basic frontmatter parser to extract metadata since we aren't using gray-matter yet
function parseFrontmatter(fileContents: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContents);
  
  if (!match) {
    return { data: {}, content: fileContents };
  }

  const frontMatterBlock = match[1];
  const content = fileContents.replace(frontmatterRegex, '').trim();
  const data: Record<string, string> = {};

  frontMatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).replace(/^["']|["']$/g, '').trim();
      data[key] = value;
    }
  });

  return { data, content };
}

// Extract the first # heading from content as a fallback title
function extractTitleFromContent(content: string): string | undefined {
  const match = /^#{1,2}\s+(.+)$/m.exec(content);
  return match ? match[1].trim() : undefined;
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => ({
      slug: fileName.replace(/\.md$/, '')
    }));
  } catch (error) {
    return [];
  }
}

export function getAllPosts(): PostInfo[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title || extractTitleFromContent(content),
        date: data.date,
        excerpt: data.excerpt,
        content
      };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if ((a.date || '') < (b.date || '')) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    return [];
  }
}

export function getPostData(slug: string): PostInfo | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      title: data.title || extractTitleFromContent(content),
      date: data.date,
      excerpt: data.excerpt,
      content
    };
  } catch (error) {
    return null;
  }
}
