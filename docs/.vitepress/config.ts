import { defineConfig } from "vitepress";
const containerMdExtend = require("./plugins/md/index.js");

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "jp",
    title: "Lecture Template Project",
    description: "Lecture Site Template",
    base: "/template/",
    markdown: {
        lineNumbers: true,
        config: (md) => {
            md.use(
                require("markdown-it-container"),
                "spoiler",
                containerMdExtend(md)
            );
        },
    },

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
        sidebar: generateSidebar("../text"),
        lastUpdated: {
            text: "Updated at",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium",
            },
        },
        search: {
            provider: "local",
        },
    },
});

interface SidebarItem {
    text: string;
    link?: string;
    items?: SidebarItem[];
}

function generateSidebar(dir: string): SidebarItem[] {
    const fs = require("fs");
    const path = require("path");

    const absoluteDir = path.resolve(__dirname, dir);

    const sidebar: SidebarItem[] = [];

    fs.readdirSync(absoluteDir).forEach((file: string) => {
        const filePath = path.join(absoluteDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subDirPath = path.join(absoluteDir, file);
            const subDirItems = generateSidebar(subDirPath);
            if (subDirItems.length > 0) {
                sidebar.push({
                    text: file,
                    items: subDirItems,
                });
            }
        } else if (stat.isFile() && file.endsWith(".md")) {
            const content = fs.readFileSync(filePath, "utf-8");
            const titleMatch = content.match(/^#\s+(.*)/m);

            if (titleMatch) {
                const relativePath = path.relative(absoluteDir, filePath);
                const link = `/${path.join(dir,relativePath.replace(/\.md$/, ".html"))}`;
                sidebar.push({
                    text: titleMatch[1],
                    link,
                });
            }
        }
    });
    return sidebar;
}
