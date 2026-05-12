export default function(eleventyConfig) {
  // Passthrough: zip 文件和静态资源直接复制到输出目录
  eleventyConfig.addPassthroughCopy("prodkeys");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // Watch 目标
  eleventyConfig.addWatchTarget("src/assets/");

  // 全局数据
  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString().split("T")[0]);

  // 过滤器：格式化日期
  eleventyConfig.addFilter("dateFormat", (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  });

  // 过滤器：版本号高亮关键部分
  eleventyConfig.addFilter("highlightVersion", (v) => {
    if (!v) return v;
    const parts = String(v).split(".");
    return parts[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
