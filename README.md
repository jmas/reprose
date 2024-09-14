# Reprose is a Markdown editor for GitHub

[Demo](https://reprose.pp.ua)

When I need to edit a Markdown document in GitHub, I want to use a beautiful editor that handles editing front-matter fields under the hood and supports image uploads. That’s why I started developing my own Markdown editor for GitHub.

The current version of the editor is a working PoC (Proof of Concept) that can display a list of Markdown files from your GitHub repository, which you can edit through a basic Markdown editor.

Ideally, I want to add image uploads and an editor similar to GitBook.

The editor can be deployed to GitHub Pages or Cloudflare Pages. The latter is preferable because the editor app uses a simple Cloudflare function to perform GitHub authentication. If you figure out how to host it elsewhere, please let me know in the Issues.

The original idea for the editor was inspired by [Prose.io editor](https://prose.io). The reason I don’t use Prose.io is that its image uploader is broken, and its code is based on BackboneJS, which is outdated. I built Reprose with Jekyll and AlpineJS. Both are super simple, and any developer can easily understand what’s happening in this codebase. ;)

Screenshot of finder page:

![Reprose editor page](https://github.com/jmas/reprose/blob/main/.assets/reprose-finder-screenshot.png?raw=true)

Screenshot of editor page:

![Reprose editor page](https://github.com/jmas/reprose/blob/main/.assets/reprose-editor-screenshot.png?raw=true)

Thanks for using this wonderful editor. :)
