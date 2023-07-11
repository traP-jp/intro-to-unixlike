import { defineConfig } from "vitepress";
const containerMdExtend = require("./plugins/md/index.js");
const fs = require("fs");
const path = require("path");

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "jp",
    title: "Lecture Template Project",
    description: "Lecture Site Template",
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
            { text: "Examples", link: "/text/Examples/image" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
        sidebar: generateSidebar("text", "docs", "chapter"),
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

function generateSidebar(
    dir: string,
    baseDir: string,
    priorityFolder: string
): SidebarItem[] {
    const absoluteDir = path.resolve(baseDir, dir);
    const relativeDir = path.relative(baseDir, absoluteDir);

    const sidebar: SidebarItem[] = [];

    // 優先フォルダのアイテムを格納する配列
    const priorityItems: SidebarItem[] = [];

    // 通常のアイテムを格納する配列
    const normalItems: SidebarItem[] = [];

    fs.readdirSync(absoluteDir).forEach((file: string) => {
        const filePath = path.join(absoluteDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subDirItems = generateSidebar(
                filePath,
                baseDir,
                priorityFolder
            );
            if (subDirItems.length > 0) {
                // 優先フォルダかどうかを判定し、対応する配列にアイテムを追加
                if (file.indexOf(priorityFolder) > -1) {
                    priorityItems.push({
                        text: file,
                        items: subDirItems,
                    });
                } else {
                    normalItems.push({
                        text: file,
                        items: subDirItems,
                    });
                }
            }
        } else if (stat.isFile() && file.endsWith(".md")) {
            const content = fs.readFileSync(filePath, "utf-8");
            const titleMatch = content.match(/^#\s+(.*)/m);

            if (titleMatch) {
                const relativePath = path.join(
                    relativeDir,
                    file.replace(/\.md$/, ".html")
                );
                const link = `/${relativePath}`;

                // 優先フォルダのアイテムかどうかを判定し、対応する配列にアイテムを追加
                if (dir === priorityFolder) {
                    priorityItems.push({
                        text: titleMatch[1],
                        link,
                    });
                } else {
                    normalItems.push({
                        text: titleMatch[1],
                        link,
                    });
                }
            }
        }
    });

    // 優先フォルダのアイテムを優先して追加し、通常のアイテムを後に追加
    sidebar.push(...priorityItems, ...normalItems);

    return sidebar;
}
